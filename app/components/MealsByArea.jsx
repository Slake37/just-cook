"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const MealsByArea = () => {
  const [mealCategoriesByArea, setMealCategoriesByArea] = useState(null);
  useEffect(() => {
    const getMealCategoriesByArea = async () => {
      const data = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
      );
      const response = await data.json();

      setMealCategoriesByArea(response.meals);
    };
    getMealCategoriesByArea();
  }, []);
  return (
    <div className="flex flex-col justify-center items-start gap-3 p-3 bg-white w-full max-w-4xl mx-auto">
      <p className="text-4xl font-bebas font-semibold mt-5">
        Meal categories by area
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-center items-center w-full">
        {mealCategoriesByArea?.map((area) => (
          <Link
            href={`/area/${area.strArea}`}
            key={area.strArea}
            className="bg-gray-50 text-center text-xl py-2 hover:bg-gray-700 hover:text-gray-50 transition-all hover:scale-105 rounded-md hover:shadow-lg"
          >
            <p>{area.strArea}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default MealsByArea;
