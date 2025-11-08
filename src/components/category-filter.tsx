import { useGetCategoriesQuery } from "../features/api/meal-api";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const {
    data: categoriesResponse,
    error,
    isLoading,
  } = useGetCategoriesQuery();

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories.</p>;

  return (
    <select
      id="category-select"
      className="w-full p-2 border border-gray-300 rounded-md"
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
    >
      <option value="">All Categories</option>
      {categoriesResponse?.categories.map((category) => (
        <option key={category.idCategory} value={category.strCategory}>
          {category.strCategory}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
