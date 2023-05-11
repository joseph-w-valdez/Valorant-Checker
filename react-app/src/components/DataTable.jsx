import React from 'react';

const DataTable = ({ data }) => {
  console.log('data in data table', data);

  return (
    <>
      <div className='table w-full flex mt-2'>
        <div className="table-header h-12 flex justify-between items-center bg-neutral-700">
          <p className='flex-start ml-24'>Name</p>
          <p className='flex-end mr-24'>Portrait</p>
        </div>
        {data?.map((item, index) => (
          <div
            key={index}
            className={`table-row h-12 flex justify-between items-center ${
              index % 2 === 0 ? 'bg-[#bcbcbc]' : 'bg-[#727272]'
            } hover:bg-[#f5f5f5] group`}
          >
            <p className={`flex-start ml-24 ${
              index % 2 === 0 ? 'text-black' : 'text-white'
            } group-hover:text-blue-600 group-hover:font-bold`}>
              {item.displayName}
            </p>
            <img className='flex-end mr-24' src={item.killfeedPortrait} alt={`${item.displayName} portrait`} />
          </div>
        ))}
      </div>
    </>
  );
};

export default DataTable;
