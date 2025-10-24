import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import RecipeCard from "../components/meal-card";
import { removeMeal } from "../features/selection/selection-slice";

const SelectionPage = () => {
  const selectedMeals = useSelector(
    (state: RootState) => state.selection.meals
  );
  const dispatch = useDispatch();

  const handleRemoveMeal = (mealId: string) => {
    dispatch(removeMeal(mealId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Selected Meals</h1>
      {selectedMeals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {selectedMeals.map((meal) => (
            <div key={meal.idMeal} className="relative">
              <RecipeCard meal={meal} />
              <button
                onClick={() => handleRemoveMeal(meal.idMeal)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                aria-label="Remove meal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven't selected any meals yet.</p>
      )}
    </div>
  );
};

export default SelectionPage;
