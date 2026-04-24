import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import RecipeGrid from "../components/RecipeGrid";
import RecipeDetail from "../components/RecipeDetail";

function Home({ onLogout }) {
  const [country, setCountry] = useState("Mexican");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const categories = [
    "Mexican",
    "Italian",
    "Japanese",
    "French",
    "Chinese",
    "Indian",
    "American",
    "British",
    "Canadian",
    "Croatian",
    "Dutch",
    "Egyptian",
    "Filipino",
    "Greek",
    "Irish",
    "Jamaican",
    "Kenyan",
    "Malaysian",
    "Moroccan",
    "Polish",
    "Portuguese",
    "Russian",
    "Spanish",
    "Thai",
    "Tunisian",
    "Turkish",
    "Vietnamese",
    "Burundian",
  ];

  const fetchRecipe = useCallback(
    async (signal) => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`,
          { signal },
        );

        if (!response.ok) {
          throw new Error(`Could not fetch recipes: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.meals || data.meals.length === 0) {
          throw new Error(`No recipes found for ${country} cuisine.`);
        }

        setRecipes(data.meals);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        console.error("Failed to fetch recipes:", err);
        setError(
          err.message ||
            "Failed to fetch recipes. Please check your connection.",
        );
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [country],
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchRecipe(controller.signal);
    return () => {
      controller.abort();
    };
  }, [fetchRecipe]);

  const fetchRecipeDetails = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );

      if (!response.ok) {
        throw new Error(
          `Could not fetch recipe details: ${response.statusText}`,
        );
      }

      const data = await response.json();
      setSelectedRecipe(data.meals[0]);
    } catch (err) {
      console.error("Error fetching details:", err);
      setError(err.message || "Failed to fetch recipe details.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    throw new Error(error);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-orange-50/30 text-slate-900 font-sans selection:bg-orange-100">
      <Navbar onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {selectedRecipe ? (
          <RecipeDetail
            selectedRecipe={selectedRecipe}
            setSelectedRecipe={setSelectedRecipe}
          />
        ) : (
          <div className="space-y-12">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
              <Hero
                country={country}
                setCountry={setCountry}
                categories={categories}
              />

              <RecipeGrid
                loading={loading}
                recipes={recipes}
                country={country}
                fetchRecipeDetails={fetchRecipeDetails}
              />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
