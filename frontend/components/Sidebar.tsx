"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    LayoutDashboard,
    Users,
    Calendar,
    FileText,
    Settings,
    LogOut,
    Stethoscope,
    Activity
} from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    // Determine the role for specific navigation items if needed, or keep it generic
    const role = user?.role || 'patient'; // Default fallback

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
        { name: "Patients", href: "/dashboard/patients", icon: Users },
        { name: "Prescriptions", href: "/dashboard/prescriptions", icon: FileText },
        { name: "Diagnosis", href: "/dashboard/diagnosis", icon: Activity },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ];

    return (
        <div className="flex h-full w-64 flex-col bg-slate-950 border-r border-white/10">
            {/* Logo area */}
            <div className="flex h-16 items-center px-6 border-b border-white/10">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="bg-violet-600 p-1.5 rounded-lg">
                        <Stethoscope size={20} className="text-white" />
                    </div>
                    <span className="font-bold text-lg text-white tracking-tight">MedCare</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-3">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                            ? "bg-violet-500/10 text-violet-400"
                                            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                                        }`}
                                >
                                    <item.icon size={18} className={isActive ? "text-violet-400" : "text-slate-500"} />
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User Profile / Logout footer */}
            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 px-2 py-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-xs uppercase">
                        {user?.username?.charAt(0) || user?.email?.charAt(0) || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                            {user?.username || "Loading..."}
                        </p>
                        <p className="text-xs text-slate-500 truncate capitalize">
                            {role}
                        </p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                >
                    <LogOut size={18} />
                    Log out
                </button>
            </div>
        </div>
    );
}

