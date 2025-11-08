import type { Meal } from "../types/meal";
import { mealToIngredients } from "./meal-to-ingredients";

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
    const normalizedMeasure = item.measure.trim();

    if (existingEntry) {
      if (normalizedMeasure) {
        existingEntry.measures.push(normalizedMeasure);
      }
    } else {
      const newMeasures = normalizedMeasure
        ? [normalizedMeasure]
        : ["to taste"];
      acc.set(normalizedIngredient, {
        ingredient: item.ingredient.trim(),
        measures: newMeasures,
      });
    }

    return acc;
  }, new Map<string, AggregatedIngredient>());

  return Array.from(ingredientsMap.values());
};
