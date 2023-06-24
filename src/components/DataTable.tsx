import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageControls from './PageControls';
import FlexBasisFull from './FlexBasisFull';
import { debounce } from 'lodash';
import { DataRow, DataRowIndividualWeapon } from './DataRows';
import FilterSearchBar from './FilterSearchBar';
import constructPath from '../utilities/constructLinkPath';
import RenderIcon from './RenderIcon';

export type DataTableProps = {
  data: any[];
  dataType: string;
  weapon?: string;
  selectedOption: string;
};

const DataTable: React.FC<DataTableProps> = ({ data, dataType, weapon }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get('page');
  const searchParam = queryParams.get('search') || '';
  const pageSize = 25; // Amount of results per page

  const [currentPage, setCurrentPage] = useState(1);
  const [desiredPage, setDesiredPage] = useState(1)
  const [filterValue, setFilterValue] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>(data);

  // To handle the ?page= value in the URL
  useEffect(() => {
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const parsedPage = pageParam ? parseInt(pageParam, 10) : 1;
  if (parsedPage !== currentPage) {
    setDesiredPage(parsedPage)
  }
  if (totalPages > 1) {
    if (desiredPage < 1) {
      handlePageChange(1);
      navigate(`${location.pathname}?page=1${searchParam ? `&search=${searchParam}` : ''}`);
    } else if (desiredPage > totalPages) {
      handlePageChange(totalPages);
    } else {
      setCurrentPage(desiredPage);
      navigate(`${location.pathname}?page=${desiredPage}${searchParam ? `&search=${searchParam}` : ''}`);
    }
  } else if (dataType !== 'individual-weapon') {
    navigate(`${location.pathname}?page=1${searchParam ? `&search=${searchParam}` : ''}`);
    setCurrentPage(1);
  }
}, [location.pathname, pageParam, navigate, filteredData, pageSize, filterValue]);

  useEffect(() => {
    // Filter the data based on the filter value, except on the individual-weapon page
    if (dataType !== 'individual-weapon') {
      const filtered = data.filter((item) =>
      item.displayName.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset the current page  to 1 when the filter changes
     }}, [data, filterValue, navigate, location.pathname]);

  const handleRowClick = (item: any) => {
    const linkPath = constructPath(item, dataType, weapon);
    navigate(linkPath);
  };

const renderIcon = (item: any) => {
  return <RenderIcon item={item} dataType={dataType} />;
};

  // Debounce the handleFilterSubmit function using lodash's debounce
  const debouncedHandleFilterSubmit = debounce((newFilterValue: string) => {
    setFilterValue(newFilterValue);
  }, 25);

  useEffect(()=> {
    if (searchParam) {
      setFilterValue(searchParam)
    }
  }, [])

  const handleFilterSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterValue = event.target.value;
    debouncedHandleFilterSubmit(newFilterValue);
    navigate(`${location.pathname}?page=1${newFilterValue ? `&search=${newFilterValue}` : ''}`); // Append newFilterValue to URL only if it is truthy
    setCurrentPage(1);
    setDesiredPage(1)
  };

  const handlePageChange = (pageNumber: number) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
      setDesiredPage(pageNumber)
      navigate(`?page=${pageNumber}`);
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 40);
    }
  };

  // Calculate the start and end index for slicing the filtered data array
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the filtered data array to retrieve the current page's results
  const slicedData = filteredData.slice(startIndex, endIndex);

  return (
    <>
      {dataType !== 'individual-weapon' && (
        <FilterSearchBar filterValue={filterValue} onFilterSubmit={handleFilterSubmit} results={filteredData.length} />
      )}
      <FlexBasisFull />
      <div className="table max-w-none sm:max-w-[70%] w-full flex mt-8 border border-2 rounded">
        <div className="table-header h-12 flex justify-between items-center bg-neutral-700">
          <p className="flex-start ml-12 lg:ml-24">Name</p>
          <p className="flex-end mr-12 sm:mr-24 lg:mr-48">
            {dataType === 'individual-weapon' ? 'Value' : 'Portrait'}
          </p>
        </div>
        {/* Data rows */}
        {/* If the dataType isn't individual-weapon */}
        {dataType !== 'individual-weapon' &&
          slicedData
            ?.filter((item) => !item.displayName.includes('Standard') && !item.displayName.includes('Random'))
            .map((item, index) => (
              <DataRow key={index} item={item} index={index} onClick={handleRowClick} renderIcon={()=>renderIcon(item)} dataType={dataType} />
            ))}
        {/* If the dataType is individual-weapon */}
        {dataType === 'individual-weapon' &&
          slicedData?.length && (
            <>
              {slicedData.map((item, index) => (
                <DataRowIndividualWeapon key={index} item={item} index={index} onClick={handleRowClick} dataType={dataType} />
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
