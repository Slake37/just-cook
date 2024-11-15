"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const MealCategories = () => {
  const [mealCategories, setMealCategories] = useState(null);
  useEffect(() => {
    const getMealCategories = async () => {
      const data = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const response = await data.json();

      setMealCategories(response.categories);
    };
    getMealCategories();
  }, []);
  return (
    <div className="flex flex-col justify-center items-start gap-3 p-3 bg-white w-full max-w-4xl mx-auto">
      <p className="text-4xl font-bebas font-semibold mt-5">Meal categories</p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-center items-center w-full">
        {mealCategories?.map((category) => (
          <Link
            href={`/${category.strCategory}`}
            key={category.idCategory}
            className="flex flex-col justify-center items-center shadow-lg hover:scale-105 hover:bg-gray-100 transition-all rounded-md"
          >
            <img src={category.strCategoryThumb} alt={category.strCategory} />
            <p>{category.strCategory}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default MealCategories;
