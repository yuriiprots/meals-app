import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import MealCard from "../components/meal-card";
import BackButton from "../components/back-button";
import { aggregateIngredients } from "../utils/aggregate-ingredients";
import type { AggregatedIngredient } from "../utils/aggregate-ingredients";

const SelectionPage = () => {
  const selectedMeals = useSelector(
    (state: RootState) => state.selection.meals
  );

  const aggregatedIngredients = aggregateIngredients(selectedMeals);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-4">
        <div className="text-left mb-4">
          <BackButton />
        </div>
        <h1 className="text-2xl font-bold mb-4">Your selected meals</h1>
        {selectedMeals.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {selectedMeals.map((meal) => (
                <div key={meal.idMeal} className="relative">
                  <MealCard meal={meal} />
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Total list of ingredients
              </h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-lg">
                <ul className="space-y-2">
                  {aggregatedIngredients.map((item: AggregatedIngredient) => (
                    <li
                      key={item.ingredient}
                      className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200"
                    >
                      <span className="font-semibold text-gray-700 capitalize">
                        {item.ingredient}
                      </span>
                      <span className="text-gray-600">
                        {item.measures.join(", ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Cooking Instructions
              </h2>
              <div className="space-y-8">
                {selectedMeals.map((meal, index) => (
                  <div key={meal.idMeal}>
                    <h3 className="text-left text-xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                      {index + 1}. {meal.strMeal}
                    </h3>
                    <p className="text-gray-700 text-left text-base leading-relaxed whitespace-pre-wrap">
                      {meal.strInstructions}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>You haven't selected any meals yet.</p>
        )}
      </div>
    </div>
  );
};

export default SelectionPage;
