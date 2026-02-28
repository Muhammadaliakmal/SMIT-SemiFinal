"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Bell, Search, Menu } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && !isAuthenticated) {
            router.push("/");
        }
    }, [isMounted, isAuthenticated, router]);

    // Don't render until mounted to prevent hydration mismatch
    // Also wait for authentication to resolve
    if (!isMounted || !isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-violet-600 border-t-transparent animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden bg-slate-950">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex md:w-64 md:flex-col">
                <Sidebar />
            </div>

            {/* Mobile Sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/80 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <Sidebar />
            </div>

            {/* Main content */}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                {/* Top header */}
                <header className="flex h-16 flex-shrink-0 items-center gap-x-4 border-b border-white/10 bg-slate-950/50 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-slate-400 md:hidden hover:text-white"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="flex flex-1 items-center justify-end gap-x-4 lg:gap-x-6">
                        {/* Search */}
                        <div className="flex-1 flex max-w-md mx-auto sm:mx-0 sm:ml-auto">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Search patients, appointments..."
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            {/* Notifications */}
                            <button
                                type="button"
                                className="-m-2.5 p-2.5 text-slate-400 hover:text-slate-300 relative"
                            >
                                <span className="sr-only">View notifications</span>
                                <Bell className="h-5 w-5" aria-hidden="true" />
                                <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 border border-slate-950"></span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main page content area */}
                <main className="flex-1 overflow-y-auto focus:outline-none bg-slate-950 relative">
                    {/* Background glow effects */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 p-4 sm:p-6 lg:p-8 h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

