import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import FlexBasisFull from './FlexBasisFull';

type PageControlProps = {
  results: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
};

const PageControls: React.FC<PageControlProps> = ({ results, pageSize, currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
    <div className="w-full flex flex-wrap justify-center py-3">
      <div className="border border-2 rounded flex items-center">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 py-2 flex items-center ${
            currentPage === 1 ? '' : 'hover:bg-gray-700 transition duration-100'
          }`}
          aria-label="Previous Page"
        >
          <FiChevronLeft />
          <span className="hidden 375:inline">Previous</span>
        </button>
        {/* Line separator */}
        <div className="border-r h-4 mx-1"></div>

        {/* Rendering the page 1 button */}
        {currentPage > 2 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className={`px-2 py-2 ${currentPage === 1 ? 'font-bold' : 'hover:bg-gray-700 transition duration-100'}`}
              aria-label="Go to Page 1"
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
            aria-label={`Go to Page ${currentPage - 1}`}
          >
            {currentPage - 1}
          </button>
        )}

        {/* Rendering the current page button */}
        <button onClick={() => handlePageChange(currentPage)} className="px-2 py-2 font-bold" disabled aria-label={`Current Page, Page ${currentPage}`}>
          {currentPage}
        </button>

        {/* Rendering the next page button */}
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-2 py-2 ${currentPage === totalPages ? 'font-bold' : 'hover:bg-gray-700 transition duration-100'}`}
            aria-label={`Go to Page ${currentPage + 1}`}
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
              aria-label={`Go to Page ${totalPages}`}
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
          className={`px-2 py-2 flex items-center ${
            currentPage === totalPages ? '' : 'hover:bg-gray-700 transition duration-100'
          }`}
          aria-label="Next Page"
        >
          <span className="hidden 375:inline">Next</span>
          <FiChevronRight />
        </button>
      </div>
      {/* Only show this message if there are more than 25 items */}
      {results > 25 && (
        <>
          <FlexBasisFull />
          <p className="text-sm opacity-75">{`(There are up to ${pageSize} results per page)`}</p>
        </>
      )}
    </div>
  );
};

export default PageControls;
