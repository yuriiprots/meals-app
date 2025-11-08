import { useEffect, useState } from "react";
import { useLookupMealsBatchQuery } from "../features/api/meal-api";
import type { Meal } from "../types/meal";

export function useMealsWithDetails(basicMeals: Meal[]) {
  const [enrichedMeals, setEnrichedMeals] = useState<Meal[]>(basicMeals);

  const mealIds = basicMeals.map((meal) => meal.idMeal);

  const { data: detailsData, isLoading } = useLookupMealsBatchQuery(mealIds, {
    skip: mealIds.length === 0,
  });

  useEffect(() => {
    if (detailsData?.meals) {
      const detailsMap = new Map<string, Meal>();
      detailsData.meals.forEach((meal) => {
        detailsMap.set(meal.idMeal, meal);
      });

      const merged = basicMeals.map((basicMeal) => {
        const fullDetails = detailsMap.get(basicMeal.idMeal);
        return fullDetails || basicMeal;
      });

      setEnrichedMeals(merged);
    } else if (!isLoading) {
      setEnrichedMeals(basicMeals);
    }
  }, [detailsData, isLoading]);

  return {
    meals: enrichedMeals,
    isLoading,
  };
}
