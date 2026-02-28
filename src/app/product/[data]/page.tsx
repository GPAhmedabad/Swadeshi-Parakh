import ProductDetails, { type Product } from '@/components/ProductDetails';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import React from 'react';

type ProductPageProps = {
  params: Promise<{
    data: string;
  }>;
};

function getProductData(encodedData: string): Omit<Product, 'scannedImage'> | null {
  try {
    // URL-safe base64 can use '-' and '_', so replace them before decoding.
    let safeEncodedData = encodedData.replace(/-/g, '+').replace(/_/g, '/');
    // Pad with '=' to make it a valid base64 string
    while (safeEncodedData.length % 4) {
      safeEncodedData += '=';
    }
    const decodedJson = Buffer.from(safeEncodedData, 'base64').toString('utf-8');
    const data = JSON.parse(decodedJson);

    // Basic validation for AI Scan result
    if (
      typeof data.productName === 'string' &&
      typeof data.companyName === 'string' &&
      typeof data.originCountry === 'string' &&
      typeof data.isIndian === 'boolean'
    ) {
      const product: Omit<Product, 'scannedImage'> = {
        productName: data.productName,
        companyName: data.companyName,
        originCountry: data.originCountry,
        isIndian: data.isIndian,
      };

      if (Array.isArray(data.indianAlternatives)) {
        product.indianAlternatives = data.indianAlternatives.filter(
          (alt: any) =>
            typeof alt.productName === 'string' &&
            typeof alt.companyName === 'string'
        );
      }
      return product;
    }

    return null;
  } catch (error) {
    console.error("Failed to parse product data:", error);
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = getProductData(resolvedParams.data);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-destructive">
              <AlertTriangle />
              Invalid Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">The scanned data is either invalid or not compatible with Swadeshi Parakh.</p>
            <Button asChild>
              <Link href="/scan/ai">Scan Again</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}
