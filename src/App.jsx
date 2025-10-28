import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import RecipeGrid from "./components/RecipeGrid";
import FilterBar from "./components/FilterBar";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async (ingredient) => {
    if (!ingredient) {
      setError("Please enter an ingredient!");
      setRecipes([]);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await res.json();
      data.meals ? setRecipes(data.meals) : setError("No recipes found.");
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (type, value) => {
    if (!value) return;
    setLoading(true);
    setError("");
    try {
      const endpoint =
        type === "category"
          ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`
          : `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
      const res = await fetch(endpoint);
      const data = await res.json();
      data.meals ? setRecipes(data.meals) : setError("No recipes found.");
    } catch {
      setError("Failed to load filtered recipes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-50 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-orange-600 mb-6 text-center">
        🍳 Recipe Ideas
      </h1>

      <SearchBar onSearch={fetchRecipes} />
      <FilterBar onFilter={handleFilter} />

      {loading && <p className="mt-8 text-gray-600">Loading recipes...</p>}
      {error && !loading && <p className="mt-8 text-red-500">{error}</p>}

      {!loading && !error && recipes.length > 0 && (
        <RecipeGrid recipes={recipes} />
      )}
    </div>
  );
};

export default App;
