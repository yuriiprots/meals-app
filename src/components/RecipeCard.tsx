import { Link } from "react-router-dom";
import type { Meal } from "../types/meal";

interface RecipeCardProps {
  meal: Meal;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ meal }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <Link to={`/recipe/${meal.idMeal}`}>
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="font-bold text-lg">{meal.strMeal}</h3>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
