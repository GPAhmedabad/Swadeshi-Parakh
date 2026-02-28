"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import BottomNav from "@/components/common/BottomNav";

import { Github, Linkedin, Instagram, Facebook, Youtube, Award, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useState, useRef } from "react";

export default function AboutPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage('{"event":"command","func":"' + (isPlaying ? 'pauseVideo' : 'playVideo') + '","args":""}', '*');
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage('{"event":"command","func":"' + (isMuted ? 'unMute' : 'mute') + '","args":""}', '*');
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pb-24">

      {/* Main Content */}
      <main className="pt-8 px-4 flex items-center justify-center min-h-[80vh]">
        <div className="max-w-lg w-full space-y-6">
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border-t-4 border-t-orange-500 border-x-0 border-b-0 rounded-xl overflow-hidden ring-1 ring-gray-100 dark:ring-gray-700">
            <CardHeader className="flex flex-col items-center pb-4 pt-6">
              {/* Logo with Glow */}
              <div className="relative mb-4 group">
                <div className="absolute -inset-3 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-full opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-full p-1 shadow-xl ring-2 ring-orange-50 dark:ring-gray-700">
                  <Image
                    src="/images/swadeshilogotabbar.png"
                    alt="Swadeshi Parakh Logo"
                    width={70}
                    height={70}
                    className="rounded-full"
                  />
                </div>
              </div>

              <CardTitle className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white font-serif mb-1">
                स्वदेशी परख
              </CardTitle>
              <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-green-500 rounded-full"></div>
            </CardHeader>

            <CardContent className="px-5 pb-6 space-y-4 text-center">
              {/* Explainer Video Section with Custom Controls */}
              <div className="mb-8 group relative z-20">
                <div className="w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 bg-black dark:bg-black ring-1 ring-gray-200 dark:ring-gray-700 pointer-events-none transition-transform">
                  <div className="relative w-full pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
                    <iframe
                      ref={iframeRef}
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/_iuVUyZySqQ?autoplay=1&mute=0&controls=0&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&enablejsapi=1"
                      title="Swadeshi Parakh Purpose"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>

                {/* Custom Action Buttons & Link */}
                <div className="flex flex-col items-center gap-3 mt-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={togglePlay}
                      title={isPlaying ? "Pause Video" : "Play Video"}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm bg-white dark:bg-gray-800 rounded-full shadow-sm text-orange-600 font-semibold border border-orange-100 dark:border-gray-700 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                      {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button
                      onClick={toggleMute}
                      title={isMuted ? "Unmute Video" : "Mute Video"}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm bg-white dark:bg-gray-800 rounded-full shadow-sm text-green-700 font-semibold border border-green-100 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                      {isMuted ? 'Unmute' : 'Mute'}
                    </button>
                  </div>
                  <a
                    href="https://youtu.be/_iuVUyZySqQ?si=5P6Ekpsjq6Oj4AJB"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 hover:text-red-500 transition-colors font-medium tracking-wide"
                  >
                    <Youtube size={14} />
                    View on YouTube
                  </a>
                </div>
              </div>

              {/* Text Content */}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base font-medium">
                <span className="text-orange-600 font-bold">स्वदेशी परख</span> एक ऐसा आंदोलन है जो उपभोक्ताओं को जागरूक बनाकर सही निर्णय लेने और भारतीय ब्रांडों का समर्थन करने के लिए प्रेरित करता है।
              </p>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                हमारा उद्देश्य यह है कि लोग आसानी से किसी भी उत्पाद की उत्पत्ति (Country of Origin) पहचान सकें, जिससे स्थानीय निर्माण और आर्थिक आत्मनिर्भरता को बढ़ावा मिले।
              </p>

              <div className="bg-orange-50 dark:bg-gray-700/50 p-4 rounded-lg border border-orange-100 dark:border-orange-900/30">
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed italic text-xs md:text-sm">
                  "सिर्फ किसी उत्पाद को स्कैन करके, आप तुरंत यह जान सकते हैं कि वह किस ब्रांड का है, किस देश में बना है, और उसके भारतीय विकल्प कौन-कौन से उपलब्ध हैं।"
                </p>
              </div>

              <div className="pt-1">
                <p className="text-gray-900 dark:text-white font-bold text-base md:text-xl leading-relaxed font-serif">
                  "आइए, एक-एक स्कैन के साथ एक मजबूत और आत्मनिर्भर भारत के निर्माण में हमारा साथ दें।"
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Highlighted Footer Note */}
          <div className="flex justify-center pb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-300">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wide">
                Version 1.0.0
              </span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                Made with <span className="text-red-500 animate-pulse text-lg">❤️</span> for <span className="text-orange-600 font-bold">India</span>
              </span>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
