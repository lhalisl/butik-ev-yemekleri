import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { CartProvider } from '@/contexts/CartContext';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hazal Chef | Butik Ev Yemekleri — Esenyurt İstanbul',
  description: 'Şef Hazal Demir imzalı günlük taze ev yemekleri. Online sipariş verin. Gece 24\'e kadar teslimat. Esenyurt, İstanbul.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          {children}
          <Toaster position="top-center" richColors />
        </CartProvider>
      </body>
    </html>
  );
}
