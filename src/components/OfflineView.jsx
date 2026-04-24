import React from "react";

function OfflineView() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 animate-in fade-in zoom-in duration-700">
        <div className="relative inline-block">
          <div className="text-8xl">📡</div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold border-4 border-slate-50">
            !
          </div>
        </div>
        <h1 className="text-4xl font-serif italic text-slate-900">
          Connection Lost
        </h1>
        <p className="max-w-xs mx-auto text-slate-500 font-light leading-relaxed">
          It seems the flavors of the world are currently out of reach. Please
          check your internet connection to continue your culinary journey.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-slate-900 text-white text-[10px] font-bold tracking-[0.3em] uppercase rounded-xl hover:bg-orange-600 transition-all shadow-lg">
          Try Reconnecting
        </button>
      </div>
    </div>
  );
}

export default OfflineView;
