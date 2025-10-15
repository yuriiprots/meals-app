import type { Meal, IngredientMeasurement } from '../types/meal';

export const mealToIngredients = (meal: Meal): IngredientMeasurement[] => {
  
  const ingredients: IngredientMeasurement[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof Meal;
    const measureKey = `strMeasure${i}` as keyof Meal;

    const ingredient = meal[ingredientKey] as string | null;
    const measure = meal[measureKey] as string | null;

    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        ingredient,
        measure: measure || '',
      });
    }
  }

  return ingredients;
};
