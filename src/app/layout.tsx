import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { DemoModeBanner } from '@/components/layout/DemoModeBanner';
import { OfflineIndicator } from '@/components/layout/OfflineIndicator';
import { AskKrishiModal } from '@/components/ai/AskKrishiModal';

export const metadata: Metadata = {
  title: 'Bharat Krishi Intelligence Network (BKIN) — Digital Agriculture Platform',
  description:
    'From Data to Decisions — Smarter Farming for Every Indian Farmer. Transforming satellite, weather, soil, and crop telemetry into simple, localized, actionable farming intelligence.',
  keywords: [
    'Digital Agriculture India',
    'BKIN',
    'Bharat Krishi',
    'Satellite Crop Monitoring',
    'AI Crop Doctor',
    'Soil Health Card',
    'Weather Forecast Farmer',
    'Regenerative Agriculture',
    'Indian Agriculture Public Infrastructure',
  ],
  authors: [{ name: 'Bharat Krishi Intelligence Network Consortium' }],
  manifest: '/manifest.json',
  openGraph: {
    title: 'Bharat Krishi Intelligence Network (BKIN)',
    description: 'From Data to Decisions — Smarter Farming for Every Indian Farmer.',
    siteName: 'BKIN',
    locale: 'en_IN',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0F5132',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icons/sprout.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-slate-50 text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">
        <AuthProvider>
          <AppProvider>
            <DemoModeBanner />
            <OfflineIndicator />
            <Navbar />
            <main id="main-content" tabIndex={-1} className="flex-1 pb-16 lg:pb-0 outline-none">
              {children}
            </main>
            <Footer />
            <MobileNav />
            <AskKrishiModal />
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

