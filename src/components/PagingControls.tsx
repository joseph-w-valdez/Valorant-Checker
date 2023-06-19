import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

type PageControlProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
};

const PageControls: React.FC<PageControlProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
    <div className="w-full flex justify-center mx-2 py-2">
      <div className="border border-2 rounded flex items-center">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 flex items-center ${
            currentPage === 1 ? '' : 'hover:bg-gray-700 transition duration-100'
          }`}
        >
          <FiChevronLeft />
          Previous
        </button>
        {/* Line separator */}
        <div className="border-r h-4 mx-1"></div>

        {/* Rendering the page 1 button */}
        {currentPage > 2 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className={`px-2 py-2 ${currentPage === 1 ? 'font-bold' : 'hover:bg-gray-700 transition duration-100'}`}
            >
              1
            </button>
            {currentPage > 3 && <span className="px-2 py-2">...</span>}
          </>
        )}

        {/* Rendering the previous page button */}
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-2 py-2 ${currentPage === 1 ? 'font-bold' : 'hover:bg-gray-700 transition duration-100'}`}
          >
            {currentPage - 1}
          </button>
        )}

        {/* Rendering the current page button */}
        <button onClick={() => handlePageChange(currentPage)} className="px-2 py-2 font-bold" disabled>
          {currentPage}
        </button>

        {/* Rendering the next page button */}
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-2 py-2 ${currentPage === totalPages ? 'font-bold' : 'hover:bg-gray-700 transition duration-100'}`}
          >
            {currentPage + 1}
          </button>
        )}

        {/* Rendering the last page button */}
        {currentPage < totalPages - 1 && (
          <>
            {currentPage < totalPages - 2 && <span className="px-2 py-2">...</span>}
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`px-2 py-2 ${currentPage === totalPages ? 'font-bold' : 'hover:bg-gray-700 transition duration-100'}`}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Line separator */}
        <div className="border-r h-4 mx-1"></div>

        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 flex items-center ${
            currentPage === totalPages ? '' : 'hover:bg-gray-700 transition duration-100'
          }`}
        >
          Next
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default PageControls;
