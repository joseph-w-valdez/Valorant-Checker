import React from 'react';
import { useLocation } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';
import DataTable from '../components/DataTable';
import { convertCamelCase, convertContainsColons } from '../utilities/stringConversions';

const IndividualWeapon = () => {
  const location = useLocation();
  const weapon = location.state.data;
  const weaponStats = weapon.weaponStats;

  const convertWeaponStats = (weaponStats) => {
    const convertedStats = {};
    for (const prop in weaponStats) {
      if (Object.prototype.hasOwnProperty.call(weaponStats, prop)) {
        const convertedProp = convertCamelCase(prop);
        let convertedValue = convertContainsColons(weaponStats[prop]);
        console.log('converted value', convertedValue);
        convertedValue = convertCamelCase(convertedValue);

        // Exclude key-value pair if the value is null
        if (convertedValue !== null) {
          convertedStats[convertedProp] = convertedValue;
        }
      }
    }

    return convertedStats;
  };


  const convertedStats = convertWeaponStats(weaponStats);
  const weaponStatsArray = Object.entries(convertedStats);

  return (
    <>
      <div className=''>
        <div className='flex items-center justify-center'>
          <BackButton />
          <Header text={weapon.displayName} />
        </div>
        <FlexBasisFull />
        <div className='w-[500px]'>
          <img src={weapon.displayIcon} alt={weapon.displayName} className='object-contain w-full' />
        </div>
        <FlexBasisFull />
      </div>
      <DataTable data={weaponStatsArray} dataType={'individual-weapon'} />
    </>
  );
};

export default IndividualWeapon;
