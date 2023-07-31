'use client'
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DataRow, DataRowIndividualWeapon } from './DataRows';
import FilterSearchBar from './FilterSearchBar';
import constructPath from '../utilities/constructLinkPath';
import RenderIcon from './RenderIcon';
import PageControls from './PageControls';
import FlexBasisFull from './FlexBasisFull';
import { useDataFilter } from '../hooks/useDataFilter';
import { useSearchValue } from '../hooks/useSearchValue';
import { usePageNavigation } from '../hooks/usePageNavigation';

export type DataTableProps = {
  data: any[];
  dataType: string;
  weapon?: string;
  selectedOption: string;
};

const DataTable: React.FC<DataTableProps> = ({ data, dataType, weapon }) => {
  const router = useRouter();
  const searchParams  = useSearchParams();
  const queryParam = searchParams.get('query') || null
  const pageSize = 25; // Amount of results per page

  const { searchValue, handleSearchSubmit } = useSearchValue(queryParam);
  const filteredData = useDataFilter(data, searchValue, dataType);

  const { currentPage, setCurrentPage, setDesiredPage } = usePageNavigation(
    filteredData.length,
    pageSize,
    searchValue
  );

  const handleRowClick = (item: any) => {
    const linkPath = constructPath(item, dataType, weapon);
    console.log('linkpath', linkPath)
    router.push(linkPath);
  };

  const renderIcon = (item: any) => {
    return <RenderIcon item={item} dataType={dataType} />;
  };

  const handlePageChange = (pageNumber: number) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
      setDesiredPage(pageNumber);
      const searchQuery = searchValue ? `&search=${searchValue}` : '';
      router.push(`?page=${pageNumber}${searchQuery}`); // Use router.push instead of navigate
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 40);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const slicedData = filteredData.slice(startIndex, endIndex);

  return (
    <>
      {/* Render the search bar, except on the individual-weapon page */}
      {dataType !== 'individual-weapon' && (
        <FilterSearchBar
          searchValue={searchValue}
          onSearchSubmit={handleSearchSubmit}
          results={filteredData.length}
        />
      )}
      <FlexBasisFull />
      <div className="table max-w-none sm:max-w-[70%] w-full flex mt-8 border border-2 rounded">
        <div className="table-header h-12 flex justify-between items-center bg-neutral-700">
          <p className="flex-start ml-12 lg:ml-24">Name</p>
          <p className="flex-end mr-12 sm:mr-24 lg:mr-48">{dataType === 'individual-weapon' ? 'Value' : 'Portrait'}</p>
        </div>
        {/* Data row rendering for everything but the individual-weapon page */}
       {dataType !== 'individual-weapon' &&
         slicedData
           ?.filter((item) => !item.displayName.includes('Standard') && !item.displayName.includes('Random'))
           .map((item, index) => (
             <DataRow
               key={`${item.id}-${index}`}
               item={item}
               index={index}
               onClick={handleRowClick}
               renderIcon={() => renderIcon(item)}
               dataType={dataType}
             />
         ))}
        {dataType === 'individual-weapon' &&
        slicedData?.length && (
         <>
          {slicedData.map((item, index) => (
            <DataRowIndividualWeapon
            key={`${item.id}-${index}`}
            item={item}
            index={index}
            onClick={handleRowClick}
            dataType={dataType}
            />
          ))}
          </>
          )}
      </div>
      <PageControls
        results={filteredData.length}
        pageSize={pageSize}
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / pageSize)}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default DataTable;
