"use client";

import Link from "next/link";
import Image from "next/image";
import BottomNav from "@/components/common/BottomNav";
import { Info, X } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [showLetter, setShowLetter] = useState(false);

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

            {/* Info Button for Encourgement Letter */}
            <button
              onClick={() => setShowLetter(true)}
              className="p-1.5 sm:p-2 bg-white dark:bg-gray-800 hover:bg-orange-50 dark:hover:bg-gray-700 text-gray-400 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 rounded-full transition-all shadow-sm border border-gray-100 dark:border-gray-700 hover:border-orange-200 hover:scale-105 duration-200"
              aria-label="Words of Encouragement"
              title="Words of Encouragement"
            >
              <Info className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
            </button>
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

      {/* Full Screen Image Viewer Modal for Appreciation Letter */}
      {showLetter && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setShowLetter(false)}
        >
          <div className="relative w-full max-w-lg aspect-[1/1.41] md:max-w-xl bg-transparent rounded-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors backdrop-blur-md"
              onClick={(e) => {
                e.stopPropagation();
                setShowLetter(false);
              }}
            >
              <X size={24} />
            </button>
            <Image
              src="/images/letter.jpeg"
              alt="Appreciation Letter"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

    </>
  );
}
