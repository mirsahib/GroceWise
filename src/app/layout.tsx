import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { ChildrenProp } from '@/interfaces/interfaces';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GroceWise',
  description:
    'A smart grocery companion, leveraging cutting-edge AI and machine learning.',
};

export default function RootLayout({ children }: ChildrenProp) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="max-w-[1280px] min-h-[200vh] xl:mx-auto px-3 py-10">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
