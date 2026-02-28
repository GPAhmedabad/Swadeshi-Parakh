"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Camera, Info, User, Home, Users } from "lucide-react";

export default function BottomNav() {
    const pathname = usePathname();

    const isHomePage = pathname === "/";

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-700 shadow-2xl">
            <div className="px-4 py-3">
                <div className="max-w-md mx-auto">
                    <div className="flex items-center justify-between gap-3">

                        {/* About Button */}
                        <Link href="/about" className="flex-1">
                            <div className={`group relative w-full h-16 rounded-lg overflow-hidden transition-all duration-200 ${pathname === '/about' ? 'bg-orange-50 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                                <div className="relative flex flex-col items-center justify-center h-full gap-1">
                                    <Info className={`h-5 w-5 ${pathname === '/about' ? 'text-orange-600' : 'text-gray-600 dark:text-gray-400 group-hover:text-orange-600'} transition-colors duration-200`} />
                                    <span className={`text-xs font-semibold ${pathname === '/about' ? 'text-orange-600' : 'text-gray-600 dark:text-gray-400 group-hover:text-orange-600'} transition-colors duration-200`}>About</span>
                                </div>
                            </div>
                        </Link>

                        {/* Center Button: Scan (on Home) or Home (on other pages) */}
                        {isHomePage ? (
                            <Link href="/scan/ai" className="flex-1">
                                <div className="group relative w-full h-20 rounded-lg overflow-hidden transition-all duration-200 bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-orange-500/25">
                                    <div className="relative flex flex-col items-center justify-center h-full gap-1">
                                        <Camera className="h-7 w-7 text-white" />
                                        <span className="text-xs font-bold text-white uppercase tracking-wide">Scan</span>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <Link href="/" className="flex-1">
                                <div className="group relative w-full h-20 rounded-lg overflow-hidden transition-all duration-200 bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-orange-500/25">
                                    <div className="relative flex flex-col items-center justify-center h-full gap-1">
                                        <Home className="h-7 w-7 text-white" />
                                        <span className="text-xs font-bold text-white uppercase tracking-wide">Home</span>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Team Button */}
                        <Link href="/team" className="flex-1">
                            <div className={`group relative w-full h-16 rounded-lg overflow-hidden transition-all duration-200 ${pathname === '/team' ? 'bg-orange-50 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                                <div className="relative flex flex-col items-center justify-center h-full gap-1">
                                    <Users className={`h-5 w-5 ${pathname === '/team' ? 'text-orange-600' : 'text-gray-600 dark:text-gray-400 group-hover:text-orange-600'} transition-colors duration-200`} />
                                    <span className={`text-xs font-semibold ${pathname === '/team' ? 'text-orange-600' : 'text-gray-600 dark:text-gray-400 group-hover:text-orange-600'} transition-colors duration-200`}>Team</span>
                                </div>
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
        </nav>
    );
}
