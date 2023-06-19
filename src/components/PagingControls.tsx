import React from 'react';

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
    <div className="w-full flex justify-center px-4 py-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-1"
      >
        Previous
      </button>
      <button onClick={() => handlePageChange(1)} className="mx-1">
        1
      </button>
      {currentPage > 3 && <span className="mx-1">...</span>}
      {currentPage > 2 && (
        <button onClick={() => handlePageChange(currentPage - 1)} className="mx-1">
          {currentPage - 1}
        </button>
      )}
      <button onClick={() => handlePageChange(currentPage)} className="mx-1 font-bold">
        {currentPage}
      </button>
      {currentPage < totalPages - 1 && (
        <button onClick={() => handlePageChange(currentPage + 1)} className="mx-1">
          {currentPage + 1}
        </button>
      )}
      {currentPage < totalPages - 2 && <span className="mx-1">...</span>}
      {currentPage !== totalPages && (
        <button onClick={() => handlePageChange(totalPages)} className="mx-1">
          {totalPages}
        </button>
      )}
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
