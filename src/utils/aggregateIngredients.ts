import type { Meal } from "../types/meal";
import { mealToIngredients } from "./mealToIngredients";

export interface AggregatedIngredient {
  ingredient: string;
  measures: string[];
}

export const aggregateIngredients = (meals: Meal[]): AggregatedIngredient[] => {
  const allIngredients = meals.flatMap((meal) => mealToIngredients(meal));

  const ingredientsMap = allIngredients.reduce((acc, item) => {
    const normalizedIngredient = item.ingredient.trim().toLowerCase();
    if (!normalizedIngredient) {
      return acc;
    }
    const existingEntry = acc.get(normalizedIngredient);

    if (existingEntry) {
      const normalizedMeasure = item.measure.trim();
      if (item.measure && normalizedMeasure) {
        existingEntry.measures.push(normalizedMeasure);
      }
    } else {
      acc.set(normalizedIngredient, {
        ingredient: item.ingredient.trim(),
        measures:
          item.measure && item.measure.trim() ? [item.measure.trim()] : [],
      });
    }

    return acc;
  }, new Map<string, AggregatedIngredient>());

  return Array.from(ingredientsMap.values());
};
