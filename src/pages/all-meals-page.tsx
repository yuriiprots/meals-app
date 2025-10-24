import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchMealsQuery } from "../features/api/meal-api";
import SearchInput from "../components/search-input";
import RecipeCard from "../components/meal-card";
import CategoryFilter from "../components/category-filter";

const AllRecipesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    data: mealsResponse,
    error,
    isLoading,
  } = useSearchMealsQuery(searchQuery || "a");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredMeals = mealsResponse?.meals?.filter((meal) =>
    selectedCategory ? meal.strCategory === selectedCategory : true
  );

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">All Recipes</h1>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-1/2">
          <SearchInput onSearch={handleSearch} />
        </div>
        <div className="w-1/4">
          <CategoryFilter onCategoryChange={handleCategoryChange} />
        </div>
        <div className="w-1/4">
          <Link
            to="/selection"
            className="w-full text-center bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-300 block"
          >
            Go to selection
          </Link>
        </div>
      </div>
      <div className="mt-4">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading meals.</p>}
        {filteredMeals && filteredMeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMeals.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        ) : (
          !isLoading &&
          !error && (
            <p>
              {searchQuery
                ? `No meals found for "${searchQuery}"`
                : selectedCategory
                ? `No meals found in category "${selectedCategory}"`
                : `No recipes found.`}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default AllRecipesPage;
