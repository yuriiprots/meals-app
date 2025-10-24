import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { Meal } from "../types/meal";
import { addMeal } from "../features/selection/selection-slice";

interface RecipeCardProps {
  meal: Meal;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ meal }) => {
  const dispatch = useDispatch();

  const handleAddToSelection = () => {
    dispatch(addMeal(meal));
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col h-full">
      <div className="relative">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{meal.strMeal}</h3>
        <div className="text-sm text-gray-600 mb-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {meal.strCategory}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {meal.strArea}
          </span>
        </div>
        <div className="mt-auto flex gap-2">
          <Link
            to={`/recipe/${meal.idMeal}`}
            className="flex-1 text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
          >
            Detail
          </Link>
          <button
            onClick={handleAddToSelection}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
