import React from "react";

function GenericErrorView({ message, onRetry }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 animate-in fade-in zoom-in duration-700">
        <div className="relative inline-block">
          <div className="text-8xl">⚠️</div>
        </div>
        <h1 className="text-4xl font-serif italic text-slate-900">
          Oops! Something went wrong
        </h1>
        <p className="max-w-xs mx-auto text-slate-500 font-light leading-relaxed">
          {message ||
            "We encountered an unexpected error while preparing your culinary experience. Please try again."}
        </p>
        <button
          onClick={onRetry || (() => window.location.reload())}
          className="px-8 py-3 bg-slate-900 text-white text-[10px] font-bold tracking-[0.3em] uppercase rounded-xl hover:bg-orange-600 transition-all shadow-lg">
          Try Again
        </button>
      </div>
    </div>
  );
}

export default GenericErrorView;
