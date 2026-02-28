"use client";

import { useAuth } from "@/context/AuthContext";
import { Users, Calendar, TrendingUp, Activity, Plus } from "lucide-react";

export default function DashboardPage() {
    const { user } = useAuth();

    const stats = [
        { name: "Total Patients", value: "1,204", change: "+4.75%", isPositive: true, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
        { name: "Appointments Today", value: "42", change: "+12.5%", isPositive: true, icon: Calendar, color: "text-violet-500", bg: "bg-violet-500/10" },
        { name: "Consultations", value: "312", change: "-2.3%", isPositive: false, icon: Activity, color: "text-amber-500", bg: "bg-amber-500/10" },
        { name: "Revenue", value: "$12,400", change: "+15.2%", isPositive: true, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    ];

    const upcomingAppointments = [
        { id: 1, name: "Sarah Jenkins", time: "10:00 AM", type: "Checkup", status: "Confirmed" },
        { id: 2, name: "Michael Chang", time: "10:30 AM", type: "Follow up", status: "Waiting" },
        { id: 3, name: "Emma Wilson", time: "11:15 AM", type: "Consultation", status: "Scheduled" },
        { id: 4, name: "James Thompson", time: "1:00 PM", type: "Lab Results", status: "Scheduled" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        Welcome back, {user?.username || "Dr. Smith"}
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Here's what's happening at your clinic today.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-white/10 text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                        Download Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-500 transition-colors shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                        <Plus size={16} />
                        New Appointment
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">{stat.name}</p>
                                <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                            </div>
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className={`font-medium ${stat.isPositive ? "text-emerald-400" : "text-red-400"}`}>
                                {stat.change}
                            </span>
                            <span className="text-slate-500 ml-2">from last month</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming Appointments */}
                <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-xl flex flex-col">
                    <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                        <h2 className="text-base font-semibold text-white">Upcoming Appointments</h2>
                        <button className="text-sm font-medium text-violet-400 hover:text-violet-300">View all</button>
                    </div>
                    <div className="p-6 flex-1">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-400 uppercase bg-slate-900/50 rounded-lg">
                                    <tr>
                                        <th className="px-4 py-3 font-medium rounded-l-lg">Patient</th>
                                        <th className="px-4 py-3 font-medium">Time</th>
                                        <th className="px-4 py-3 font-medium">Type</th>
                                        <th className="px-4 py-3 font-medium rounded-r-lg">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {upcomingAppointments.map((apt) => (
                                        <tr key={apt.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                            <td className="px-4 py-4 font-medium text-slate-200">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                                                        {apt.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    {apt.name}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-slate-400">{apt.time}</td>
                                            <td className="px-4 py-4 text-slate-400">{apt.type}</td>
                                            <td className="px-4 py-4">
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${apt.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400' :
                                                        apt.status === 'Waiting' ? 'bg-amber-500/10 text-amber-400' :
                                                            'bg-blue-500/10 text-blue-400'
                                                    }`}>
                                                    {apt.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Quick Actions / Recent Activity */}
                <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-xl flex flex-col">
                    <div className="px-6 py-5 border-b border-white/5">
                        <h2 className="text-base font-semibold text-white">Recent Activity</h2>
                    </div>
                    <div className="p-6 flex-1">
                        <div className="relative border-l border-white/10 ml-3 space-y-8">
                            <div className="relative pl-6">
                                <span className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-violet-500 border-2 border-slate-900"></span>
                                <p className="text-sm font-medium text-slate-200">New patient registered</p>
                                <p className="text-xs text-slate-500 mt-1">Sarah Jenkins was added by Receptionist</p>
                                <span className="text-xs text-slate-600 mt-1 block">15 min ago</span>
                            </div>
                            <div className="relative pl-6">
                                <span className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
                                <p className="text-sm font-medium text-slate-200">Prescription fulfilled</p>
                                <p className="text-xs text-slate-500 mt-1">Prescription #8429 picked up</p>
                                <span className="text-xs text-slate-600 mt-1 block">2 hours ago</span>
                            </div>
                            <div className="relative pl-6">
                                <span className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-slate-900"></span>
                                <p className="text-sm font-medium text-slate-200">System backup completed</p>
                                <p className="text-xs text-slate-500 mt-1">Daily database snapshot successful</p>
                                <span className="text-xs text-slate-600 mt-1 block">Yesterday at 11:59 PM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

