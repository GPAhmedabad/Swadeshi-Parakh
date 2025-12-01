"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Camera, Info, User, Home } from "lucide-react";
import { useUser } from "@/firebase/auth/use-user";

export default function BottomNav() {
    const pathname = usePathname();
    const { user } = useUser();
    const isLoggedIn = !!user;
    const userPhoto = user?.photoURL || null;

    const isHomePage = pathname === "/";

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-700 shadow-2xl">
            <div className="px-4 py-3">
                <div className="max-w-md mx-auto">
                    <div className="flex items-center justify-between gap-3">

                        {/* About Button */}
                        <Link href="/about" className="flex-1">
                            <button className={`group relative w-full h-16 rounded-lg overflow-hidden transition-all duration-200 ${pathname === '/about' ? 'bg-orange-50 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                                <div className="relative flex flex-col items-center justify-center h-full gap-1">
                                    <Info className={`h-5 w-5 ${pathname === '/about' ? 'text-orange-600' : 'text-gray-600 dark:text-gray-400 group-hover:text-orange-600'} transition-colors duration-200`} />
                                    <span className={`text-xs font-semibold ${pathname === '/about' ? 'text-orange-600' : 'text-gray-600 dark:text-gray-400 group-hover:text-orange-600'} transition-colors duration-200`}>About</span>
                                </div>
                            </button>
                        </Link>

                        {/* Center Button: Scan (on Home) or Home (on other pages) */}
                        {isHomePage ? (
                            <Link href="/scan/ai" className="flex-1">
                                <button className="group relative w-full h-20 rounded-lg overflow-hidden transition-all duration-200 bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-orange-500/25">
                                    <div className="relative flex flex-col items-center justify-center h-full gap-1">
                                        <Camera className="h-7 w-7 text-white" />
                                        <span className="text-xs font-bold text-white uppercase tracking-wide">Scan</span>
                                    </div>
                                </button>
                            </Link>
                        ) : (
                            <Link href="/" className="flex-1">
                                <button className="group relative w-full h-20 rounded-lg overflow-hidden transition-all duration-200 bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-orange-500/25">
                                    <div className="relative flex flex-col items-center justify-center h-full gap-1">
                                        <Home className="h-7 w-7 text-white" />
                                        <span className="text-xs font-bold text-white uppercase tracking-wide">Home</span>
                                    </div>
                                </button>
                            </Link>
                        )}

                        {/* Profile Button */}
                        <Link href="/profile" className="flex-1">
                            <button className={`group relative w-full h-16 rounded-lg overflow-hidden transition-all duration-200 ${pathname === '/profile' ? 'bg-orange-50 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                                <div className="relative flex flex-col items-center justify-center h-full gap-1">
                                    {isLoggedIn && userPhoto ? (
                                        <div className="relative">
                                            <Image
                                                src={userPhoto}
                                                alt="Profile"
                                                width={28}
                                                height={28}
                                                className={`rounded-full border-2 ${pathname === '/profile' ? 'border-orange-600' : 'border-gray-300 dark:border-gray-600 group-hover:border-orange-600'} transition-colors duration-200`}
                                            />
                                        </div>
                                    ) : (
                                        <div className={`w-7 h-7 rounded-full ${pathname === '/profile' ? 'bg-orange-100 dark:bg-gray-700 border-orange-600' : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 group-hover:border-orange-600'} flex items-center justify-center border-2 transition-colors duration-200`}>
                                            <User className={`h-4 w-4 ${pathname === '/profile' ? 'text-orange-600' : 'text-gray-600 dark:text-gray-300'} `} />
                                        </div>
                                    )}
                                    <span className={`text-xs font-semibold ${pathname === '/profile' ? 'text-orange-600' : 'text-gray-600 dark:text-gray-400 group-hover:text-orange-600'} transition-colors duration-200`}>Profile</span>
                                </div>
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </nav>
    );
}
