import React from 'react';
import { agentRoles } from '../data/agent-roles';

const CheckboxItem = ({ id, option: { category, icon }, selectedOption, handleOptionChange }) => {
  const isSelected = selectedOption === category;

  const checkboxStyle = {
    backgroundImage: isSelected ? `url(../assets/images/checked-box.webp)` : 'none',
    backgroundSize: isSelected ? 'cover' : 'auto',
  };

  return (
    <label
      htmlFor={id}
      className='checkbox-item flex items-center w-1/2 hover:bg-white hover:bg-opacity-25 cursor-pointer '
    >
      <input
        id={id}
        className='h-5 w-5 border border-white border-2 rounded-sm mr-2 bg-transparent appearance-none cursor-pointer'
        type='checkbox'
        name='category'
        value={category}
        checked={isSelected}
        onChange={handleOptionChange}
        style={checkboxStyle}
      />
      <div className='w-1/2 text-base sm:text-xl flex items-center cursor-pointer'>
        {icon && <img src={icon} alt={`${category} icon`} className='w-5 h-5 mr-2 cursor-pointer' />}
        <p>{category}</p>
      </div>
    </label>
  );
};

const FilterTable = ({ selectedOption, handleOptionChange }) => {
  return (
    <form className='filter-table w-80 flex flex-wrap'>
      <div className='w-1/2'>
        <h4 className='font-bold text-sm sm:text-base'>Filter by Role</h4>
      </div>
      {agentRoles.map((option, index) => (
        <CheckboxItem
          key={option.category}
          id={`option-${index}`}
          option={option}
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
        />
      ))}
    </form>
  );
};

export default FilterTable;
