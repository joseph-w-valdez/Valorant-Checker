import React from 'react';

interface Option {
  category: string;
  icon: string | null;
}

interface CheckboxItemProps {
  id: string;
  option: Option;
  selectedOption: string;
  handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({
  id,
  option: { category, icon },
  selectedOption,
  handleOptionChange,
}) => {
  const isSelected = selectedOption === category;

  const checkboxStyle: React.CSSProperties = {
    backgroundImage: isSelected ? `url(../assets/images/checked-box.webp)` : 'none',
    backgroundSize: isSelected ? 'cover' : 'auto',
  };

  return (
    <label
      htmlFor={id}
      className='checkbox-item flex items-center w-1/2 hover:bg-white hover:bg-opacity-25 cursor-pointer'
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
      <div className='text-base sm:text-xl flex items-center cursor-pointer'>
        {icon && <img src={icon} alt={`${category} icon`} className='w-5 h-5 mr-2 cursor-pointer' />}
        <p className='select-none'>{category}</p>
      </div>
    </label>
  );
};

interface FilterTableProps {
  selectedOption: string;
  handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterData: Option[];
}

const FilterTable: React.FC<FilterTableProps> = ({ selectedOption, handleOptionChange, filterData }) => {
  const shouldRenderBasisFull = filterData.length % 2 !== 1;

  return (
    <div>
      <form className='filter-table w-72 sm:w-80 flex flex-wrap'>
        <div className='w-1/2'>
          <h4 className='select-none font-bold text-sm sm:text-base'>Filter by Role</h4>
        </div>
        {shouldRenderBasisFull && <div className='basis-full' />}
        {filterData.map((option, index) => (
          <CheckboxItem
            key={option.category}
            id={`option-${index}`}
            option={option}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
          />
        ))}
      </form>
    </div>
  );
};

export default FilterTable;
