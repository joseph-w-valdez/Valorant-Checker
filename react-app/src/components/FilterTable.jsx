import React, { useState } from 'react';
import { agentRoles } from '../data/agent-roles';

const FilterTable = () => {
  const [selectedOption, setSelectedOption] = useState('no-filter');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <form className='filter-table w-80 flex flex-wrap'>
      <div className='w-1/2'>
        <h4 className='font-bold'>Filter by Role</h4>
      </div>
      {agentRoles.map((option) => (
        <div key={option} className="checkbox-item flex items-center w-1/2">
          <input
            id={option}
            className='h-5 w-5 border border-white border-2 rounded-sm mr-2 bg-transparent appearance-none checked:bg-white'
            type="checkbox"
            name="role"
            value={option}
            checked={selectedOption === option}
            onChange={handleOptionChange}
          />
          <label htmlFor={option} className='w-1/2 text-xl'>{option}</label>
        </div>
      ))}
    </form>
  );
};

export default FilterTable;
