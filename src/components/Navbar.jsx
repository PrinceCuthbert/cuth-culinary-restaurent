import React from "react";

function Navbar({ onLogout }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100/60 shadow-sm px-8 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <span className="text-2xl font-black tracking-[0.2em] uppercase text-slate-800 drop-shadow-sm">
          Culinary.
        </span>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-6">
            <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
              Spring Edition 2026
            </div>
            <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="px-6 py-2 bg-slate-900 text-white text-[10px] font-bold tracking-[0.3em] uppercase rounded-xl hover:bg-orange-600 transition-all shadow-lg">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
