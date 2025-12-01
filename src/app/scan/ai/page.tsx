"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductScanner from '@/components/ProductScanner';
import { useUser } from '@/firebase/auth/use-user';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ScanAiPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline"><span className="text-orange-600">Swadeshi</span> Product Scan</h1>
        <p className="mt-2 text-muted-foreground">Point your camera at a product and capture an image to identify its origin.</p>
      </div>
      <ProductScanner />
    </div>
  );
}
