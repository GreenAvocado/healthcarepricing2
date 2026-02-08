'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

const COMMON_PROCEDURES = [
  { name: 'MRI - Knee', code: '73721', description: 'MRI joint without contrast' },
  { name: 'CT Scan - Head', code: '70450', description: 'CT head/brain without contrast' },
  { name: 'Colonoscopy', code: '45378', description: 'Diagnostic colonoscopy' },
  { name: 'Joint Replacement', code: '470', description: 'Major joint replacement (DRG)' },
  { name: 'Childbirth', code: '59400', description: 'Routine obstetric care' },
  { name: 'Physical Therapy', code: '97110', description: 'Therapeutic exercises' },
];

export default function Home() {
  const [zipCode, setZipCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SiteHeader />

      <main>
        {/* Hero */}
        <div className="bg-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Compare Healthcare Prices
            </h2>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              Find and compare prices for medical procedures at hospitals across
              the United States. Make informed decisions about your healthcare.
            </p>

            <form
              className="mt-10 max-w-xl mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `/search?zip=${encodeURIComponent(zipCode)}&query=${encodeURIComponent(searchQuery)}`;
              }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  maxLength={5}
                  placeholder="ZIP code"
                  className="flex-none w-full sm:w-32 px-5 py-3 rounded-md text-gray-900"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                />
                <input
                  type="text"
                  placeholder="Search procedures (e.g., MRI, colonoscopy)"
                  className="flex-1 px-5 py-3 rounded-md text-gray-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-md font-medium text-white bg-blue-500 hover:bg-blue-600"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Features */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">
              Why Use HealthcarePriceCompare?
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Transparent Pricing',
                  desc: 'Access real hospital pricing data required by CMS transparency regulations.',
                },
                {
                  title: 'Compare Costs',
                  desc: 'Easily compare prices for the same procedure across different hospitals.',
                },
                {
                  title: 'Find Nearby Options',
                  desc: 'Discover affordable healthcare options in your local area.',
                },
              ].map((f) => (
                <div key={f.title} className="text-center">
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{f.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Common Procedures */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Common Procedures
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                Start by exploring prices for frequently searched procedures
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {COMMON_PROCEDURES.map((proc) => (
                <Link
                  key={proc.code}
                  href={`/procedure/${proc.code}`}
                  className="rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-blue-400 hover:bg-blue-50 transition"
                >
                  <p className="text-lg font-medium text-gray-900">{proc.name}</p>
                  <p className="text-sm text-gray-500 truncate">{proc.description}</p>
                  <p className="text-xs text-gray-400 mt-1">Code: {proc.code}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
