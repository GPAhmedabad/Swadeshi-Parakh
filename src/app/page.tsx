import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
            <Image 
                src="https://raw.githubusercontent.com/Sujay-Patel-GitHub/experiment/main/WhatsApp%20Image%202025-11-29%20at%2019.56.21.jpeg"
                alt="Swadeshi Parakh Logo"
                width={120}
                height={120}
                className="rounded-full"
            />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-primary">
          Swadeshi Parakh
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          Identify product origins. Support Indian brands. Make informed choices.
        </p>
      </div>

      <div className="mt-16 max-w-lg mx-auto">
        <Link href="/scan/ai" className="flex">
          <Card className="w-full hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col">
            <CardHeader className="flex-row items-center gap-4">
               <div className="bg-primary/10 p-3 rounded-full">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-headline">Scan a Product</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>
                Use your camera to scan a product and instantly view detailed product information and verify its origin. Login to start scanning.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
