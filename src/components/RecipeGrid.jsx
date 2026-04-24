import React from "react";
import { Spinner } from "./ui/spinner";

function RecipeGrid({ loading, recipes, country, fetchRecipeDetails }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-32 md:space-y-64">
      {recipes.map((meal, index) => (
        <div
          key={meal.idMeal}
          className={`group flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${
            index % 2 !== 0 ? "lg:flex-row-reverse" : ""
          }`}>
          {/* Asymmetrical Image Container */}
          <div className="w-full lg:w-3/5 relative">
            <div className="aspect-4/5 md:aspect-16/10 overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl relative z-10">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>

            {/* Decorative Elements */}
            <div
              className={`absolute -inset-4 md:-inset-8 border border-slate-100 rounded-[2.5rem] md:rounded-[4rem] -z-10 transition-transform duration-700 group-hover:scale-105 ${
                index % 2 !== 0 ? "-rotate-2" : "rotate-2"
              }`}></div>

            <div
              className={`absolute top-1/2 -translate-y-1/2 w-32 h-32 bg-orange-200/20 blur-3xl -z-20 rounded-full ${
                index % 2 !== 0 ? "-right-8" : "-left-8"
              }`}></div>
          </div>

          {/* Typography Content */}
          <div className="w-full lg:w-2/5 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-orange-50/50 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-100/50">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold tracking-[0.3em] text-orange-700 uppercase">
                  Signature {country}
                </span>
              </div>

              <h3 className="text-4xl md:text-6xl font-serif italic text-slate-900 leading-[1.1] tracking-tight group-hover:text-orange-600 transition-colors duration-500">
                {meal.strMeal}
              </h3>
            </div>

            <p className="text-slate-500 text-lg font-light leading-relaxed max-w-md mx-auto lg:mx-0">
              A masterfully crafted sensory experience, blending traditional{" "}
              {country} heritage with contemporary artisan techniques. Each
              ingredient is hand-selected for its purity and vibrant character.
            </p>

            <div className="pt-8 flex flex-col sm:flex-row items-center gap-6">
              <button
                onClick={() => fetchRecipeDetails(meal.idMeal)}
                className="group/btn relative px-10 py-5 bg-slate-900 text-white text-[10px] font-bold tracking-[0.3em] uppercase rounded-xl hover:bg-orange-600 transition-all shadow-lg">
                <span className="relative z-10">Discover Recipe</span>
              </button>

              <div className="h-px w-12 bg-slate-200 hidden sm:block"></div>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                Prep: 30 Mins
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeGrid;
