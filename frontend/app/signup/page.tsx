"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Shield, Zap, Check, User, Mail, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const router = useRouter();

    const strength = [
        { label: "8+ characters", met: password.length >= 8 },
        { label: "Uppercase letter", met: /[A-Z]/.test(password) },
        { label: "Number", met: /[0-9]/.test(password) },
        { label: "Special character", met: /[^A-Za-z0-9]/.test(password) },
    ];
    const strengthScore = strength.filter((s) => s.met).length;
    const strengthColor =
        strengthScore <= 1 ? "bg-red-500" : strengthScore === 2 ? "bg-amber-500" : strengthScore === 3 ? "bg-yellow-400" : "bg-emerald-400";
    const strengthLabel =
        strengthScore <= 1 ? "Weak" : strengthScore === 2 ? "Fair" : strengthScore === 3 ? "Good" : "Strong";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!agreed) {
            setError("Please agree to the Terms of Service");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (strengthScore < 2) {
            setError("Please choose a stronger password");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:8000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to sign up");
            }

            login(data.token, data.user);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "An error occurred during sign up");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden relative py-12">
            {/* Ambient orbs */}
            <div className="absolute -top-32 -left-16 w-[500px] h-[500px] rounded-full bg-violet-700 opacity-10 blur-[110px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-16 w-[520px] h-[520px] rounded-full bg-indigo-600 opacity-10 blur-[120px] pointer-events-none" />

            {/* Grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Form */}
            <div className="w-full max-w-[560px] flex flex-col justify-center px-6 sm:px-12 relative z-10 my-auto">
                {/* Heading */}
                <div className="mb-8">
                    <h2
                        className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight mb-2"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        Create your account
                    </h2>
                    <p className="text-slate-500 text-sm">
                        Already have an account?{" "}
                        <a href="/" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                            Sign in
                        </a>
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-slate-500 text-xs font-medium mb-2 tracking-wide uppercase">
                            Username
                        </label>
                        <div className="relative">
                            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full bg-slate-900 border border-white/[0.07] rounded-xl pl-9 pr-4 py-3 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-slate-500 text-xs font-medium mb-2 tracking-wide uppercase">
                            Email address
                        </label>
                        <div className="relative">
                            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none" />
                            <input
                                type="email"
                                placeholder="you@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-slate-900 border border-white/[0.07] rounded-xl pl-9 pr-4 py-3 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-2">
                        <label className="block text-slate-500 text-xs font-medium mb-2 tracking-wide uppercase">
                            Password
                        </label>
                        <div className="relative">
                            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-slate-900 border border-white/[0.07] rounded-xl pl-9 pr-12 py-3 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-violet-400 transition-colors p-1"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Strength meter */}
                    {password.length > 0 && (
                        <div className="mb-4">
                            <div className="flex gap-1 mb-2">
                                {[0, 1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className={`flex-1 h-1 rounded-full transition-all duration-300 ${i < strengthScore ? strengthColor : "bg-white/10"}`}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-x-3 gap-y-1">
                                    {strength.map(({ label, met }) => (
                                        <div key={label} className="flex items-center gap-1">
                                            <Check size={11} className={met ? "text-emerald-400" : "text-slate-700"} />
                                            <span className={`text-xs ${met ? "text-slate-400" : "text-slate-700"}`}>{label}</span>
                                        </div>
                                    ))}
                                </div>
                                <span className={`text-xs font-medium shrink-0 ml-2 ${strengthScore <= 1 ? "text-red-400" : strengthScore === 2 ? "text-amber-400" : strengthScore === 3 ? "text-yellow-400" : "text-emerald-400"
                                    }`}>{strengthLabel}</span>
                            </div>
                        </div>
                    )}

                    {/* Confirm password */}
                    <div className="mb-5">
                        <label className="block text-slate-500 text-xs font-medium mb-2 tracking-wide uppercase">
                            Confirm password
                        </label>
                        <div className="relative">
                            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none" />
                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="Re-enter your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full bg-slate-900 border border-white/[0.07] rounded-xl pl-9 pr-12 py-3 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-violet-400 transition-colors p-1"
                            >
                                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Agree to terms */}
                    <div className="flex items-start gap-3 mb-6">
                        <button
                            type="button"
                            onClick={() => setAgreed(!agreed)}
                            className={`w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${agreed
                                ? "border-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                                : "border-white/10 bg-white/[0.04] hover:border-violet-500/40"
                                }`}
                            style={agreed ? { backgroundColor: "#6272ea" } : {}}
                        >
                            {agreed && <Check size={11} className="text-white" strokeWidth={3} />}
                        </button>
                        <p className="text-slate-500 text-sm leading-snug">
                            I agree to the{" "}
                            <a href="#" className="text-violet-400 hover:text-violet-300 transition-colors">Terms of Service</a>
                            {" "}and{" "}
                            <a href="#" className="text-violet-400 hover:text-violet-300 transition-colors">Privacy Policy</a>
                        </p>
                    </div>

                    {/* CTA */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-white text-sm tracking-wide cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                        style={{
                            backgroundColor: "#6272ea",
                            boxShadow: "0 4px 24px rgba(98, 114, 234, 0.45)",
                        }}
                        onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#3a50e0ff" }}
                        onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#4b5eecff" }}
                    >
                        {loading ? "Creating account..." : "Create account"}
                        {!loading && <ArrowRight size={16} />}
                    </button>
                </form>
            </div>
        </div>
    );
}
