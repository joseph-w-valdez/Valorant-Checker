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
      className='checkbox-item flex flex-wrap items-center justify-start w-1/2 hover:bg-white hover:bg-opacity-25 cursor-pointer'
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
      <div className='text-xl flex items-center cursor-pointer'>
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
    <div className='flex justify-center'>
      <form className='filter-table w-[320px] flex flex-wrap justify-center border border-2 rounded px-2 py-1'>
        <div className='w-1/2 flex justify-center'>
          <h4 className='select-none font-bold'>Filter by Role</h4>
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
