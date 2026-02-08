'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { LoadingSpinner } from '@/components/loading-spinner';
import { PriceTable } from '@/components/price-table';

interface Hospital {
  hospital_id: string;
  legal_name: string;
  common_name?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}

interface ProcedurePrice {
  price_id?: number;
  hospital_id: string;
  code_id: string;
  procedure_name: string;
  code_type: string;
  category: string;
  setting?: string;
  gross_charge?: number;
  discounted_cash_price?: number;
  min_negotiated_charge?: number;
  max_negotiated_charge?: number;
}

export default function HospitalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [prices, setPrices] = useState<ProcedurePrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      const [hospitalRes, pricesRes] = await Promise.all([
        fetch(`/api/hospitals?query=${id}`),
        fetch(`/api/hospital-prices?hospital_id=${id}`),
      ]);

      const hospitalData = (await hospitalRes.json()) as { success: boolean; data: Hospital[] };
      if (hospitalData.success && hospitalData.data.length > 0) {
        setHospital(hospitalData.data[0]);
      } else {
        setError('Hospital not found');
      }

      const pricesData = (await pricesRes.json()) as { success: boolean; data?: ProcedurePrice[] };
      if (pricesData.success) {
        setPrices(pricesData.data ?? []);
      }
    } catch {
      setError('An error occurred while loading hospital data');
    } finally {
      setLoading(false);
    }
  };

  const filteredPrices = searchQuery.trim()
    ? prices.filter(
        (p) =>
          p.procedure_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.code_id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : prices;

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <LoadingSpinner message="Loading hospital data..." />
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
                  {hospital?.common_name || hospital?.legal_name || 'Hospital Details'}
                </h2>
                {hospital?.legal_name !== hospital?.common_name && hospital?.legal_name && (
                  <p className="mt-1 text-sm text-gray-500">Legal Name: {hospital.legal_name}</p>
                )}
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Hospital ID</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{hospital?.hospital_id}</dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {hospital?.city}, {hospital?.state} {hospital?.zip_code}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Available Procedures</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{prices.length}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">Procedure Prices</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <div className="mb-6 max-w-md">
                  <label htmlFor="procedure-search" className="block text-sm font-medium text-gray-700">
                    Search Procedures
                  </label>
                  <input
                    type="text"
                    id="procedure-search"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search by name or code"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {filteredPrices.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">No procedures found.</p>
                ) : (
                  <PriceTable prices={filteredPrices} showHospital={false} showProcedure />
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
