import React from "react";

function Footer() {
  return (
    <footer className="relative py-32 overflow-hidden bg-slate-900">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-700 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col items-center space-y-12">
          <span className="text-3xl font-black tracking-[0.3em] uppercase text-white">
            Culinary<span className="text-orange-500">.</span>
          </span>

          <div className="flex flex-wrap justify-center gap-12 text-slate-400">
            {["About", "Ingredients", "Chefs", "Contact", "Newsletter"].map(
              (item) => (
                <button
                  key={item}
                  className="text-[11px] font-bold tracking-[0.2em] uppercase hover:text-orange-400 transition-colors duration-300">
                  {item}
                </button>
              ),
            )}
          </div>

          <div className="w-24 h-px bg-slate-800"></div>

          <div className="space-y-4 text-center">
            <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-slate-500">
              &copy; 2026 Fine Dining Culture • Kigali, Rwanda
            </p>
            <div className="flex justify-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
