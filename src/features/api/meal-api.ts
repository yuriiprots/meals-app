import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CategoriesResponse, MealsResponse } from "../../types/meal";

export const mealApi = createApi({
  reducerPath: "mealApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.themealdb.com/api/json/v1/1/",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => "categories.php",
    }),

    listCategories: builder.query<MealsResponse, void>({
      query: () => "list.php?c=list",
    }),

    searchMeals: builder.query<MealsResponse, string>({
      query: (searchQuery: string) => `search.php?s=${searchQuery}`,
    }),

    lookupMeal: builder.query<MealsResponse, string>({
      query: (id: string) => `lookup.php?i=${id}`,
    }),
  }), 
});

export const {
  useGetCategoriesQuery,
  useListCategoriesQuery,
  useSearchMealsQuery,
  useLookupMealQuery,
} = mealApi;
