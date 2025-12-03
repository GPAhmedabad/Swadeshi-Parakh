"use client";

import Link from "next/link";
import Image from "next/image";
import BottomNav from "@/components/common/BottomNav";

export default function Home() {

  return (
    <>
      {/* Professional Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-orange-200 dark:border-orange-900 shadow-sm">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative overflow-hidden rounded-full border-2 border-orange-100 dark:border-orange-900/30 p-0.5">
                <Image
                  src="/images/swadeshilogotabbar.png"
                  alt="Swadeshi Parakh"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-wide font-serif">
                स्वदेशी परख
              </span>
            </Link>

            {/* Login Button Removed */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden pt-16 pb-24 flex flex-col">

        {/* Animated Background Shapes */}
        {/* Orange Shape - Top Left (Reduced to 40% to give more white space) */}
        <div className="absolute top-0 left-0 w-full h-[40%] z-0 pointer-events-none">
          <div className="absolute -top-[50%] -left-[10%] w-[120%] h-[150%] bg-orange-500/15 rounded-[40%] animate-wave-slow"></div>
          <div className="absolute -top-[60%] -left-[20%] w-[130%] h-[160%] bg-orange-600/10 rounded-[45%] animate-wave-slower"></div>
        </div>

        {/* Green Shape - Bottom Right (Reduced to 40% to give more white space) */}
        <div className="absolute bottom-0 right-0 w-full h-[40%] z-0 pointer-events-none">
          <div className="absolute -bottom-[50%] -right-[10%] w-[120%] h-[150%] bg-green-600/15 rounded-[40%] animate-wave-slow-reverse"></div>
          <div className="absolute -bottom-[60%] -right-[20%] w-[130%] h-[160%] bg-green-700/10 rounded-[45%] animate-wave-slower-reverse"></div>
        </div>

        <div className="w-full px-4 pt-6 relative z-10">
          {/* Hero Section */}
          <div className="text-center max-w-2xl mx-auto w-full">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative bg-white dark:bg-gray-800 rounded-full p-4 shadow-xl ring-1 ring-gray-100 dark:ring-gray-700">
                <Image
                  src="/images/swadeshilogotabbar.png"
                  alt="Swadeshi Parakh Logo"
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 drop-shadow-sm">
              <span className="text-orange-600">Swadeshi</span>{" "}
              <span className="text-green-700">Parakh</span>
            </h1>

            {/* Hindi Tagline */}
            <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-semibold px-4">
              "हर स्कैन में छुपी देश की पहचान।"
            </p>
          </div>


        </div>
      </main>

      <BottomNav />


    </>
  );
}
