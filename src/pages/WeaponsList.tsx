import React, { useEffect, Dispatch, SetStateAction } from 'react';
import Header from '../components/Header';
import FilterTable from '../components/FilterTable';
import DataTable, { DataTableProps } from '../components/DataTable';
import FlexBasisFull from '../components/FlexBasisFull';
import { weaponCategories } from '../data/weaponCategories';
import { fetchWeapons } from '../utilities/fetchWeapons';
import { alphabetizeArray } from '../utilities/arrayManipulations';
import Subheader from '../components/Subheader';
import { normalizeSelectedOption } from '../utilities/stringConversions';
import { useHandleFilterBoxChange } from '../hooks/useHandleFilterBoxChange';
import useFetchRequest from '../hooks/useFetchRequest'

type WeaponsListProps = {
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
};

const WeaponsList: React.FC<WeaponsListProps> = ({ selectedOption, setSelectedOption }) => {
  const weapons = useFetchRequest(fetchWeapons, selectedOption);

  useEffect(() => {
    setSelectedOption('No Filter');
  }, []);

  const handleFilterBoxChange = useHandleFilterBoxChange(setSelectedOption)

  const dataTableProps: DataTableProps = {
    data: alphabetizeArray(weapons),
    selectedOption,
    dataType: 'weapons',
  };

  return (
    <>
       <div className='flex flex-wrap items-center justify-center'>
          <Header text='Weapons' />
      </div>
      <FlexBasisFull />
      {weapons && (
        <>
          <FlexBasisFull />
          <Subheader
            text={`There ${weapons.length === 1 ? 'is' : 'are'} currently ${weapons.length} ${normalizeSelectedOption(selectedOption)} ${weapons.length === 1 ? 'weapon' : 'weapons'}!`}
          />
          <FlexBasisFull />
        </>
      )}
      <FlexBasisFull />
      <FilterTable
        selectedOption={selectedOption}
        handleOptionChange={handleFilterBoxChange}
        filterData={weaponCategories}
      />
      <FlexBasisFull />
      <DataTable {...dataTableProps} />
    </>
  );
};

export default WeaponsList;
