// src/components/RecipeCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!recipe?.idMeal) return;
    navigate(`/recipe/${recipe.idMeal}`);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer focus:outline-none"
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-700">{recipe.strMeal}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
