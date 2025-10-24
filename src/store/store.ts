import { configureStore } from "@reduxjs/toolkit";
import { mealApi } from "../features/api/meal-api";
import selectionReducer from "../features/selection/selection-slice";

export const store = configureStore({
  reducer: {
    [mealApi.reducerPath]: mealApi.reducer,
    selection: selectionReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mealApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
