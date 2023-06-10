import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import FilterTable from '../components/FilterTable';
import DataTable, { DataTableProps } from '../components/DataTable';
import FlexBasisFull from '../components/FlexBasisFull';
import { weaponCategories } from '../data/weaponCategories';
import { fetchWeapons } from '../utilities/FetchWeapons';
import { useLoadingContext } from '../contexts/LoadingContext';

const WeaponsList: React.FC = () => {
  const { setIsLoading } = useLoadingContext();
  const [selectedOption, setSelectedOption] = useState('No Filter');
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
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedOption, setIsLoading]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option = event.target.value;
    setSelectedOption((prevState) =>
      prevState === option && option !== 'No Filter' ? 'No Filter' : option
    );
  };

  const dataTableProps: DataTableProps = {
    data: weapons,
    selectedOption,
    dataType: 'weapons',
  };

  return (
    <>
      <Header text={'Weapons'} />
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
