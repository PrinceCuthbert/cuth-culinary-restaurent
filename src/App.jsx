import {useCallback, useEffect, useState} from "react";
import { Spinner } from "../src/components/ui/spinner.jsx";


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
        <h1 className="text-4xl font-serif italic text-slate-900">Connection Lost</h1>
        <p className="max-w-xs mx-auto text-slate-500 font-light leading-relaxed">
          It seems the flavors of the world are currently out of reach. 
          Please check your internet connection to continue your culinary journey.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-8 py-3 bg-slate-900 text-white text-[10px] font-bold tracking-[0.3em] uppercase rounded-xl hover:bg-orange-600 transition-all shadow-lg"
        >
          Try Reconnecting
        </button>
      </div>
    </div>
  );
}





function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}

function App() {
  const isOnline = useOnlineStatus();
  const [country, setCountry] = useState("Mexican");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);


    const categories = [
        "Mexican", "Italian", "Japanese", "French", "Chinese", "Indian",
        "American", "British", "Canadian", "Croatian", "Dutch", "Egyptian",
        "Filipino", "Greek", "Irish", "Jamaican", "Kenyan", "Malaysian",
        "Moroccan", "Polish", "Portuguese", "Russian", "Spanish", "Thai",
        "Tunisian", "Turkish", "Vietnamese"
    ];
  
  
  
  
  // useOnlineStatus.js





  const fetchRecipe = useCallback(async (signal) => {
    try {
      setLoading(true);
      const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`,{signal}
      );
      const data = await response.json();
      setRecipes(data.meals || []);

      // console.log(data.meals)
    } catch (err) {
      // 3. Ignore the error if the request was intentionally aborted
      if (err.name === 'AbortError') {
        return;
      }
      console.error("Failed to fetch recipes:", err);
    } finally {
      // Only stop loading if the request wasn't aborted
      if (!signal?.aborted) {
        setLoading(false);
      }
    }

  }, [country]);


  useEffect(() => {
    const controller = new AbortController(); // 1. Create a new controller

    fetchRecipe(controller.signal); // 2. Pass the signal to your function

    return () => {
      controller.abort(); // 3. The "Cleanup": Aborts the request if dependencies change
    };
  }, [fetchRecipe]);



    const fetchRecipeDetails = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await response.json();
            setSelectedRecipe(data.meals[0]); // Save the full recipe object
        } catch (err) {
            console.error("Error fetching details:", err);
        } finally {
            setLoading(false);
        }
    };
  
  
  if (!isOnline) {
    return <OfflineView />;
  }



  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-orange-50/30 text-slate-900 font-sans selection:bg-orange-100">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100/60 shadow-sm px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-2xl font-black tracking-[0.2em] uppercase text-slate-800 drop-shadow-sm">
            Culinary.
          </span>
          <div className="hidden sm:flex items-center gap-6">
            <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
              Spring Edition 2026
            </div>
            <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
          </div>
        </div>
      </nav>



        <main className="max-w-7xl mx-auto px-6 py-12">
            {selectedRecipe ? (
                /* --- DETAIL VIEW --- */
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <button
                        onClick={() => setSelectedRecipe(null)}
                        className="mb-8 text-[10px] font-bold tracking-widest uppercase text-slate-400 hover:text-orange-500 transition-colors"
                    >
                        ← Back to Gallery
                    </button>

                    <div className="grid md:grid-cols-2 gap-12">
                        <img src={selectedRecipe.strMealThumb} className="rounded-[2rem] shadow-2xl" />
                        <div className="space-y-6">
                            <h2 className="text-5xl font-serif italic">{selectedRecipe.strMeal}</h2>
                            <p className="text-slate-600 leading-relaxed">{selectedRecipe.strInstructions}</p>
                            {/* You can map through ingredients here later */}
                        </div>
                    </div>
                </div>
            ) : (

                <>
                    <main className="max-w-7xl mx-auto px-6 py-12 md:py-24">
                        {/* Modern Hero Section */}
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

                        {loading ? (
                            <div className="flex justify-center items-center h-80">
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin"></div>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <Spinner />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* The Professional Menu List */
                            /* The Professional Menu List */
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
                                                A masterfully crafted sensory experience, blending
                                                traditional {country} heritage with contemporary artisan
                                                techniques. Each ingredient is hand-selected for its purity
                                                and vibrant character.
                                            </p>

                                            <div className="pt-8 flex flex-col sm:flex-row items-center gap-6">
                                                <button
                                                    onClick={() => fetchRecipeDetails(meal.idMeal)} // Call the fetch function with the meal ID
                                                    className="group/btn relative px-10 py-5 bg-slate-900 ...">
                                                    <span className="relative z-10">Discover Recipe</span>
                                                    <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-accent ..."></div>
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
                        )}
                    </main>

                </>
            )}
        </main>



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
                )
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
    </div>
  );
}

export default App;
