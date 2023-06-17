import React from 'react';
import { useNavigate } from 'react-router-dom';
import { weaponSkinExceptions } from '../data/weaponSkinExceptions';
import { meleeIcon } from '../data/meleeInfo';
import { onlyLettersAndNumbers } from '../utilities/stringConversions';

export type DataTableProps = {
  data: any[];
  dataType: string;
  weapon?: string;
  selectedOption: string;
};

const DataTable: React.FC<DataTableProps> = ({ data, dataType, weapon }) => {
  const navigate = useNavigate();

  const handleRowClick = (item: any) => {
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
      default:
        break;
    }

    navigate(linkPath);
  };

  const renderIcon = (item: any) => {
    const isMelee = item.displayName === 'Melee';
    const hasDisplayIcon = item.displayIcon && !weaponSkinExceptions.includes(item.displayName);

    let dynamicClasses = 'h-10';

    switch (dataType) {
      case 'buddies':
        dynamicClasses = 'h-full mr-[3.5rem] p-[2px]';
        break;
      case 'agents':
      case 'sprays':
        dynamicClasses = 'h-full mr-[3rem]';
        break;
      default:
        // Keep the default value 'h-10'
        break;
    }

    return (
      <div className={dynamicClasses}>
        {isMelee ? (
          <img
            className="select-none flex-end h-full object-contain sm:mr-8 lg:mr-32"
            src={meleeIcon}
            alt={`${item.displayName} portrait`}
          />
        ) : (
          <img
            className="select-none flex-end h-full object-contain sm:mr-8 lg:mr-32"
            src={hasDisplayIcon ? item.displayIcon : item.chromas[0]?.fullRender}
            alt={`${item.displayName} portrait`}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <div className="table w-full flex mt-8">
        <div className="table-header h-12 flex justify-between items-center bg-neutral-700">
          <p className="select-none flex-start ml-12 lg:ml-24">Name</p>
          <p className="select-none flex-end mr-12 sm:mr-24 lg:mr-48">
            {dataType === 'individual-weapon' ? 'Value' : 'Portrait'}
          </p>
        </div>
        {/* Data rows */}
        {/* If the data type is agents, weapons, or weapon-skins */}
        {(dataType === 'agents' || dataType === 'weapons' || dataType === 'weapon-skins' || dataType === 'buddies' || dataType === 'sprays') &&
          data
            ?.filter((item) => !item.displayName.includes('Standard') && !item.displayName.includes('Random'))
            .map((item, index) => (
               <div
                key={index}
                className={`data-table-row ${dataType !== 'buddies' ? 'cursor-pointer hover:bg-[#f5f5f5] group' : ''} h-[4.5rem] flex justify-between items-center text-start ${
                  index % 2 === 0 ? 'bg-[#bcbcbc]' : 'bg-[#727272]'
                }`}
                onClick={() => handleRowClick(item)}
              >
                <p
                  className={`select-none flex-start ml-12 lg:ml-24 ${
                    index % 2 === 0 ? 'text-black' : 'text-white'
                  } group-hover:text-blue-600 group-hover:font-bold`}
                >
                  {item.displayName}
                </p>
                {dataType === 'agents' || dataType === 'weapons' || dataType === 'weapon-skins' || dataType === 'buddies' || dataType === 'sprays' ? (
                  renderIcon(item)
                ) : null}
              </div>
            ))}
        {/* If the dataType is individual-weapon */}
        {dataType === 'individual-weapon' && data?.length && (
          <>
            {data.map((item, index) => (
              <div
                key={index}
                className={`data-table-row h-14 flex justify-between items-center text-start ${
                  index % 2 === 0 ? 'bg-[#bcbcbc]' : 'bg-[#727272]'
                }`}
              >
                {Object.entries(item).map(([key, value]) => (
                  <p
                    key={key}
                    className={`select-none flex-start ml-12 lg:ml-24 flex-end mr-12 sm:mr-24 lg:mr-48 ${
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
    </>
  );
};

export default DataTable;
