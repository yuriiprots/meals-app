export interface IngredientMeasurement {
  ingredient: string;
  measure: string;
}

export interface BaseMeal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null; 
  strYoutube: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}

type Ingredients = Record<`strIngredient${number}`, string | null>;
type Measures = Record<`strMeasure${number}`, string | null>;
export interface Meal extends BaseMeal, Ingredients, Measures {}

export interface MealsResponse {
  meals: Meal[] | null;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface CategoriesResponse {
  categories: Category[];
}
