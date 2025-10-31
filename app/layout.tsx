import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';

const inter = Inter({ 
  subsets: ['latin'],
  preload: true,
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Modern Remodeling & Architecture | Transform Your Space',
  description: 'Discover stunning before & after architectural transformations. Expert remodeling services that bring your vision to life.',
  keywords: 'architecture, remodeling, home renovation, before and after, modern design',
  openGraph: {
    title: 'Modern Remodeling & Architecture | Transform Your Space',
    description: 'Discover stunning before & after architectural transformations.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-screen px-4 md:px-6 lg:px-8 pt-8 pb-16 md:pt-12 md:pb-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}