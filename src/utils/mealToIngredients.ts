import type { Meal, IngredientMeasurement } from "../types/meal";

export const mealToIngredients = (meal: Meal): IngredientMeasurement[] => {
  return Array.from({ length: 20 }, (_, i) => i + 1).reduce<
    IngredientMeasurement[]
  >((acc, i) => {
    const ingredientKey = `strIngredient${i}` as keyof Meal;
    const measureKey = `strMeasure${i}` as keyof Meal;

    const ingredient = meal[ingredientKey] as string | null;
    const measure = meal[measureKey] as string | null;

    if (ingredient && ingredient.trim() !== "") {
      acc.push({
        ingredient,
        measure: measure || "",
      });
    }
    return acc;
  }, []);
};
