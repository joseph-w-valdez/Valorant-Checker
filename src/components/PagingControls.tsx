import React from 'react';

type PageControlProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
};

const PageControls: React.FC<PageControlProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (pageNumber: number) => {
    // Check if the page number is within the valid range
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      // Call the onPageChange callback function provided by the parent component
      onPageChange(pageNumber);
    }
  };

  return (
    <div className="w-full flex justify-center px-4 py-2">
      {/* Previous button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-1"
      >
        Previous
      </button>

      {/* Rendering the page 1 button */}
      {currentPage > 2 && (
        <>
          <button onClick={() => handlePageChange(1)} className="mx-1">
            1
          </button>
          {currentPage > 3 && <span className="mx-1">...</span>}
        </>
      )}

      {/* Rendering the previous page button */}
      {currentPage > 1 && (
        <button onClick={() => handlePageChange(currentPage - 1)} className="mx-1">
          {currentPage - 1}
        </button>
      )}

      {/* Rendering the current page button */}
      <button onClick={() => handlePageChange(currentPage)} className="mx-1 font-bold" disabled>
        {currentPage}
      </button>

      {/* Rendering the next page button */}
      {currentPage < totalPages && (
        <button onClick={() => handlePageChange(currentPage + 1)} className="mx-1">
          {currentPage + 1}
        </button>
      )}

      {/* Rendering the last page button */}
      {currentPage < totalPages - 1 && (
        <>
          {currentPage < totalPages - 2 && <span className="mx-1">...</span>}
          <button onClick={() => handlePageChange(totalPages)} className="mx-1">
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-1"
      >
        Next
      </button>
    </div>
  );
};

export default PageControls;
