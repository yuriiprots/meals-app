import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface UsePaginationResult<T> {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  currentItems: T[];
}

function usePagination<T>(
  items: T[],
  itemsPerPage: number
): UsePaginationResult<T> {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");

  const setCurrentPage = (page: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", page.toString());
      return newParams;
    });
  };

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  let currentItems: T[] = [];
  if (items.length > 0) {
    const firstItemIndex = (currentPage - 1) * itemsPerPage;
    const lastItemIndex = firstItemIndex + itemsPerPage;
    currentItems = items.slice(firstItemIndex, lastItemIndex);
  }

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems,
  };
}

export default usePagination;
