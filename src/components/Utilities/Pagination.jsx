import React from "react";

const Pagination = ({ page, last, setPage }) => {
  const scrollTop = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };
  const handleNextPage = () => {
    if (page < last) {
      setPage((prevState) => prevState + 1);
      scrollTop();
    }
  };
  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevState) => prevState - 1);
      scrollTop();
    }
  };

  return (
    <div className="flex justify-center items-center py-5 px-3 mb-8">
      <div className="inline-flex -space-x-px text-base h-10">
        <button
          onClick={handlePrevPage}
          className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          disabled={page === 1}
        >
          «
        </button>
        <button className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          {page} of {last}
        </button>
        <button
          onClick={handleNextPage}
          className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          disabled={page === last}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
