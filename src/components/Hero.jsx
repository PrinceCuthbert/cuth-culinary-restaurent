import React from "react";

function Hero({ country, setCountry, categories }) {
  return (
    <div className="relative mb-32 overflow-hidden px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-linear-to-b from-orange-50/50 to-transparent -z-10 blur-3xl opacity-60"></div>

      <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-orange-100 bg-orange-50/30 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-orange-700">
            Gastronomy Redefined
          </h2>
        </div>

        <div className="relative">
          <h1 className="text-7xl md:text-[10rem] font-serif italic text-slate-900 leading-[0.8] tracking-tighter">
            Global{" "}
            <span className="block not-italic font-sans font-black uppercase text-slate-900 text-glow">
              Kitchen
            </span>
          </h1>
          <div className="absolute -top-8 -right-4 hidden lg:block">
            <div className="w-24 h-24 rounded-full border border-slate-200 flex items-center justify-center rotate-12 bg-white/50 backdrop-blur-sm shadow-sm font-serif italic text-slate-400 text-sm">
              Est. 2026
            </div>
          </div>
        </div>

        <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-light leading-relaxed">
          Explore the world through its most exquisite flavors. A curated
          collection of masterfully crafted recipes from every corner of the
          globe.
        </p>

        {/* Premium Category Selector */}
        <div className="pt-12">
          <div className="relative max-w-4xl mx-auto">
            <div className="mask-fade-edges overflow-hidden">
              <div className="inline-flex p-1.5 bg-slate-100/50 backdrop-blur-md rounded-2xl border border-white max-w-full overflow-x-auto no-scrollbar">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCountry(c)}
                    className={`relative px-8 py-3 rounded-xl text-[12px] font-bold tracking-widest uppercase transition-all duration-500 whitespace-nowrap ${
                      country === c
                        ? "text-white shadow-xl scale-105"
                        : "text-slate-400 hover:text-slate-600 hover:bg-white/40"
                    }`}>
                    {country === c && (
                      <div className="absolute inset-0 bg-slate-900 rounded-xl -z-10 animate-in zoom-in-95 duration-300"></div>
                    )}
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
