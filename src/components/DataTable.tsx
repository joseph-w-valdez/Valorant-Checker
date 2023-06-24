import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { weaponSkinExceptions } from '../data/weaponSkinExceptions';
import { meleeIcon } from '../data/meleeInfo';
import { onlyLettersAndNumbers } from '../utilities/stringConversions';
import PageControls from './PageControls';
import FlexBasisFull from './FlexBasisFull';
import { debounce } from 'lodash'; // Import debounce from lodash

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
    // Generate link path based on the clicked row's data type and display name
    const getAgentLinkPath = (displayName: string) => {
      const agentName = displayName === 'KAY/O' ? 'Kayo' : displayName.replace('/', '');
      return `/agent/${agentName}`;
    };

    const getWeaponLinkPath = (displayName: string) => {
      return `/weapon/${displayName}`;
    };

    const getWeaponSkinLinkPath = (displayName: string) => {
      const skinName = onlyLettersAndNumbers(displayName);
      return `/weapon/${weapon}/skins/${skinName}`;
    };

    /* handle row click link navigations */
    let linkPath = '';

    switch (dataType) {
      case 'agents':
        linkPath = getAgentLinkPath(item.displayName);
        break;
      case 'weapons':
        linkPath = getWeaponLinkPath(item.displayName);
        break;
      case 'weapon-skins':
        linkPath = getWeaponSkinLinkPath(item.displayName);
        break;
      /* PLACEHOLDER LINKS */
      case 'sprays':
        linkPath = '/';
        break;
      case 'buddies':
        linkPath = '/';
        break;
      default:
        break;
    }

    navigate(linkPath);
  };

  const renderIcon = (item: any) => {
    const isMelee = item.displayName === 'Melee';
    const hasDisplayIcon = item.displayIcon && !weaponSkinExceptions.includes(item.displayName);

    let iconClasses = 'h-10';

    switch (dataType) {
      case 'buddies':
        iconClasses = 'h-full mr-[3.5rem] p-[2px]';
        break;
      case 'agents':
      case 'sprays':
        iconClasses = 'h-full mr-[3rem]';
        break;
      default:
        // Keep the default value 'h-10'
        break;
    }

    return (
      <div className={iconClasses}>
        {isMelee ? (
          <img
            className="flex-end h-full object-contain sm:mr-8 lg:mr-32"
            src={meleeIcon}
            alt={`${item.displayName} portrait`}
          />
        ) : (
          <img
            className="flex-end h-full object-contain sm:mr-8 lg:mr-32"
            src={hasDisplayIcon ? item.displayIcon : item.chromas[0]?.fullRender}
            alt={`${item.displayName} portrait`}
          />
        )}
      </div>
    );
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
        <>
          <p className='mt-1 mb-2'>Type below to filter results:</p>
          <FlexBasisFull />
          <input
            type="text"
            value={filterValue}
            onChange={handleFilterSubmit}
            placeholder="Filter by name"
            className="pl-2 border border-2 border-white bg-black rounded w-[250px]"
          />
          <FlexBasisFull />
          {filterValue && (
        <>
          {filteredData.length === 1 ? (
            <p className="mt-2 text-green-500">There is 1 match!</p>
          ) : filteredData.length > 1 ? (
            <p className="mt-2 text-green-500">There are {filteredData.length} matches!</p>
          ) : (
            <p className="mt-2 text-red-500">No matches found! Try searching for another term!</p>
          )}
        </>
      )}
        </>
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
              <div
                key={index}
                className={`data-table-row cursor-pointer hover:bg-[#f5f5f5] group h-[4.5rem] flex justify-between items-center text-start ${
                  index % 2 === 0 ? 'bg-[#bcbcbc]' : 'bg-[#727272]'
                }`}
                onClick={() => handleRowClick(item)}
              >
                <p
                  className={`flex-start ml-12 lg:ml-24 ${
                    index % 2 === 0 ? 'text-black' : 'text-white'
                  } group-hover:text-blue-600 group-hover:font-bold`}
                >
                  {item.displayName}
                </p>
                {renderIcon(item)}
              </div>
            ))}
        {/* If the dataType is individual-weapon */}
        {dataType === 'individual-weapon' &&
          slicedData?.length && (
            <>
              {slicedData.map((item, index) => (
                <div
                  key={index}
                  className={`data-table-row h-14 flex justify-between items-center text-start ${
                    index % 2 === 0 ? 'bg-[#bcbcbc]' : 'bg-[#727272]'
                  }`}
                >
                  {Object.entries(item).map(([key, value]) => (
                    <p
                      key={key}
                      className={`flex-start ml-12 lg:ml-24 flex-end mr-12 sm:mr-24 lg:mr-48 ${
                        index % 2 === 0 ? 'text-black' : 'text-white'
                      }`}
                    >
                      {`${value}`}
                    </p>
                  ))}
                </div>
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
