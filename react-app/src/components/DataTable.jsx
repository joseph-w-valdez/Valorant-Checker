import React from 'react';
import { useNavigate } from 'react-router-dom';
import { weaponSkinExceptions } from '../data/weaponSkinExceptions';
import { meleeIcon } from '../data/meleeInfo';

const DataTable = ({ data, dataType }) => {
  const navigate = useNavigate();

  const handleRowClick = (item) => {
    let linkPath = '';
    switch (dataType) {
      case 'agents':
        linkPath = '/individual-agent';
        break;
      case 'weapons':
        linkPath = '/individual-weapon';
        break;
      case 'weapon-skins':
        linkPath = '/individual-skin';
        break;
      default:
        // No specific link path defined for this dataType
        break;
    }
    navigate(linkPath, { state: { data: item } });
  };

  return (
    <>
      <div className='table w-full flex mt-8'>
        <div className="table-header h-12 flex justify-between items-center bg-neutral-700">
          <p className='select-none flex-start ml-12 lg:ml-24'>Name</p>
          <p className='select-none flex-end mr-12 sm:mr-24 lg:mr-48'>
            {dataType === 'individual-weapon' ? 'Value' : 'Portrait'}
          </p>
        </div>
        {/* Data rows */}
        {/* If the dataType is agents or weapons */}
        {(dataType === 'agents' || dataType === 'weapons' || dataType === 'weapon-skins') && data
        /* Filter out the Random and Standard skins */
          ?.filter((item) => !item.displayName.includes('Standard') && !item.displayName.includes('Random'))
          .map((item, index) => (
            <div
              key={index}
              className={`data-table-row h-14 cursor-pointer flex justify-between items-center text-start ${index % 2 === 0 ? 'bg-[#bcbcbc]' : 'bg-[#727272]'
                } hover:bg-[#f5f5f5] group`}
              onClick={() => handleRowClick(item)}
            >
              <p
                className={`select-none flex-start ml-12 lg:ml-24 ${index % 2 === 0 ? 'text-black' : 'text-white'
                  } group-hover:text-blue-600 group-hover:font-bold`}
              >
                {item.displayName}
              </p>
              {/* Render the icons based on the dataType */}
              {dataType === 'agents' ? (
                <div className="h-14">
                  <img
                    className='select-none flex-end h-full object-contain sm:mr-8 lg:mr-32'
                    src={item.killfeedPortrait}
                    alt={`${item.displayName} portrait`}
                  />
                </div>
              ) : (dataType === 'weapons' || dataType === 'weapon-skins') ? (
                <div className="h-10">
                  {/* The Melee item in weapons-skins needs a specific meleeIcon address */}
                  {item.displayName === 'Melee' ? (
                    <img
                      className='select-none flex-end h-full object-contain sm:mr-8 lg:mr-32'
                      src={meleeIcon}
                      alt={`${item.displayName} portrait`}
                    />
                  ) : (
                    (!item.displayIcon || weaponSkinExceptions.includes(item.displayName)) ? (
                      <img
                        className='select-none flex-end h-full object-contain sm:mr-8 lg:mr-32'
                        src={item.chromas[0]?.fullRender}
                        alt={`${item.displayName} portrait`}
                      />
                    ) : (
                      <img
                        className='select-none flex-end h-full object-contain sm:mr-8 lg:mr-32'
                        src={item.displayIcon}
                        alt={`${item.displayName} portrait`}
                      />
                    )
                  )}
                </div>
              ) : null}
            </div>
          ))}
        {/* If the dataType is individual-weapon */}
        {dataType === 'individual-weapon' && data?.length > 0 && (
          <>
            {data
              .map((item, index) => (
                <div
                  key={index}
                  className={`data-table-row h-14 flex justify-between items-center text-start ${index % 2 === 0 ? 'bg-[#bcbcbc]' : 'bg-[#727272]'} `}
                >
                  {/* Render the content based on the properties of each item */}
                  {Object.entries(item).map(([key, value]) => (
                    <p
                      key={key}
                      className={`select-none flex-start ml-12 lg:ml-24 flex-end mr-12 sm:mr-24 lg:mr-48 ${index % 2 === 0 ? 'text-black' : 'text-white'}`}
                    >
                      {`${value}`}
                    </p>
                  ))}
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default DataTable;
