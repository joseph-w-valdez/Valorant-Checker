import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import FilterTable from '../components/FilterTable';
import DataTable from '../components/DataTable';
import FlexBasisFull from '../components/FlexBasisFull';
import { weaponCategories } from '../data/weaponCategories';
import { fetchWeapons } from '../utilities/FetchWeapons';
import { LoadingContext } from '../contexts/LoadingContext';

const WeaponsList = ({ selectedOption, setSelectedOption }) => {
  const { setIsLoading } = useContext(LoadingContext);
  const [weapons, setWeapons] = useState([]);

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


  useEffect(() => {
    fetchWeapons(selectedOption, setWeapons);
  }, [selectedOption]);

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption((prevState) =>
      prevState === option && option !== 'No Filter' ? 'No Filter' : option
    );
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
      <DataTable data={weapons} selectedOption={selectedOption} dataType={'weapons'} />
    </>
  );
};

export default WeaponsList;
