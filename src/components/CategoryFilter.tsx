import { useGetCategoriesQuery } from "../features/api/mealApi";

const CategoryFilter = () => {
  const { data: categoriesResponse, error, isLoading } = useGetCategoriesQuery();

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories.</p>;

  return (
    <div className="my-4">
      <label htmlFor="category-select" className="block text-sm font-medium text-gray-700">
        Filter by Category
      </label>
      <select
        id="category-select"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option>All Categories</option>
        {categoriesResponse?.categories.map((category) => (
          <option key={category.idCategory} value={category.strCategory}>
            {category.strCategory}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
