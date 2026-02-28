"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Mail, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to sign in");
      }

      login(data.token, data.user);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden relative">
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
      <div className="w-full max-w-[480px] flex flex-col justify-center px-6 sm:px-12 py-12 relative z-10">
        {/* Heading */}
        <div className="mb-8">
          <h2
            className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight mb-2"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Welcome back
          </h2>
          <p className="text-slate-500 text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Sign up
            </a>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-slate-500 text-xs font-medium tracking-wide uppercase">
                Password
              </label>
              <a href="#" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
            {loading ? "Signing in..." : "Sign in"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>
      </div>
    </div>
  );
}