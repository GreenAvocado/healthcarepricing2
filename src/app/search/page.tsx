'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { LoadingSpinner } from '@/components/loading-spinner';

interface Procedure {
  code_id: string;
  description: string;
  code_type: string;
  category?: string;
}

interface Hospital {
  hospital_id: string;
  legal_name: string;
  common_name?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const [zipCode, setZipCode] = useState(searchParams.get('zip') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [activeTab, setActiveTab] = useState('procedures');

  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const performSearch = useCallback(async (query: string, tab: string, zip: string) => {
    if (!query) return;

    setLoading(true);
    setError('');

    try {
      if (tab === 'procedures') {
        const response = await fetch(`/api/procedures?query=${encodeURIComponent(query)}`);
        const data = (await response.json()) as { success: boolean; data?: Procedure[]; error?: string };
        if (data.success) {
          setProcedures(data.data ?? []);
        } else {
          setError(data.error || 'Failed to search procedures');
        }
      } else {
        const params = new URLSearchParams({ query });
        if (zip) params.append('zip_code', zip);

        const response = await fetch(`/api/hospitals?${params.toString()}`);
        const data = (await response.json()) as { success: boolean; data?: Hospital[]; error?: string };
        if (data.success) {
          setHospitals(data.data ?? []);
        } else {
          setError(data.error || 'Failed to search hospitals');
        }
      }
    } catch {
      setError('An error occurred while searching');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const q = searchParams.get('query');
    if (q) {
      performSearch(q, activeTab, zipCode);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery, activeTab, zipCode);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (searchQuery) {
      performSearch(searchQuery, tab, zipCode);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Search Healthcare Prices
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Find procedures or hospitals to compare prices
            </p>
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="search-query" className="block text-sm font-medium text-gray-700">
                    Search Term
                  </label>
                  <input
                    type="text"
                    id="search-query"
                    placeholder="Procedure name, code, or hospital name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="sm:w-1/4">
                  <label htmlFor="zip-code" className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zip-code"
                    inputMode="numeric"
                    pattern="[0-9]{5}"
                    maxLength={5}
                    placeholder="e.g. 10001"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  />
                </div>
                <div className="sm:flex-none sm:self-end">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>

            {/* Tabs */}
            <div className="mt-6 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {['procedures', 'hospitals'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Results */}
            <div className="mt-6">
              {loading ? (
                <LoadingSpinner message="Loading results..." />
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : activeTab === 'procedures' ? (
                <div>
                  {procedures.length === 0 && searchQuery ? (
                    <p className="text-center py-12 text-gray-500">
                      No procedures found matching &quot;{searchQuery}&quot;
                    </p>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {procedures.map((proc) => (
                        <li key={proc.code_id}>
                          <Link
                            href={`/procedure/${proc.code_id}${zipCode ? `?zip=${zipCode}` : ''}`}
                            className="block hover:bg-gray-50 px-4 py-4"
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-lg font-medium text-blue-600 truncate">
                                {proc.description}
                              </p>
                              <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                {proc.code_type}
                              </span>
                            </div>
                            <div className="mt-1 flex gap-4 text-sm text-gray-500">
                              <span>Code: {proc.code_id}</span>
                              {proc.category && <span>Category: {proc.category}</span>}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <div>
                  {hospitals.length === 0 && searchQuery ? (
                    <p className="text-center py-12 text-gray-500">
                      No hospitals found matching &quot;{searchQuery}&quot;
                    </p>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {hospitals.map((hospital) => (
                        <li key={hospital.hospital_id}>
                          <Link
                            href={`/hospital/${hospital.hospital_id}`}
                            className="block hover:bg-gray-50 px-4 py-4"
                          >
                            <p className="text-lg font-medium text-blue-600 truncate">
                              {hospital.common_name || hospital.legal_name}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {hospital.city}, {hospital.state} {hospital.zip_code}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading..." />}>
      <SearchContent />
    </Suspense>
  );
}
