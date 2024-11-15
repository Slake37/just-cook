"use client";

import { House } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const mealsByArea = () => {
  const [mealsByArea, setMealsByArea] = useState(null);
  const params = useParams();
  useEffect(() => {
    const getMealsByArea = async () => {
      const data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${params.area}`
      );
      const response = await data.json();

      setMealsByArea(response.meals);
    };
    getMealsByArea();
  }, []);

  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto flex flex-col justify-center items-start p-3 ">
      <Link
        href={"/"}
        className="flex justify-center items-center border-2 px-3 py-1 rounded-md my-5 gap-3 hover:bg-slate-400 transition-all hover:text-gray-100"
      >
        <House />
        <p className="font-semibold">Back to home</p>
      </Link>
      <p className="font-bebas text-4xl">{params.area} meals</p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-auto">
        {mealsByArea?.map((meal) => (
          <Link
            href={`/${params.category}/${meal.idMeal}`}
            key={meal.idMeal}
            className="flex flex-col justify-start items-center p-3 hover:scale-105 hover:shadow-lg transition-all"
          >
            <img
              src={meal.strMealThumb}
              alt=""
              className="w-full max-w-[300px] rounded-md"
            />
            <p className="text-md font-medium">{meal.strMeal}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default mealsByArea;
