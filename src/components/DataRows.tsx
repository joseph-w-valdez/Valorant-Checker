import React from 'react'

export const DataRow: React.FC<{ item: any; index: number; onClick: (item: any) => void; renderIcon: (item: any) => JSX.Element; dataType: string }> = ({ item, index, onClick, renderIcon, dataType }) => {
  return (
    <div
      className={`data-table-row cursor-pointer hover:bg-[#f5f5f5] group h-[4.5rem] flex justify-between items-center text-start ${
        index % 2 === 0 ? 'bg-[#bcbcbc]' : 'bg-[#727272]'
      }`}
      onClick={() => onClick(item)}
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
  );
};

export const DataRowIndividualWeapon: React.FC<{ item: any; index: number; onClick: (item: any) => void; dataType: string }> = ({ item, index, onClick, dataType }) => {
  return (
    <div
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
  );
};
