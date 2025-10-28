// src/pages/RecipeDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("No recipe id provided.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchRecipe = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const data = await res.json();
        if (!data.meals || data.meals.length === 0) {
          setRecipe(null);
          setError("Recipe not found.");
        } else {
          setRecipe(data.meals[0]);
        }
      } catch (err) {
        if (err.name === "AbortError") {
          // fetch was cancelled — ignore
          return;
        }
        console.error("RecipeDetails fetch error:", err);
        setError("Failed to load recipe. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center">Loading recipe...</div>;
  }

  if (error) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <Link to="/" className="text-orange-600 hover:underline">
          ← Back
        </Link>
        <p className="mt-4 text-red-500">{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="p-8">
        <Link to="/" className="text-orange-600 hover:underline">
          ← Back
        </Link>
        <p className="mt-4">No recipe data available.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl">
      <Link to="/" className="text-orange-600 hover:underline mb-4 inline-block">
        ← Back to Recipes
      </Link>

      <h1 className="text-3xl font-bold mb-3">{recipe.strMeal}</h1>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="rounded-xl mb-6 w-full object-cover"
      />

      <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
        <span>🍽️ Category: {recipe.strCategory}</span>
        <span>🌍 Cuisine: {recipe.strArea}</span>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc list-inside mb-6">
        {Array.from({ length: 20 }).map((_, i) => {
          const ingredient = recipe[`strIngredient${i + 1}`];
          const measure = recipe[`strMeasure${i + 1}`];
          if (!ingredient || !ingredient.trim()) return null;
          return (
            <li key={i}>
              {ingredient}
              {measure ? ` — ${measure}` : ""}
            </li>
          );
        })}
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
      <p className="leading-relaxed text-gray-700 whitespace-pre-line">
        {recipe.strInstructions}
      </p>

      {recipe.strYoutube && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">🎥 Watch Tutorial</h2>
          <a
            href={recipe.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:underline"
          >
            {recipe.strYoutube}
          </a>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
