import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import FilterTable from '../components/FilterTable';
import DataTable from '../components/DataTable';
import FlexBasisFull from '../components/FlexBasisFull';
import { weaponCategories } from '../data/weapon-categories';

const WeaponsList = () => {

  const [weapons, setWeapons] = useState([]);
  const [selectedOption, setSelectedOption] = useState('No Filter');

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('https://valorant-api.com/v1/weapons');
        const data = await response.json();
        console.log('data', data)
        if (selectedOption !== 'No Filter') {
          const filteredAgents = data.filter(weapon => weapon.category === selectedOption);
          setWeapons(filteredAgents);
        } else {
          setWeapons(data.data)
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAgents();
  }, [selectedOption]); // Run the effect whenever selectedOption changes

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption((prevState) =>
      prevState === option && option !== 'No Filter' ? 'No Filter' : option
    );
  };

  return (
    <>
      <Header text={'Weapons'}/>
      <FlexBasisFull />
      <FilterTable selectedOption={selectedOption} handleOptionChange={handleOptionChange} filterData={weaponCategories}/>
      <FlexBasisFull />
      <DataTable data={weapons} selectedOption={selectedOption} />
    </>
  )
}

export default WeaponsList
