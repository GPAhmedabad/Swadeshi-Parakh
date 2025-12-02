"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { Home } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  const isScanPage = pathname === '/scan/ai';

  return (
    <header className="py-2 px-4 md:px-6 bg-card/80 backdrop-blur-sm sticky top-0 z-50 border-b shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/swadeshilogotabbar.png"
            alt="Swadeshi Parakh Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-2xl font-bold font-headline truncate">
            स्वदेशी परख
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          {isScanPage && (
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2 rounded-full border-gray-200 dark:border-gray-700 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-800 transition-all shadow-sm">
                <Home className="h-4 w-4" />
                <span className="font-medium">Home</span>
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header >
  );
}
