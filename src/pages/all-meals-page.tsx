import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useSearchMealsQuery,
  useGetAllMealsQuery,
} from "../features/api/meal-api";
import { useMealsWithDetails } from "../hooks/use-meals-with-details";
import { selectSelectedMeals } from "../features/selection/selection-slice";
import SearchInput from "../components/search-input";
import MealCard from "../components/meal-card";
import Pagination from "../components/pagination";
import CategoryFilter from "../components/category-filter";
import Spinner from "../components/spinner";
import ErrorMessage from "../components/error-message";
import usePagination from "../hooks/use-pagination";

const AllMealsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") ?? "";
  const [searchQuery, setSearchQuery] = useState("");
  const selectedMeals = useSelector(selectSelectedMeals);

  const {
    data: searchResults,
    isLoading: isSearching,
    error: searchError,
  } = useSearchMealsQuery(searchQuery, {
    skip: !searchQuery,
  });

  const {
    data: allMealsData,
    isLoading: isLoadingAll,
    error: allMealsError,
  } = useGetAllMealsQuery();

  const meals =
    (searchQuery ? searchResults?.meals : allMealsData?.meals) ?? [];

  const isLoading = searchQuery ? isSearching : isLoadingAll;

  const error = searchQuery ? searchError : allMealsError;

  const filteredMeals = meals.filter((meal) =>
    selectedCategory ? meal.strCategory === selectedCategory : true
  );

  const { currentPage, setCurrentPage, totalPages, currentItems } =
    usePagination(filteredMeals, 4);

  const { meals: currentItemsWithDetails, isLoading: isLoadingDetails } =
    useMealsWithDetails(currentItems);

  const handleCategoryChange = (category: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      newParams.set("page", "1");

      if (category) {
        newParams.set("category", category);
      } else {
        newParams.delete("category");
      }

      return newParams;
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">All meals</h1>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-1/2">
          <SearchInput onSearch={handleSearch} />
        </div>
        <div className="w-1/4">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="w-1/4">
          <Link
            to="/selection"
            className="w-full text-center bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-300 block"
          >
            Go to selection
            {selectedMeals.length > 0 && ` (${selectedMeals.length})`}
          </Link>
        </div>
      </div>

      <div className="mt-4">
        {(isLoading || isLoadingDetails) && <Spinner />}
        {error && <ErrorMessage message="Error loading meals." />}
        {currentItemsWithDetails.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentItemsWithDetails.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        ) : (
          !isLoading &&
          !isLoadingDetails &&
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllMealsPage;
