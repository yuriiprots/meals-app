import { useState } from "react";
import { useSearchMealsQuery } from "../features/api/mealApi";
import SearchInput from "../components/SearchInput";
import RecipeCard from "../components/RecipeCard";

const AllRecipesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: mealsResponse,
    error,
    isLoading,
  } = useSearchMealsQuery(searchQuery, {
    skip: !searchQuery,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Recipes</h1>
      <SearchInput onSearch={handleSearch} />
      <div className="mt-4">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading meals.</p>}
        {mealsResponse && mealsResponse.meals ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mealsResponse.meals.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        ) : (
          searchQuery &&
          !isLoading && <p>No meals found for "{searchQuery}".</p>
        )}
        {!searchQuery && <p>Enter a search term to find meals.</p>}
      </div>
    </div>
  );
};

export default AllRecipesPage;
