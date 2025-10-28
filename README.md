🧁 Recipe Ideas — Find What to Cook Today!
🍳 Overview

Recipe Ideas is a simple, responsive web app built with React and Tailwind CSS that helps users find recipe ideas based on ingredients, cuisine, or category.
It uses TheMealDB API to fetch real recipes, images, and instructions.

👩‍🍳 User Persona:

Name: Taylor

Occupation: Busy Professional

Need: Taylor wants to quickly find recipe ideas based on what ingredients he has at home, his mood, or available time.

🚀 Features

✅ Search by Ingredient — Type “chicken”, “tomato”, etc., and instantly see matching recipes.
✅ Filter by Category or Cuisine — Use dropdowns to narrow down the results.
✅ Recipe Details Page — Click on a recipe card to view:

Ingredients list

Step-by-step instructions

YouTube tutorial link (if available)
✅ Responsive Design — Works beautifully on desktop and mobile.
✅ Clean UI — Built using Tailwind CSS with smooth layout and color palette.

🧠 Tech Stack
Layer	Technology
Frontend Framework	React (Vite)
Styling	Tailwind CSS
Routing	React Router DOM
API Source	TheMealDB API
💡 Component Details
🔸 SearchBar.jsx

Takes user input for ingredients.

Triggers the API fetch from App.jsx.

🔸 FilterBar.jsx

Fetches available categories and areas (cuisines).

Allows the user to filter recipes by selected values.

🔸 RecipeCard.jsx

Displays a single recipe with image and name.

Navigates to the RecipeDetails page on click.

🔸 RecipeDetails.jsx

Fetches full recipe info by id.

Displays image, category, ingredients, instructions, and a YouTube tutorial link.

🤝 Contributing

Feel free to fork this repo, open issues, or suggest new features!
Example: adding favorite recipes, meal planning, or AI-powered suggestions.

🧑‍💻 Author

👋 Varshitha T.
