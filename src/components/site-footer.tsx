import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold">HealthcarePriceCompare</h3>
            <p className="mt-2 text-sm text-gray-300">
              Helping consumers make informed healthcare decisions through price
              transparency.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-sm text-gray-300 hover:text-white">
                  Search Prices
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Legal</h3>
            <p className="mt-2 text-sm text-gray-300">
              This application uses hospital price transparency data as required
              by the Centers for Medicare & Medicaid Services (CMS).
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} HealthcarePriceCompare. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
