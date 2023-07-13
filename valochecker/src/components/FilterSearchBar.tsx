import React from 'react';
import FlexBasisFull from './FlexBasisFull';

const searchBar: React.FC<{
  searchValue: string;
  onSearchSubmit: (event: React.ChangeEvent<HTMLInputElement>) => void;
  results: number;
}> = ({ searchValue, onSearchSubmit, results }) => {
  const inputId = 'search-input'; // Unique id for the input element

  return (
    <>
      <p className="mt-1 mb-2">Type below to filter results:</p>
      <FlexBasisFull />
      <input
        id={inputId}
        type="text"
        value={searchValue}
        onChange={onSearchSubmit}
        placeholder="Filter by name"
        className="pl-2 border border-2 border-white bg-black rounded w-[250px]"
      />
      <FlexBasisFull />
      {searchValue && (
        <>
          {results === 1 ? (
            <p className="mt-2 text-green-500">There is 1 match!</p>
          ) : results > 1 ? (
            <p className="mt-2 text-green-500">There are {results} matches!</p>
          ) : (
            <p className="mt-2 text-red-500">No matches found! Try searching for another term!</p>
          )}
        </>
      )}
    </>
  );
};

export default searchBar;
