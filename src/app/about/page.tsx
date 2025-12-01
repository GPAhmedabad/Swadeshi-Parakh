"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useUser } from "@/firebase/auth/use-user";
import BottomNav from "@/components/common/BottomNav";

export default function AboutPage() {
  const { user } = useUser();
  const isLoggedIn = !!user;
  const userPhoto = user?.photoURL || null;

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
                    src="https://github.com/Sujay-Patel-GitHub/experiment/blob/main/WhatsApp%20Image%202025-11-30%20at%2014.20.05.jpeg?raw=true"
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
