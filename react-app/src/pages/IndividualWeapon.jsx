import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';
import DataTable from '../components/DataTable';
import { convertCamelCase, convertContainsColons, roundLongDecimals } from '../utilities/stringConversions';
import { meleeStats } from '../data/meleeInfo';

const IndividualWeapon = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const weapon = location.state.data;
  const weaponStats = weapon.weaponStats;
  const weaponSkins = weapon.skins
  const convertWeaponStats = (weaponStats) => {
    /* If the weapon stats are null, return the melee stats */
    if (!weaponStats) {
      return meleeStats
    }
    const convertedStats = {};

    const processProperty = (prop, value) => {
      const convertedProp = convertCamelCase(prop);
      let convertedValue = convertContainsColons(value);
      convertedValue = convertCamelCase(convertedValue);
      convertedValue = roundLongDecimals(convertedValue)
      // Exclude key-value pair if the value is null, NaN, or matches other exclusion rules
      if (
        convertedValue !== null && !isNaN(convertedValue) &&
        !(
          (convertedProp === "Burst Count" || convertedProp === "Shotgun Pellet Count") &&
          convertedValue === 1
        )
      ) {
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

  const handleWeaponSkinsButton = () => {
    navigate('/weapon-skins', { state: { data: weaponSkins} })
  }

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
        <button
          className='bg-[#ff5152] pb-1 pl-2 pr-2 font-bold rounded mt-4'
          onClick={handleWeaponSkinsButton}
        >
          Weapon Skins
        </button>
      </div>
      <DataTable data={weaponStatsArray} dataType={'individual-weapon'} />
    </>
  );
};

export default IndividualWeapon;
