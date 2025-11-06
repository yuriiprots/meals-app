import ErrorMessage from "../components/error-message";
import Spinner from "../components/spinner";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLookupMealQuery } from "../features/api/meal-api";
import { mealToIngredients } from "../utils/meal-to-ingredients";

const MealPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: mealResponse,
    error,
    isLoading,
  } = useLookupMealQuery(id || "", {
    skip: !id,
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message="Error loading recipe." />;

  const meal = mealResponse?.meals?.[0];

  if (!meal) return <ErrorMessage message="Meal not found." />;

  const ingredients = mealToIngredients(meal);

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto">
          <div className="text-left mb-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to all meals
            </button>
          </div>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-96 object-cover rounded-lg shadow-lg mb-8 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {meal.strMeal}
          </h1>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold">
              Category: {meal.strCategory}
            </span>
            <span className="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold">
              Area: {meal.strArea}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
                Instructions
              </h2>
              <p className="text-gray-700 text-left text-base leading-relaxed whitespace-pre-wrap">
                {meal.strInstructions}
              </p>
            </div>

            <div className="mt-8 lg:mt-0">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Ingredients
                </h2>
                <ul className="space-y-2 text-gray-700">
                  {ingredients.map((item) => (
                    <li
                      key={item.ingredient}
                      className="flex justify-between border-b border-gray-200 py-1"
                    >
                      <span>{item.ingredient}</span>
                      <span className="font-medium text-gray-600">
                        {item.measure}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {meal.strYoutube && meal.strYoutube.trim() !== "" && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Video Recipe
                  </h2>
                  <div style={{ position: "relative", paddingTop: "56.25%" }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${
                        meal.strYoutube.split("v=")[1]
                      }`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Recipe Video"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </div>
              )}

              {meal.strSource && (
                <div className="mt-6 text-center">
                  <a
                    href={meal.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 transition-colors font-semibold"
                  >
                    View Original Source
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}
    </>
  );
};
export default MealPage;
