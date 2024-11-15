"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { House } from "lucide-react";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const MealDetails = () => {
  const [mealDetails, setMealDetails] = useState();
  const [ingredientsList, setIngredientsList] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [modalToggle, setModalToggle] = useState(false);

  const params = useParams();

  // Fetch meal details
  useEffect(() => {
    const getMealDetails = async () => {
      const data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`
      );
      const response = await data.json();
      setMealDetails(response.meals[0]);
    };
    getMealDetails();
  }, []);

  // Fetch list of ingredients
  useEffect(() => {
    const getIngredientsList = async () => {
      const data = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
      );
      const response = await data.json();
      setIngredientsList(response.meals);
    };
    getIngredientsList();
  }, []);

  // Handle ingredient click
  const handleIngredientClick = (ingredientName) => {
    const ingredientDetails = ingredientsList.find(
      (item) =>
        item.strIngredient.toLowerCase() === ingredientName.toLowerCase()
    );
    if (ingredientDetails) {
      setSelectedIngredient(ingredientDetails);
      setModalToggle(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-start max-w-4xl mx-auto min-h-screen py-5">
      {/* Back to home link */}
      <Link
        href={"/"}
        className="flex ml-2 justify-center items-center border-2 px-3 py-1 rounded-md my-5 gap-3 hover:bg-slate-400 transition-all hover:text-gray-100"
      >
        <House />
        <p className="font-semibold">Back to home</p>
      </Link>

      {/* Meal details */}
      <div className="flex flex-col w-full md:flex-row gap-3">
        <img
          src={mealDetails?.strMealThumb}
          alt={mealDetails?.strMeal}
          className="max-w-[400px] rounded-md w-full object-cover"
        />
        <div className="p-3 w-full">
          <p className="font-bebas text-7xl font-semibold">
            {mealDetails?.strMeal}
          </p>
          <p className="text-2xl">{mealDetails?.strCategory}</p>
          <p className="text-lg">{mealDetails?.strArea}</p>

          {/* Ingredients */}
          <div className="flex flex-col justify-center items-start border-2 p-2 rounded-md w-full">
            <p className="underline text-lg font-semibold">Ingredients</p>
            <div className="w-full flex flex-col">
              {Array.from({ length: 30 }, (_, index) => {
                const ingredientKey = `strIngredient${index + 1}`;
                const measureKey = `strMeasure${index + 1}`;

                if (mealDetails?.[ingredientKey]) {
                  return (
                    <div
                      key={index}
                      className="flex gap-2 border-b-2 w-full justify-between py-3 cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        handleIngredientClick(mealDetails[ingredientKey])
                      }
                    >
                      <p>{mealDetails?.[ingredientKey]}</p>
                      <p>{mealDetails?.[measureKey]}</p>
                    </div>
                  );
                }
                return null; // Skip if the ingredient is not present
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Instructions and video */}
      <div className="flex flex-col justify-between items-start w-full">
        <p className="p-2 flex-1 md:text-lg ">{mealDetails?.strInstructions}</p>
        {mealDetails?.strYoutube && (
          <ReactPlayer
            url={mealDetails?.strYoutube}
            controls={false}
            width="100%"
            className="rounded-md"
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                  controls: 0, // Hides controls, including "Watch on YouTube"
                },
              },
            }}
          />
        )}
      </div>

      {/* Modal for ingredient details */}
      {modalToggle && selectedIngredient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
          <div className="bg-white p-5 rounded-md shadow-lg max-w-lg w-full m-3">
            <h2 className="text-2xl font-semibold">
              {selectedIngredient.strIngredient}
            </h2>
            <p className="text-xs md:text-sm mt-2">
              {selectedIngredient.strDescription}
            </p>
            <img
              src={`https://www.themealdb.com/images/ingredients/${selectedIngredient.strIngredient}-Small.png`}
              alt={selectedIngredient.strIngredient}
              className="w-32 h-32 object-contain mt-4 mx-auto"
            />
            <button
              onClick={() => setModalToggle(false)}
              className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealDetails;
