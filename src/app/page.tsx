"use client";

import { Camera, Info, User, LogIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/firebase/auth/use-user";

export default function Home() {
  const { user } = useUser();
  const isLoggedIn = !!user;
  const userPhoto = user?.photoURL || null;

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
                  src="https://github.com/Sujay-Patel-GitHub/experiment/blob/main/WhatsApp%20Image%202025-11-30%20at%2014.20.05.jpeg?raw=true"
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

            {/* Login Button */}
            {!isLoggedIn && (
              <Link href="/login">
                <button className="px-6 py-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 active:scale-95">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden pt-16 pb-24 flex flex-col">

        {/* Animated Background Shapes */}
        {/* Orange Shape - Top Left (Reduced to 40% to give more white space) */}
        <div className="absolute top-0 left-0 w-full h-[40%] z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[50%] -left-[10%] w-[120%] h-[150%] bg-orange-500/15 rounded-[40%] animate-wave-slow"></div>
          <div className="absolute -top-[60%] -left-[20%] w-[130%] h-[160%] bg-orange-600/10 rounded-[45%] animate-wave-slower"></div>
        </div>

        {/* Green Shape - Bottom Right (Reduced to 40% to give more white space) */}
        <div className="absolute bottom-0 right-0 w-full h-[40%] z-0 pointer-events-none overflow-hidden">
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
                  src="https://github.com/Sujay-Patel-GitHub/experiment/blob/main/WhatsApp%20Image%202025-11-30%20at%2014.20.05.jpeg?raw=true"
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

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-700 shadow-2xl">
        <div className="px-4 py-3">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between gap-3">

              {/* About Button */}
              <Link href="/about" className="flex-1">
                <button className="group relative w-full h-16 rounded-lg overflow-hidden transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <div className="relative flex flex-col items-center justify-center h-full gap-1">
                    <Info className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-600 transition-colors duration-200" />
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 group-hover:text-orange-600 transition-colors duration-200">About</span>
                  </div>
                </button>
              </Link>

              {/* Scan Button */}
              <Link href="/scan/ai" className="flex-1">
                <button className="group relative w-full h-20 rounded-lg overflow-hidden transition-all duration-200 bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-orange-500/25">
                  <div className="relative flex flex-col items-center justify-center h-full gap-1">
                    <Camera className="h-7 w-7 text-white" />
                    <span className="text-xs font-bold text-white uppercase tracking-wide">Scan</span>
                  </div>
                </button>
              </Link>

              {/* Profile Button */}
              <Link href="/profile" className="flex-1">
                <button className="group relative w-full h-16 rounded-lg overflow-hidden transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <div className="relative flex flex-col items-center justify-center h-full gap-1">
                    {isLoggedIn && userPhoto ? (
                      <div className="relative">
                        <Image
                          src={userPhoto}
                          alt="Profile"
                          width={28}
                          height={28}
                          className="rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-orange-600 transition-colors duration-200"
                        />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 group-hover:border-orange-600 transition-colors duration-200">
                        <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      </div>
                    )}
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 group-hover:text-orange-600 transition-colors duration-200">Profile</span>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes wave-slow {
          0% { transform: rotate(0deg) translate(0, 0); }
          50% { transform: rotate(5deg) translate(10px, 10px); }
          100% { transform: rotate(0deg) translate(0, 0); }
        }
        @keyframes wave-slower {
          0% { transform: rotate(0deg) translate(0, 0); }
          50% { transform: rotate(-5deg) translate(-10px, 15px); }
          100% { transform: rotate(0deg) translate(0, 0); }
        }

        .animate-wave-slow {
          animation: wave-slow 8s ease-in-out infinite;
        }
        .animate-wave-slower {
          animation: wave-slower 12s ease-in-out infinite;
        }
        .animate-wave-slow-reverse {
          animation: wave-slow 8s ease-in-out infinite reverse;
        }
        .animate-wave-slower-reverse {
          animation: wave-slower 12s ease-in-out infinite reverse;
        }
      `}</style>
    </>
  );
}
