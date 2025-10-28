import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeGrid = ({ recipes }) => {
  return (
    <div className="grid gap-6 mt-8 w-full max-w-5xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeGrid;
