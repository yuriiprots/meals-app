import { useState, useMemo, useEffect } from 'react';

interface UsePaginationResult<T> {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  currentItems: T[];
}

function usePagination<T>(items: T[], itemsPerPage: number): UsePaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(items.length / itemsPerPage));
  }, [items.length, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const currentItems = useMemo(() => {
    if (items.length === 0) {
      return [];
    }
    const firstItemIndex = (currentPage - 1) * itemsPerPage;
    const lastItemIndex = firstItemIndex + itemsPerPage;
    return items.slice(firstItemIndex, lastItemIndex);
  }, [items, currentPage, itemsPerPage]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems,
  };
}

export default usePagination;
