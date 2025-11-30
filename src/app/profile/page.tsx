"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { useUser } from "@/firebase/auth/use-user";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
    const { user, isLoading } = useUser();
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
    }, [user, isLoading, router]);

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            toast({
                title: "Logged Out",
                description: "You have been successfully logged out.",
            });
            router.push("/");
        } catch (error: any) {
            console.error("Logout error", error);
            toast({
                variant: "destructive",
                title: "Logout Failed",
                description: error.message || "An error occurred while logging out.",
            });
        }
    };

    if (isLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50/30 via-white to-green-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
                <p className="text-gray-600 dark:text-gray-300">Loading...</p>
            </div>
        );
    }

    return (
        <>
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="px-4">
                    <div className="flex items-center justify-between h-14">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="https://github.com/Sujay-Patel-GitHub/experiment/blob/main/WhatsApp%20Image%202025-11-30%20at%2014.20.05.jpeg?raw=true"
                                alt="Swadeshi Parakh"
                                width={32}
                                height={32}
                                className="rounded-full ring-2 ring-primary/20"
                            />
                            <span className="text-base font-bold text-gray-900 dark:text-white">
                                स्वदेशी परख
                            </span>
                        </Link>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            Welcome, {user.displayName?.split(' ')[0]?.toUpperCase() || 'USER'}
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-green-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-14 flex items-center justify-center p-4">
                <Card className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 shadow-xl">
                    <CardHeader className="pb-4">
                        <div className="flex flex-col items-center gap-4 pt-6">
                            {/* Profile Photo */}
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-orange-500 to-green-600 rounded-full opacity-30 blur-md"></div>
                                {user.photoURL ? (
                                    <Image
                                        src={user.photoURL}
                                        alt={user.displayName || "Profile"}
                                        width={120}
                                        height={120}
                                        className="relative rounded-full ring-4 ring-white dark:ring-gray-800 shadow-xl"
                                    />
                                ) : (
                                    <div className="relative w-[120px] h-[120px] rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center ring-4 ring-white dark:ring-gray-800 shadow-xl">
                                        <span className="text-4xl font-bold text-white">
                                            {user.displayName?.charAt(0)?.toUpperCase() || 'U'}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* User Name */}
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                                {user.displayName || "User"}
                            </h1>

                            {/* User Email */}
                            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                {user.email}
                            </p>
                        </div>
                    </CardHeader>

                    <CardContent className="pb-6">
                        {/* Logout Button */}
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="w-full border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Log Out
                        </Button>
                    </CardContent>
                </Card>
            </main>
        </>
    );
}
