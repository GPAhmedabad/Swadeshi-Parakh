"use client";

import Image from "next/image";
import BottomNav from "@/components/common/BottomNav";
import { Github, Linkedin, Instagram, Facebook, Youtube, X, Award } from "lucide-react";
import { useState } from "react";

export default function TeamPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden flex flex-col pb-24">
            {/* Fixed Static Indian Theme Gradient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-white dark:bg-gray-900">
                {/* Soft Orange Top Left Array */}
                <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[60%] bg-orange-200/50 dark:bg-orange-900/30 rounded-[100%] blur-[100px]"></div>
                {/* Soft Green Bottom Right Array */}
                <div className="absolute bottom-[-20%] right-[-20%] w-[140%] h-[60%] bg-green-200/50 dark:bg-green-900/30 rounded-[100%] blur-[100px]"></div>
            </div>

            {/* Main Content */}
            <main className="pt-6 px-4 flex justify-center pb-32 relative z-10 w-full">
                <div className="max-w-2xl w-full space-y-8">
                    {/* Header Section */}
                    <div className="text-center space-y-4 mb-10 flex flex-col items-center">
                        <h1 className="text-[2rem] md:text-4xl font-bold tracking-tight font-headline drop-shadow-sm">
                            <span className="text-[#ea580c]">Meet the</span>{" "}
                            <span className="text-[#15803d]">Team</span>
                        </h1>
                        <p className="text-slate-800 dark:text-gray-300 font-bold px-4 text-[17px] md:text-lg leading-snug">
                            The visionaries and creators bringing Swadeshi<br />Parakh to life
                        </p>
                        <div className="h-[5px] shrink-0 w-32 bg-gradient-to-r from-orange-500 via-orange-100 to-green-500 rounded-full shadow-sm mt-2"></div>
                    </div>

                    <div className="space-y-8">
                        {/* Mentorship Section */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 pl-2 border-l-4 border-blue-500">Mentorship</h2>
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                {/* Prof Urvish Soni */}
                                <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 p-3 sm:p-4 bg-blue-50/50 dark:bg-gray-700/30 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                    <div
                                        className="w-16 h-16 sm:w-20 sm:h-20 relative rounded-full overflow-hidden shadow-inner border-2 border-blue-200 dark:border-blue-800 cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => setSelectedImage("/images/Prof Urvish Soni.jpeg")}
                                    >
                                        <Image
                                            src="/images/Prof Urvish Soni.jpeg"
                                            alt="Prof. Urvish Soni"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-[13px] sm:text-base leading-tight tracking-tight">Prof. Urvish Soni</h3>
                                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">Project Mentor & Guide</p>
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-3 pt-1">
                                        <a href="https://www.linkedin.com/in/urvish-soni-803a1265/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-400 hover:text-blue-600 transition-colors border border-gray-100 dark:border-gray-700 hover:scale-110 duration-200">
                                            <Linkedin size={18} />
                                        </a>
                                        <a href="https://www.instagram.com/urvishsoni/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-400 hover:text-pink-600 transition-colors border border-gray-100 dark:border-gray-700 hover:scale-110 duration-200">
                                            <Instagram size={18} />
                                        </a>
                                        <a href="https://www.facebook.com/urvishsoni" target="_blank" rel="noopener noreferrer" className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-400 hover:text-blue-500 transition-colors border border-gray-100 dark:border-gray-700 hover:scale-110 duration-200">
                                            <Facebook size={18} />
                                        </a>
                                        <a href="https://www.youtube.com/watch?v=0cvGjTk-aQU" title="National Award Recognition" target="_blank" rel="noopener noreferrer" className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-full shadow-sm text-amber-500 hover:text-amber-600 transition-colors border border-amber-100 dark:border-amber-800 hover:scale-110 duration-200">
                                            <Award size={18} />
                                        </a>
                                    </div>
                                </div>

                                {/* Prof Zankhana Mehta */}
                                <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 p-3 sm:p-4 bg-purple-50/50 dark:bg-gray-700/30 rounded-lg border border-purple-100 dark:border-purple-900/30">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-xl sm:text-2xl shadow-inner border border-purple-200 dark:border-purple-800">
                                        ZM
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-[13px] sm:text-base leading-tight tracking-tight">Prof. Zankhana Mehta</h3>
                                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">Project Mentor & Guide</p>
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-3 pt-1">
                                        <a href="https://www.instagram.com/zankhanamehta8/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-400 hover:text-pink-600 transition-colors border border-gray-100 dark:border-gray-700 hover:scale-110 duration-200">
                                            <Instagram size={18} />
                                        </a>
                                        <a href="https://www.youtube.com/watch?v=VvywxRpkBxQ" title="National Award Recognition" target="_blank" rel="noopener noreferrer" className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-full shadow-sm text-amber-500 hover:text-amber-600 transition-colors border border-amber-100 dark:border-amber-800 hover:scale-110 duration-200">
                                            <Award size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Developers Row */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 pl-2 border-l-4 border-orange-500">Developers</h2>
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                {/* Sujay */}
                                <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 p-3 sm:p-5 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-600/50">
                                    <div
                                        className="w-14 h-14 sm:w-16 sm:h-16 relative rounded-full overflow-hidden shadow-inner border-2 border-orange-200 dark:border-orange-800 cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => setSelectedImage("/images/Sujay Patel.jpg")}
                                    >
                                        <Image
                                            src="/images/Sujay Patel.jpg"
                                            alt="Sujay Patel"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-[13px] sm:text-base tracking-tight">Sujay Patel</h3>
                                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">Developer / Maker</p>
                                    </div>
                                    <div className="flex gap-1.5 sm:gap-3 pt-1 flex-wrap justify-center">
                                        <a href="https://www.linkedin.com/in/sujay-patel-38a460283/" target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-400 hover:text-blue-600 transition-colors border border-gray-100 dark:border-gray-700 hover:scale-110 duration-200">
                                            <Linkedin size={18} />
                                        </a>
                                        <a href="https://github.com/Sujay-Patel-GitHub" target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors border border-gray-100 dark:border-gray-700 hover:scale-110 duration-200">
                                            <Github size={18} />
                                        </a>
                                        <a href="https://www.instagram.com/sujayr07" target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-400 hover:text-pink-600 transition-colors border border-gray-100 dark:border-gray-700 hover:scale-110 duration-200">
                                            <Instagram size={18} />
                                        </a>
                                        <a href="https://www.youtube.com/@roboticengineerwala" target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-400 hover:text-red-600 transition-colors border border-gray-100 dark:border-gray-700 hover:scale-110 duration-200">
                                            <Youtube size={18} />
                                        </a>
                                    </div>
                                </div>

                                {/* Sumit */}
                                <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 p-3 sm:p-5 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-600/50">
                                    <div
                                        className="w-14 h-14 sm:w-16 sm:h-16 relative rounded-full overflow-hidden shadow-inner border-2 border-green-200 dark:border-green-800 cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => setSelectedImage("/images/Sumit Patel.jpeg")}
                                    >
                                        <Image
                                            src="/images/Sumit Patel.jpeg"
                                            alt="Sumit Patel"
                                            fill
                                            className="object-cover object-[center_60%]"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-[13px] sm:text-base tracking-tight">Sumit Patel</h3>
                                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">Developer / Maker</p>
                                    </div>
                                    <div className="flex gap-1.5 sm:gap-3 pt-1 flex-wrap justify-center">
                                        <a href="https://www.linkedin.com/in/sumit-patel-9060a7288/" target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-400 hover:text-blue-600 transition-colors border border-gray-100 dark:border-gray-700 hover:scale-110 duration-200">
                                            <Linkedin size={18} />
                                        </a>
                                        <a href="https://github.com/sumitpatel0911/" target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors border border-gray-100 dark:border-gray-700 hover:scale-110 duration-200">
                                            <Github size={18} />
                                        </a>
                                        <a href="https://www.instagram.com/sumit._.ptl/" target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-400 hover:text-pink-600 transition-colors border border-gray-100 dark:border-gray-700 hover:scale-110 duration-200">
                                            <Instagram size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <BottomNav />

            {/* Full Screen Image Viewer Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative w-full max-w-sm aspect-square md:max-w-md bg-transparent rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <button
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                        >
                            <X size={24} />
                        </button>
                        <Image
                            src={selectedImage}
                            alt="Enlarged View"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
