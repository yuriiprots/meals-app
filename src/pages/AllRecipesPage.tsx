import { useState } from "react";
import SearchInput from "../components/SearchInput";

const AllRecipesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Тут ви можете виконувати запит до API з отриманим 'query'
    if (query) {
      console.log(`Searching for: ${query}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Recipes</h1>
      <SearchInput onSearch={handleSearch} />
      <div className="mt-4">
        {searchQuery ? (
          <p>
            Displaying results for: <strong>{searchQuery}</strong>
          </p>
        ) : (
          <p>Enter a search term to find meals.</p>
        )}
      </div>
    </div>
  );
};

export default AllRecipesPage;
