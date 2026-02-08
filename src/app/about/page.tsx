import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-3xl font-bold text-gray-900">About HealthcarePriceCompare</h1>
            <p className="mt-1 text-sm text-gray-500">
              Empowering consumers with healthcare price transparency
            </p>
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="prose prose-blue max-w-none">
              <h2>Our Mission</h2>
              <p>
                HealthcarePriceCompare helps consumers make informed decisions about their healthcare
                by providing transparent pricing information. We believe everyone deserves to know
                the cost of medical procedures before receiving care.
              </p>

              <h2>Hospital Price Transparency</h2>
              <p>
                In January 2021, the Centers for Medicare &amp; Medicaid Services (CMS) implemented a
                hospital price transparency rule requiring hospitals to provide clear, accessible
                pricing information online. This includes:
              </p>
              <ul>
                <li>A comprehensive machine-readable file with all items and services</li>
                <li>A consumer-friendly display of shoppable services</li>
              </ul>

              <h2>How We Help</h2>
              <ul>
                <li><strong>Price Comparison:</strong> Compare prices for the same procedure across multiple hospitals</li>
                <li><strong>Location-Based Search:</strong> Find healthcare providers in your area by ZIP code</li>
                <li><strong>Comprehensive Information:</strong> View standard charges, cash prices, and negotiated rates</li>
              </ul>

              <h2>Understanding Healthcare Prices</h2>
              <ul>
                <li><strong>Standard Charge:</strong> The hospital&apos;s full list price before any discounts</li>
                <li><strong>Discounted Cash Price:</strong> The price for patients paying without insurance</li>
                <li><strong>Min/Max Negotiated Rates:</strong> The range of prices negotiated with insurers</li>
              </ul>

              <h2>Limitations</h2>
              <ul>
                <li>Prices shown are hospital charges and may not reflect your actual out-of-pocket costs</li>
                <li>Your insurance plan&apos;s coverage, deductibles, and copays affect your final cost</li>
                <li>Not all hospitals fully comply with transparency requirements</li>
                <li>Price is one factor; quality, expertise, and convenience are also important</li>
              </ul>

              <h2>Data Sources</h2>
              <p>
                Our data comes from hospital price transparency machine-readable files as required
                by CMS regulations. We regularly update our database to provide current pricing.
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
