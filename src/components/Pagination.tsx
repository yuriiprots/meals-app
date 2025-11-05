import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const getPaginationItems = (): (number | string)[] => {
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pageToShow = new Set<number>();

    for (let i = 1; i <= Math.min(totalPages, 7); i++) {
      pageToShow.add(i);
    }
    pageToShow.add(currentPage);
    pageToShow.add(totalPages);

    const sortedPages = Array.from(pageToShow).sort((a, b) => a - b);

    const finalPageList: (number | string)[] = [];
    let lastPage = 0;

    for (const page of sortedPages) {
      if (lastPage !== 0 && page > lastPage + 1) {
        finalPageList.push("...");
      }
      finalPageList.push(page);
      lastPage = page;
    }

    return finalPageList;
  };

  const pageItems = getPaginationItems();

  return (
    <nav className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      {pageItems.map((item, index) =>
        typeof item === "string" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-3 py-1 text-sm font-medium text-gray-700"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium
          ${
            item === currentPage
              ? "bg-purple-500 text-white border-purple-500"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }
        `}
          >
            {item}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
