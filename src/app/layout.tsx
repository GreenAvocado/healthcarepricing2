import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'HealthcarePriceCompare - Compare Hospital Prices',
  description:
    'Find and compare prices for medical procedures at hospitals across the United States. Make informed healthcare decisions with transparent pricing data.',
  keywords: ['healthcare', 'hospital prices', 'medical costs', 'price transparency', 'CMS'],
  openGraph: {
    title: 'HealthcarePriceCompare - Compare Hospital Prices',
    description:
      'Find and compare prices for medical procedures at hospitals across the United States.',
    type: 'website',
  },
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
