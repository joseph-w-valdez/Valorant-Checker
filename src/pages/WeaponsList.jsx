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
        if (selectedOption !== 'No Filter') {
          /* convert the selectedOption string to the format used in the API */
          const selectedOptionQuery = `EEquippableCategory::${selectedOption}`
          const filteredWeapons = data.data.filter(weapon => weapon.category === selectedOptionQuery);
          setWeapons(filteredWeapons);
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
  // Get the selected option value from the clicked filter box
  const option = event.target.value;
  // Update the selected option state based on the previous state
  setSelectedOption((prevState) =>
    // If the selected option is the same as the previous state and not 'No Filter'
    prevState === option && option !== 'No Filter'
      ? 'No Filter' // Reset the selected option to 'No Filter'
      : option // Otherwise, update the selected option to the new value
  );
};


  return (
    <>
      <Header text={'Weapons'}/>
      <FlexBasisFull />
      <FilterTable selectedOption={selectedOption} handleOptionChange={handleOptionChange} filterData={weaponCategories} />
      <FlexBasisFull />
      <DataTable data={weapons} selectedOption={selectedOption} dataType={'weapons'} />
    </>
  )
}

export default WeaponsList
