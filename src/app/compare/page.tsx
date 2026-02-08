'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { LoadingSpinner } from '@/components/loading-spinner';
import { PriceTable } from '@/components/price-table';
import { formatCurrency } from '@/lib/format';

interface ProcedurePrice {
  price_id?: number;
  hospital_id: string;
  code_id: string;
  hospital_name: string;
  city: string;
  state: string;
  setting?: string;
  gross_charge?: number;
  discounted_cash_price?: number;
  min_negotiated_charge?: number;
  max_negotiated_charge?: number;
}

function CompareContent() {
  const searchParams = useSearchParams();
  const procedureCode = searchParams.get('code') || '';
  const hospitalIds = searchParams.getAll('hospital');

  const [procedureDetails, setProcedureDetails] = useState<{ description: string; code_type: string; category?: string } | null>(null);
  const [comparisonData, setComparisonData] = useState<ProcedurePrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (procedureCode && hospitalIds.length) {
      loadData();
    } else {
      setError('Missing required parameters: procedure code and at least two hospitals');
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      params.append('code_id', procedureCode);
      hospitalIds.forEach((id) => params.append('hospital_id', id));

      const [procRes, compareRes] = await Promise.all([
        fetch(`/api/procedures?query=${procedureCode}`),
        fetch(`/api/compare?${params.toString()}`),
      ]);

      const procData = (await procRes.json()) as { success: boolean; data: { description: string; code_type: string; category?: string }[] };
      if (procData.success && procData.data.length > 0) {
        setProcedureDetails(procData.data[0]);
      }

      const compareData = (await compareRes.json()) as { success: boolean; data?: ProcedurePrice[]; error?: string };
      if (compareData.success) {
        setComparisonData(compareData.data ?? []);
      } else {
        setError(compareData.error || 'Failed to load comparison data');
      }
    } catch {
      setError('An error occurred while loading comparison data');
    } finally {
      setLoading(false);
    }
  };

  const cashPrices = comparisonData.filter((d) => d.discounted_cash_price != null).map((d) => d.discounted_cash_price!);
  const minCash = cashPrices.length > 0 ? Math.min(...cashPrices) : null;
  const maxCash = cashPrices.length > 0 ? Math.max(...cashPrices) : null;

  const lowestCashItem = comparisonData.reduce<ProcedurePrice | null>((lowest, current) => {
    if (current.discounted_cash_price == null) return lowest;
    if (!lowest || lowest.discounted_cash_price == null) return current;
    return current.discounted_cash_price < lowest.discounted_cash_price ? current : lowest;
  }, null);

  const lowestMinNegItem = comparisonData.reduce<ProcedurePrice | null>((lowest, current) => {
    if (current.min_negotiated_charge == null) return lowest;
    if (!lowest || lowest.min_negotiated_charge == null) return current;
    return current.min_negotiated_charge < lowest.min_negotiated_charge ? current : lowest;
  }, null);

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <LoadingSpinner message="Loading comparison data..." />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <Link href="/search" className="mt-4 inline-block px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Back to Search
            </Link>
          </div>
        ) : (
          <div>
            <div className="bg-white shadow sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Price Comparison: {procedureDetails?.description || `Procedure ${procedureCode}`}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Code: {procedureCode} | Type: {procedureDetails?.code_type || 'Unknown'}
                  {procedureDetails?.category && ` | Category: ${procedureDetails.category}`}
                </p>
              </div>

              {comparisonData.length === 0 ? (
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6 text-center">
                  <p className="text-gray-500">No comparison data available.</p>
                  <Link href={`/procedure/${procedureCode}`} className="mt-4 inline-block px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Back to Procedure
                  </Link>
                </div>
              ) : (
                <div className="border-t border-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Price Summary</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-500">Cash Price Range</p>
                        <p className="mt-1 text-2xl font-semibold text-gray-900">
                          {formatCurrency(minCash)} - {formatCurrency(maxCash)}
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-500">Lowest Cash Price</p>
                        <p className="mt-1 text-2xl font-semibold text-gray-900">
                          {lowestCashItem ? formatCurrency(lowestCashItem.discounted_cash_price) : 'N/A'}
                        </p>
                        {lowestCashItem && (
                          <p className="mt-1 text-sm text-gray-500">at {lowestCashItem.hospital_name}</p>
                        )}
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-500">Lowest Insurance Rate</p>
                        <p className="mt-1 text-2xl font-semibold text-gray-900">
                          {lowestMinNegItem ? formatCurrency(lowestMinNegItem.min_negotiated_charge) : 'N/A'}
                        </p>
                        {lowestMinNegItem && (
                          <p className="mt-1 text-sm text-gray-500">at {lowestMinNegItem.hospital_name}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Comparison</h3>
                    <PriceTable
                      prices={comparisonData}
                      showHospital
                      lowestCashHospitalId={lowestCashItem?.hospital_id}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">Understanding Price Differences</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6 prose prose-sm max-w-none text-gray-500">
                <p>
                  <strong>Why do prices vary?</strong> Healthcare prices differ due to operating costs,
                  charity care levels, regional cost of living, hospital size and type, and insurance
                  negotiating power.
                </p>
                <p>
                  <strong>Note:</strong> Prices shown are hospital charges and may not reflect your
                  actual out-of-pocket costs. Always consult your provider and insurance company.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading..." />}>
      <CompareContent />
    </Suspense>
  );
}
