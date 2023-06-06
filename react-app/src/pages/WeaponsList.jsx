import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import FilterTable from '../components/FilterTable';
import DataTable from '../components/DataTable';
import FlexBasisFull from '../components/FlexBasisFull';
import { weaponCategories } from '../data/weapon-categories';
import { fetchWeapons } from '../utilities/FetchWeapons';

const WeaponsList = () => {
  const [weapons, setWeapons] = useState([]);
  const [selectedOption, setSelectedOption] = useState('No Filter');

  useEffect(() => {
    fetchWeapons(selectedOption, setWeapons);
  }, [selectedOption]);

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption((prevState) =>
      prevState === option && option !== 'No Filter'
        ? 'No Filter'
        : option
    );
  };

  return (
    <>
      <Header text={'Weapons'} />
      <FlexBasisFull />
      <FilterTable selectedOption={selectedOption} handleOptionChange={handleOptionChange} filterData={weaponCategories} />
      <FlexBasisFull />
      <DataTable data={weapons} selectedOption={selectedOption} dataType={'weapons'} />
    </>
  )
}

export default WeaponsList;
