import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Meal } from "../../types/meal";
import type { RootState } from "../../store/store";
import {
  loadSelectedMeals,
  saveSelectedMeals,
} from "../../store/local-storage";

interface SelectionState {
  meals: Meal[];
}

const initialState: SelectionState = {
  meals: loadSelectedMeals(),
};

const selectionSlice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    toggleMeal: (state, action: PayloadAction<Meal>) => {
      const mealIndex = state.meals.findIndex(
        (meal) => meal.idMeal === action.payload.idMeal
      );
      if (mealIndex >= 0) {
        state.meals.splice(mealIndex, 1);
      } else {
        state.meals.push(action.payload);
      }
      saveSelectedMeals(state.meals);
    },
  },
});

export const { toggleMeal } = selectionSlice.actions;

export const selectSelectedMeals = (state: RootState) => state.selection.meals;
export const selectIsMealSelected = (mealId: string) => (state: RootState) =>
  state.selection.meals.some((meal) => meal.idMeal === mealId);

export default selectionSlice.reducer;
