'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'Search' },
  { href: '/about', label: 'About' },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-800">
          HealthcarePriceCompare
        </Link>
        <nav className="flex space-x-4">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={
                pathname === href
                  ? 'text-blue-800 font-medium'
                  : 'text-blue-600 hover:text-blue-800'
              }
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
