import { useParams } from "react-router-dom";
import { useLookupMealQuery } from "../features/api/mealApi";
import { mealToIngredients } from "../utils/mealToIngredients";

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: mealResponse, error, isLoading } = useLookupMealQuery(id || "", {
    skip: !id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading recipe.</p>;

  const meal = mealResponse?.meals?.[0];

  if (!meal) return <p>Recipe not found.</p>;

  const ingredients = mealToIngredients(meal);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-auto object-cover rounded-md mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>{`${item.measure} ${item.ingredient}`}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
          <p className="whitespace-pre-wrap">{meal.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
