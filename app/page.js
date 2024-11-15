import Header from "./components/Header";
import MealCategories from "./components/MealCategories";
import MealsByArea from "./components/MealsByArea";
import RandomMeal from "./components/RandomMeal";

export default function Home() {
  return (
    <div className="">
      <Header />
      <RandomMeal />
      <MealCategories />
      <MealsByArea />
    </div>
  );
}
