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

    const processProperty = (prop, value) => {
      const convertedProp = convertCamelCase(prop);
      let convertedValue = convertContainsColons(value);
      console.log('converted value', convertedValue)
      convertedValue = convertCamelCase(convertedValue);

      // Exclude key-value pair if the value is null
      if (convertedValue !== null && !((convertedProp === "Burst Count" || convertedProp === "Shotgun Pellet Count") && convertedValue === 1)) {
        convertedStats[convertedProp] = convertedValue;
      }
    };

    const processNestedObject = (prefix, obj) => {
      for (const prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          const nestedProp = prop;
          const nestedValue = obj[prop];

          if (typeof nestedValue === 'object' && nestedValue !== null) {
            processNestedObject(nestedProp, nestedValue);
          } else {
            processProperty(nestedProp, nestedValue);
          }
        }
      }
    };

    for (const prop in weaponStats) {
      if (Object.prototype.hasOwnProperty.call(weaponStats, prop)) {
        const value = weaponStats[prop];

        if (typeof value === 'object' && value !== null) {
          processNestedObject(prop, value);
        } else {
          processProperty(prop, value);
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
