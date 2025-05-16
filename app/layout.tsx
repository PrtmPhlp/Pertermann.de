import Footer from '../ui/Footer';
import './globals.css';
import Providers from './providers';
import { cn } from '@/lib/className';
import AnimateEnter from '@/ui/AnimateEnter';
import RollingMenu from '@/ui/RollingMenu';
import 'katex/dist/katex.min.css';
import { Metadata } from 'next';
import type { Viewport } from 'next';
import PlausibleProvider from 'next-plausible';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  initialScale: 1,
  themeColor: '#4e4bec',
  width: 'device-width',
};

export const metadata: Metadata = {
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  authors: [{ name: 'Pertermann', url: 'https://pertermann.de' }],
  category: 'design',
  creator: 'Pertermann',
  description: 'Tinkerer.',
  icons: {
    apple: '/static/favicons/apple-touch-icon.png',
    icon: '/static/favicons/favicon-196x196.png',
    shortcut: '/favicon.ico',
  },
  keywords: [
    'Next.js',
    'React',
    'JavaScript',
    'TypeScript',
    'TailwindCSS',
    'Design',
    'Engineering',
    'Frontend',
    'Developer',
    'Software',
    'Pertermann',
    'PrtmPhlp',
    'pertermann',
    'pertermann.de',
  ],
  manifest: '/static/favicons/site.webmanifest',
  metadataBase: new URL('https://pertermann.de'),
  openGraph: {
    description: 'Tinkerer.',
    images: [
      {
        alt: 'Pertermann',
        height: 1080,
        url: 'https://pertermann.de/static/images/og.png',
        width: 1920,
      },
    ],
    locale: 'de_DE',
    siteName: 'Pertermann.de',
    title: 'Pertermann.de',
    type: 'website',
    url: 'https://pertermann.de',
  },
  publisher: 'Pertermann',
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    index: true,
  },
  title: {
    default: 'Pertermann',
    template: '%s | Pertermann',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@prtmphlp',
    title: 'Pertermann',
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Umami: add to <head>: <script data-website-id="f397a6ab-a050-427e-995a-45610c078845" defer src="https://analytics.pertermann.de/script.js"></script>
    <html lang="de" suppressHydrationWarning translate="no">
      <head>
        <PlausibleProvider
          customDomain="https://plausible.pertermann.de"
          domain="pertermann.de"
          enabled={true}
          selfHosted={true}
          trackFileDownloads={true}
          // trackLocalhost={true}
          trackOutboundLinks={true}
        />
      </head>
      <body
        className={cn(
          `${inter.className}`,
          'h-full, min-h-screen, relative w-full',
          'my-4 bg-white dark:bg-gray-900 sm:my-24',
          'motion-reduce:transform-none motion-reduce:transition-none',
        )}
      >
        <Providers>
          <nav className="fixed bottom-4 left-2 z-50 sm:left-4 md:left-6">
            {/* <button className="rounded-full bg-blue-500 p-3">
              <PlusIcon className="h-6 w-6 text-white" />
            </button> */}
            {/* <div>hey</div> */}
            <RollingMenu />
            {/* <Swatch /> */}
          </nav>
          <AnimateEnter>
            <>
              {children}
              <Footer />
            </>
          </AnimateEnter>
        </Providers>
      </body>
    </html>
  );
}
