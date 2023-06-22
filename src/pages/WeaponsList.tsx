import React, { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from 'react';
import Header from '../components/Header';
import FilterTable from '../components/FilterTable';
import DataTable, { DataTableProps } from '../components/DataTable';
import FlexBasisFull from '../components/FlexBasisFull';
import { weaponCategories } from '../data/weaponCategories';
import { fetchWeapons } from '../utilities/fetchWeapons';
import { useLoadingContext } from '../contexts/LoadingContext';
import { alphabetizeArray } from '../utilities/arrayManipulations';
import Subheader from '../components/Subheader';
import { normalizeSelectedOption } from '../utilities/stringConversions';

type WeaponsListProps = {
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
};

const WeaponsList: React.FC<WeaponsListProps> = ({ selectedOption, setSelectedOption }) => {
  const { isLoading, setIsLoading } = useLoadingContext();
  const [weapons, setWeapons] = useState<any[]>([]);

  useEffect(() => {
    setSelectedOption('No Filter');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const filteredWeapons = await fetchWeapons(selectedOption, setWeapons);
        setWeapons(filteredWeapons);
      } catch (error) {
        console.error(error);
        setWeapons([]);
      } finally {
        // Delay before setting isLoading to false to reduce visual bugs
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    fetchData();
  }, [selectedOption, setIsLoading]);

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    setSelectedOption((prevState) =>
      prevState === option && option !== 'No Filter' ? 'No Filter' : option
    );
  };

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
      {!isLoading && (
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
        handleOptionChange={handleOptionChange}
        filterData={weaponCategories}
      />
      <FlexBasisFull />
      <DataTable {...dataTableProps} />
    </>
  );
};

export default WeaponsList;
