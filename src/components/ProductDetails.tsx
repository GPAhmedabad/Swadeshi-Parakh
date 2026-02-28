"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, XCircle, Globe, ShoppingBag, Camera } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export type Product = {
  productName: string;
  companyName: string;
  originCountry: string;
  isIndian: boolean;
  scannedImage?: string;
  indianAlternatives?: {
    productName: string;
    companyName: string;
  }[];
};

type ProductDetailsProps = {
  product: Omit<Product, 'scannedImage'>;
};

export default function ProductDetails({ product: initialProduct }: ProductDetailsProps) {
  const [product, setProduct] = useState<Product>(initialProduct);

  useEffect(() => {
    const storedImage = sessionStorage.getItem('scannedImage');
    if (storedImage) {
      setProduct(p => ({ ...p, scannedImage: storedImage }));
      // Clean up sessionStorage

    }
  }, []);

  const { productName, companyName, originCountry, isIndian, indianAlternatives, scannedImage } = product;

  const originColor = isIndian ? "text-accent" : "text-destructive";

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

        <div className="flex flex-col gap-8">
          {scannedImage && (
            <Card className="animate-in fade-in-50 zoom-in-95 duration-500">
              <CardHeader>
                <CardTitle>Scanned Product</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={scannedImage} alt={productName} className="rounded-lg w-full" />
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-8">
          <Card className="w-full animate-in fade-in-50 zoom-in-95 duration-500">
            <CardHeader className="items-center text-center">
              {isIndian ? (
                <div className="flex flex-col items-center gap-4 text-accent">
                  <CheckCircle2 size={80} strokeWidth={1.5} />
                  <CardTitle className={`text-3xl font-bold font-headline ${originColor}`}>
                    Proudly Indian
                  </CardTitle>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 text-destructive">
                  <XCircle size={80} strokeWidth={1.5} />
                  <CardTitle className={`text-3xl font-bold font-headline ${originColor}`}>
                    Not of Indian Origin
                  </CardTitle>
                </div>
              )}
            </CardHeader>
            <CardContent className="mt-4">
              <div className="space-y-4 text-center">
                <h3 className="text-2xl font-semibold tracking-tight">{productName}</h3>
                <p className="text-lg text-muted-foreground">{companyName}</p>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Globe className="h-5 w-5" />
                  <p className={`text-lg font-bold ${originColor}`}>
                    {originCountry}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {!isIndian && indianAlternatives && indianAlternatives.length > 0 && (
            <Card className="w-full animate-in fade-in-50 zoom-in-95 duration-500 delay-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <ShoppingBag className="h-7 w-7 text-primary" />
                  <span>Indian Alternatives</span>
                </CardTitle>
                <CardDescription>Consider these similar products from Indian brands.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {indianAlternatives.map((alt, index) => (
                    <React.Fragment key={index}>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{alt.productName}</p>
                          <p className="text-sm text-muted-foreground">{alt.companyName}</p>
                        </div>
                      </div>
                      {index < indianAlternatives.length - 1 && <Separator />}
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <div className="mt-8 text-center">
        <Button asChild>
          <Link href="/scan/ai">
            <Camera className="mr-2" />
            Scan Another
          </Link>
        </Button>
      </div>
    </div>
  );
}
