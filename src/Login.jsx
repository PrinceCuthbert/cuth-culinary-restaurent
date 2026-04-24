import React, { useState, useEffect } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [error, setError] = useState("");

  // Correct credentials for demo
  const CORRECT_EMAIL = "user@example.com";
  const CORRECT_PASSWORD = "password123";
  const MAX_ATTEMPTS = 4;
  const LOCK_TIME = 60; // 1 minute in seconds

  useEffect(() => {
    let timer;
    if (isLocked && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            setAttempts(0);
            setError("");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked, timeRemaining]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isLocked) {
      return;
    }

    // Check credentials
    if (email === CORRECT_EMAIL && password === CORRECT_PASSWORD) {
      setAttempts(0);
      setEmail("");
      setPassword("");
      setError("");
      // Navigate to home page on successful login
      if (onLogin) {
        onLogin();
      }
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
        setTimeRemaining(LOCK_TIME);
        setError("Attempts runout, try after 1 min.");
      } else {
        setError(
          `Invalid credentials. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`,
        );
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30 text-slate-900 font-sans selection:bg-orange-100 flex items-center justify-center px-6 py-12">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-orange-50/50 to-transparent -z-10 blur-3xl opacity-60"></div>

      <div className="relative w-full max-w-md">
        {/* Logo/Brand section */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="text-3xl font-black tracking-[0.3em] uppercase text-slate-800 drop-shadow-sm">
            Culinary<span className="text-orange-500">.</span>
          </span>
          <div className="mt-2 text-[10px] font-bold tracking-[0.4em] uppercase text-slate-400">
            Authentication Portal
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-slate-100/60 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-serif italic text-slate-900 mb-3 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-500 font-light leading-relaxed">
              Access your culinary journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div>
                <label className="block text-[12px] font-bold tracking-[0.2em] uppercase text-slate-600 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLocked}
                  required
                  className="w-full px-6 py-4 bg-slate-50/50 border-2 border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:border-orange-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-slate-100"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold tracking-[0.2em] uppercase text-slate-600 mb-3">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLocked}
                  required
                  className="w-full px-6 py-4 bg-slate-50/50 border-2 border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:border-orange-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-slate-100"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div
                className={`relative p-6 rounded-2xl border animate-in fade-in slide-in-from-top-2 duration-500 ${
                  isLocked
                    ? "bg-red-50/80 border-red-200 text-red-800"
                    : "bg-orange-50/80 border-orange-200 text-orange-800"
                }`}>
                <div className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      isLocked ? "bg-red-400" : "bg-orange-400"
                    }`}></div>
                  <div>
                    <p className="font-medium text-sm leading-relaxed">
                      {error}
                    </p>
                    {isLocked && (
                      <div className="mt-3 p-3 bg-white/50 rounded-xl">
                        <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-red-600 mb-1">
                          Time Remaining
                        </div>
                        <div className="text-2xl font-serif italic text-red-700">
                          {formatTime(timeRemaining)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLocked}
              className="group relative w-full px-8 py-5 bg-slate-900 text-white text-[12px] font-bold tracking-[0.3em] uppercase rounded-2xl transition-all duration-500 hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-500/25 hover:-translate-y-1 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
              <span className="relative z-10">
                {isLocked ? "Access Locked" : "Enter Kitchen"}
              </span>
              {!isLocked && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-12 pt-8 border-t border-slate-100">
            <div className="text-center space-y-3">
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-slate-400">
                Demo Access
              </p>
              <div className="space-y-1">
                <div className="text-[11px] text-slate-500 font-mono bg-slate-50 px-4 py-2 rounded-lg">
                  user@example.com
                </div>
                <div className="text-[11px] text-slate-500 font-mono bg-slate-50 px-4 py-2 rounded-lg">
                  password123
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border border-slate-200/50 flex items-center justify-center rotate-12 bg-white/30 backdrop-blur-sm shadow-sm font-serif italic text-slate-400 text-xs -z-10">
          Est. 2026
        </div>

        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-orange-200/20 blur-3xl rounded-full -z-20"></div>
      </div>
    </div>
  );
}

export default Login;
