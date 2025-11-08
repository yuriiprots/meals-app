import type { Meal } from "../types/meal";

const MEALS_STORAGE_KEY = "selectedMeals";

export const saveSelectedMeals = (meals: Meal[]) => {
  try {
    const serializedState = JSON.stringify(meals);
    localStorage.setItem(MEALS_STORAGE_KEY, serializedState);
  } catch (e) {
    console.warn("Could not save selected meals to local storage", e);
  }
};

export const loadSelectedMeals = (): Meal[] => {
  try {
    const serializedState = localStorage.getItem(MEALS_STORAGE_KEY);
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load selected meals from local storage", e);
    return [];
  }
};