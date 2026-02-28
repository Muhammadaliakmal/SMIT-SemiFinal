"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Shield, Zap, Check, User, Mail, Lock } from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

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
      <div className="w-full max-w-[560px] flex flex-col justify-center px-6 sm:px-12 py-12 relative z-10">

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
            <a href="#" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Sign in
            </a>
          </p>
        </div>

        {/* Social */}
        <div className="flex gap-3 mb-7">
          {[
            {
              label: "Google",
              icon: (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              ),
            },
            {
              label: "GitHub",
              icon: (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              ),
            },
          ].map(({ label, icon }) => (
            <button
              key={label}
              className="flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-white/[0.04] border border-white/[0.07] text-slate-400 text-sm font-medium hover:bg-white/[0.08] hover:border-white/[0.13] hover:text-slate-200 transition-all duration-200 cursor-pointer"
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-7">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-slate-700 text-xs uppercase tracking-widest">or with email</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* Name row */}
        <div className="flex gap-3 mb-4">
          {["First name", "Last name"].map((label) => (
            <div key={label} className="flex-1">
              <label className="block text-slate-500 text-xs font-medium mb-2 tracking-wide uppercase">
                {label}
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none" />
                <input
                  type="text"
                  placeholder={label.split(" ")[0]}
                  className="w-full bg-slate-900 border border-white/[0.07] rounded-xl pl-9 pr-4 py-3 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200"
                />
              </div>
            </div>
          ))}
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
              className="w-full bg-slate-900 border border-white/[0.07] rounded-xl pl-9 pr-12 py-3 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200"
            />
            <button
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
              <span className={`text-xs font-medium shrink-0 ml-2 ${
                strengthScore <= 1 ? "text-red-400" : strengthScore === 2 ? "text-amber-400" : strengthScore === 3 ? "text-yellow-400" : "text-emerald-400"
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
              className="w-full bg-slate-900 border border-white/[0.07] rounded-xl pl-9 pr-12 py-3 text-slate-200 text-sm placeholder-slate-700 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200"
            />
            <button
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
            onClick={() => setAgreed(!agreed)}
            className={`w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
              agreed
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

        {/* CTA — same blue as login #6272ea */}
        <button
          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-white text-sm tracking-wide cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          style={{
            backgroundColor: "#6272ea",
            boxShadow: "0 4px 24px rgba(98, 114, 234, 0.45)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7283f0")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6272ea")}
        >
          Create account
          <ArrowRight size={16} />
        </button>

       
      </div>
    </div>
  );
}