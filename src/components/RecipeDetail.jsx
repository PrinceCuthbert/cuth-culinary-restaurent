import React from "react";

function RecipeDetail({ selectedRecipe, setSelectedRecipe }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button
        onClick={() => setSelectedRecipe(null)}
        className="mb-8 text-[10px] font-bold tracking-widest uppercase text-slate-400 hover:text-orange-500 transition-colors">
        ← Back to Gallery
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        <img
          src={selectedRecipe.strMealThumb}
          alt={selectedRecipe.strMeal}
          className="rounded-[2rem] shadow-2xl"
        />
        <div className="space-y-6">
          <h2 className="text-5xl font-serif italic">
            {selectedRecipe.strMeal}
          </h2>
          <p className="text-slate-600 leading-relaxed">
            {selectedRecipe.strInstructions}
          </p>
          {/* You can map through ingredients here later */}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
