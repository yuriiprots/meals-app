import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CategoriesResponse, MealsResponse, Meal } from "../../types/meal";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://www.themealdb.com/api/json/v1/1/",
});

export const mealApi = createApi({
  reducerPath: "mealApi",
  baseQuery,
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

    lookupMealsBatch: builder.query<MealsResponse, string[]>({
      queryFn: async (mealIds, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const detailPromises = mealIds.map(async (id) => {
            const result = await fetchWithBQ(`lookup.php?i=${id}`);
            if (!result.error && result.data) {
              const data = result.data as MealsResponse;
              return data?.meals?.[0] || null;
            }
            return null;
          });

          const results = await Promise.all(detailPromises);
          const meals = results.filter((meal): meal is Meal => meal !== null);

          return { data: { meals } };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: String(error),
            },
          };
        }
      },
    }),

    getAllMeals: builder.query<MealsResponse, void>({
      queryFn: async (_arg, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const categoriesResult = await fetchWithBQ("list.php?c=list");

          if (categoriesResult.error) {
            return { error: categoriesResult.error };
          }

          const categories =
            (categoriesResult.data as MealsResponse)?.meals || [];

          const categoryPromises = categories.map(async (category) => {
            const result = await fetchWithBQ(
              `filter.php?c=${category.strCategory}`
            );
            return {
              result,
              categoryName: category.strCategory,
            };
          });

          const results = await Promise.all(categoryPromises);

          const allMeals: Meal[] = [];
          const seenIds = new Set<string>();

          results.forEach(({ result, categoryName }) => {
            if (!result.error && result.data) {
              const mealsData = result.data as MealsResponse;
              if (mealsData?.meals) {
                mealsData.meals.forEach((meal) => {
                  if (!seenIds.has(meal.idMeal)) {
                    seenIds.add(meal.idMeal);
                    allMeals.push({
                      ...meal,
                      strCategory: categoryName,
                    });
                  }
                });
              }
            }
          });

          for (let i = allMeals.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allMeals[i], allMeals[j]] = [allMeals[j], allMeals[i]];
          }

          return { data: { meals: allMeals } };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: String(error),
            },
          };
        }
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useListCategoriesQuery,
  useSearchMealsQuery,
  useLookupMealQuery,
  useLookupMealsBatchQuery,
  useGetAllMealsQuery,
} = mealApi;
