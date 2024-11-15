"use client";

import Image from "next/image";
import mealImage from "../plate.png";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Dynamically import ReactPlayer
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const RandomMeal = () => {
  const [randomMeal, setRandomMeal] = useState(null);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [modalToggle, setModalToggle] = useState(false);

  useEffect(() => {
    const getRandomMeal = async () => {
      const data = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const response = await data.json();
      setRandomMeal(response);
    };
    getRandomMeal();
  }, []);

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

  if (!randomMeal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      {/* Background Section */}
      <div className="w-full z-50 -mt-[30%] md:-mt-[30%] lg:-mt-[20%] bg-gradient-to-b from-transparent via-white to-white">
        <Image
          src={mealImage}
          width={500}
          height={500}
          alt="Meal Salmon"
          className="md:w-[450px] lg:w-[600px] mx-auto"
        />
      </div>

      {/* Main Content */}
      <div className="bg-gray-100 shadow-lg rounded-md text-black flex flex-col justify-center items-start gap-3 w-full max-w-4xl mx-auto p-3">
        {/* Meal Information */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-3 w-full max-w-4xl mx-auto p-3">
          <img
            src={randomMeal?.meals[0].strMealThumb}
            alt={randomMeal?.meals[0].strMeal}
            className="w-full max-w-[400px] rounded-md"
          />
          <div className="flex flex-col justify-center items-start w-full mx-auto">
            <p className="font-bebas text-4xl font-semibold">
              {randomMeal?.meals[0].strMeal}
            </p>
            <p className="text-2xl">{randomMeal?.meals[0].strCategory}</p>
            <p className="text-lg">{randomMeal?.meals[0].strArea}</p>
            <div className="flex flex-col justify-center items-start border-2 p-2 rounded-md w-full">
              <p className="underline text-lg font-semibold">Ingredients</p>
              <div className="w-full flex flex-col">
                {Array.from({ length: 30 }, (_, index) => {
                  const ingredientKey = `strIngredient${index + 1}`;
                  const measureKey = `strMeasure${index + 1}`;

                  if (randomMeal?.meals[0][ingredientKey]) {
                    return (
                      <div
                        key={index}
                        className="flex gap-2 border-b-2 w-full justify-between py-3 cursor-pointer hover:bg-gray-100"
                        onClick={() =>
                          handleIngredientClick(
                            randomMeal?.meals[0][ingredientKey]
                          )
                        }
                      >
                        <p>{randomMeal?.meals[0][ingredientKey]}</p>
                        <p>{randomMeal?.meals[0][measureKey]}</p>
                      </div>
                    );
                  }
                  return null; // Skip if the ingredient is not present
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions and Video */}
        <div className="flex flex-col  justify-between items-start w-full">
          <p className="p-2 flex-1 md:text-lg ">
            {randomMeal?.meals[0].strInstructions}
          </p>
          {randomMeal?.meals[0].strYoutube && (
            <ReactPlayer
              url={randomMeal?.meals[0].strYoutube}
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

export default RandomMeal;
