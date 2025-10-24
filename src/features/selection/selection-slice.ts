import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Meal } from "../../types/meal";

interface SelectionState {
  meals: Meal[];
}

const initialState: SelectionState = {
  meals: [],
};

const selectionSlice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    addMeal: (state, action: PayloadAction<Meal>) => {
      const mealExists = state.meals.find(
        (meal) => meal.idMeal === action.payload.idMeal
      );
      if (!mealExists) {
        state.meals.push(action.payload);
      }
    },
    removeMeal: (state, action: PayloadAction<string>) => {
      state.meals = state.meals.filter(
        (meal) => meal.idMeal !== action.payload
      );
    },
  },
});

export const { addMeal, removeMeal } = selectionSlice.actions;
export default selectionSlice.reducer;
