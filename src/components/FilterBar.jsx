import React, { useEffect, useState } from "react";

const FilterBar = ({ onFilter }) => {
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      const [catRes, areaRes] = await Promise.all([
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list"),
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list"),
      ]);
      const catData = await catRes.json();
      const areaData = await areaRes.json();
      setCategories(catData.meals);
      setAreas(areaData.meals);
    };
    fetchFilters();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      <select
        onChange={(e) => onFilter("category", e.target.value)}
        className="border rounded-lg p-2 focus:ring-2 focus:ring-orange-400"
      >
        <option value="">Filter by Category</option>
        {categories.map((c) => (
          <option key={c.strCategory} value={c.strCategory}>
            {c.strCategory}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => onFilter("area", e.target.value)}
        className="border rounded-lg p-2 focus:ring-2 focus:ring-orange-400"
      >
        <option value="">Filter by Cuisine</option>
        {areas.map((a) => (
          <option key={a.strArea} value={a.strArea}>
            {a.strArea}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
