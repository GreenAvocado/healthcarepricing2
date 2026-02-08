'use client';

import Link from 'next/link';
import { formatCurrency } from '@/lib/format';

interface PriceRow {
  hospital_id: string;
  code_id: string;
  hospital_name?: string;
  procedure_name?: string;
  setting?: string;
  gross_charge?: number;
  discounted_cash_price?: number;
  min_negotiated_charge?: number;
  max_negotiated_charge?: number;
}

interface PriceTableProps {
  prices: PriceRow[];
  showHospital?: boolean;
  showProcedure?: boolean;
  showCompareCheckbox?: boolean;
  selectedIds?: string[];
  onToggleSelect?: (id: string) => void;
  lowestCashHospitalId?: string;
}

export function PriceTable({
  prices,
  showHospital = true,
  showProcedure = false,
  showCompareCheckbox = false,
  selectedIds = [],
  onToggleSelect,
  lowestCashHospitalId,
}: PriceTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {showCompareCheckbox && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Compare
              </th>
            )}
            {showHospital && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hospital
              </th>
            )}
            {showProcedure && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Procedure
              </th>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Standard Charge
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cash Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Min Negotiated
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Max Negotiated
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {prices.map((price) => {
            const isLowest = lowestCashHospitalId === price.hospital_id;
            return (
              <tr
                key={`${price.hospital_id}-${price.code_id}`}
                className={isLowest ? 'bg-green-50' : ''}
              >
                {showCompareCheckbox && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={selectedIds.includes(price.hospital_id)}
                      onChange={() => onToggleSelect?.(price.hospital_id)}
                    />
                  </td>
                )}
                {showHospital && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/hospital/${price.hospital_id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {price.hospital_name}
                    </Link>
                    {isLowest && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Lowest
                      </span>
                    )}
                  </td>
                )}
                {showProcedure && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      href={`/procedure/${price.code_id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {price.procedure_name}
                    </Link>
                    <span className="ml-2 text-gray-400 text-xs">{price.code_id}</span>
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(price.gross_charge)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(price.discounted_cash_price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(price.min_negotiated_charge)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(price.max_negotiated_charge)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
