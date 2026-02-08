'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
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
  zip_code: string;
  setting?: string;
  gross_charge?: number;
  discounted_cash_price?: number;
  min_negotiated_charge?: number;
  max_negotiated_charge?: number;
}

interface ProcedureDetails {
  code_id: string;
  code_type: string;
  description: string;
  category?: string;
}

export default function ProcedurePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const [procedureDetails, setProcedureDetails] = useState<ProcedureDetails | null>(null);
  const [prices, setPrices] = useState<ProcedurePrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [selectedHospitals, setSelectedHospitals] = useState<string[]>([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const zip = urlParams.get('zip');
    if (zip) setZipCode(zip);
    loadData(zip || '');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async (zip: string) => {
    setLoading(true);
    setError('');

    try {
      const [procRes, pricesRes] = await Promise.all([
        fetch(`/api/procedures?query=${code}`),
        fetch(`/api/prices?code_id=${code}${zip ? `&zip_code=${zip}` : ''}`),
      ]);

      const procData = (await procRes.json()) as { success: boolean; data: ProcedureDetails[] };
      if (procData.success && procData.data.length > 0) {
        setProcedureDetails(procData.data[0]);
      }

      const pricesData = (await pricesRes.json()) as { success: boolean; data?: ProcedurePrice[]; error?: string };
      if (pricesData.success) {
        setPrices(pricesData.data ?? []);
      } else {
        setError(pricesData.error || 'Failed to load prices');
      }
    } catch {
      setError('An error occurred while loading data');
    } finally {
      setLoading(false);
    }
  };

  const toggleHospital = (id: string) => {
    setSelectedHospitals((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  };

  const cashPrices = prices.filter(p => p.discounted_cash_price != null).map(p => p.discounted_cash_price!);
  const lowestCashHospitalId = prices.reduce<string | undefined>((lowest, p) => {
    if (p.discounted_cash_price == null) return lowest;
    const lowestPrice = prices.find((pp) => pp.hospital_id === lowest);
    if (!lowestPrice || lowestPrice.discounted_cash_price == null) return p.hospital_id;
    return p.discounted_cash_price < lowestPrice.discounted_cash_price ? p.hospital_id : lowest;
  }, undefined);

  const avgCashPrice = cashPrices.length > 0
    ? cashPrices.reduce((sum, p) => sum + p, 0) / cashPrices.length
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <LoadingSpinner message="Loading procedure data..." />
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
                  {procedureDetails?.description || `Procedure ${code}`}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Code: {code} | Type: {procedureDetails?.code_type || 'Unknown'}
                  {procedureDetails?.category && ` | Category: ${procedureDetails.category}`}
                </p>
              </div>

              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <div className="mb-6">
                  <label htmlFor="zip-filter" className="block text-sm font-medium text-gray-700">
                    Filter by ZIP Code
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm max-w-xs">
                    <input
                      type="text"
                      id="zip-filter"
                      inputMode="numeric"
                      maxLength={5}
                      className="flex-1 block w-full px-3 py-2 rounded-l-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g. 10001"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                    />
                    <button
                      type="button"
                      className="px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700"
                      onClick={() => loadData(zipCode)}
                    >
                      Update
                    </button>
                  </div>
                </div>

                {prices.length > 0 && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-500">Hospitals Available</p>
                      <p className="mt-1 text-2xl font-semibold text-gray-900">{prices.length}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-500">Lowest Cash Price</p>
                      <p className="mt-1 text-2xl font-semibold text-gray-900">
                        {cashPrices.length > 0 ? formatCurrency(Math.min(...cashPrices)) : 'N/A'}
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-500">Average Cash Price</p>
                      <p className="mt-1 text-2xl font-semibold text-gray-900">
                        {avgCashPrice ? formatCurrency(avgCashPrice) : 'N/A'}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Hospital Prices</h3>
                  {selectedHospitals.length >= 2 && (
                    <Link
                      href={`/compare?code=${code}&${selectedHospitals.map((id) => `hospital=${id}`).join('&')}`}
                      className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Compare Selected ({selectedHospitals.length})
                    </Link>
                  )}
                </div>

                {prices.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">
                    No price data available. Try a different ZIP code.
                  </p>
                ) : (
                  <PriceTable
                    prices={prices}
                    showHospital
                    showCompareCheckbox
                    selectedIds={selectedHospitals}
                    onToggleSelect={toggleHospital}
                    lowestCashHospitalId={lowestCashHospitalId}
                  />
                )}
              </div>
            </div>

            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">Understanding Healthcare Prices</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Standard Charge</dt>
                    <dd className="mt-1 text-sm text-gray-900">The hospital&apos;s gross charge before any discounts.</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Cash Price</dt>
                    <dd className="mt-1 text-sm text-gray-900">Discounted price for patients paying without insurance.</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Min Negotiated</dt>
                    <dd className="mt-1 text-sm text-gray-900">Lowest rate negotiated with insurance companies.</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Max Negotiated</dt>
                    <dd className="mt-1 text-sm text-gray-900">Highest rate negotiated with insurance companies.</dd>
                  </div>
                </dl>
                <p className="mt-6 text-sm text-gray-500">
                  <strong>Note:</strong> These prices represent hospital charges and may not reflect your actual out-of-pocket costs.
                  Always consult with your provider and insurance company for accurate estimates.
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
