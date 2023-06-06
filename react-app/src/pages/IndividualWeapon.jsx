import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';
import DataTable from '../components/DataTable';
import { convertCamelCase, convertContainsColons, roundLongDecimals } from '../utilities/stringConversions';
import { meleeStats } from '../data/meleeInfo';
import { fetchWeapon } from '../utilities/FetchWeapons';

const IndividualWeapon = () => {
  const navigate = useNavigate();
  const { weaponName } = useParams();
  const [weaponData, setWeaponData] = useState(null);

  useEffect(() => {
    const getWeaponData = async () => {
      try {
        const weaponData = await fetchWeapon(weaponName);
        setWeaponData(weaponData);
      } catch (error) {
        console.error(error);
        setWeaponData(null);
      }
    };

    getWeaponData();
  }, [weaponName]);

  if (!weaponData) {
    return null; // Render a loading state or an error message
  }

  const weaponStats = weaponData.weaponStats;
  const weaponIconWidth = weaponData.shopData?.categoryText === 'Sidearms' ? 'w-[200px]' : 'w-[500px]';

  const convertWeaponStats = (weaponStats) => {
    /* If the weapon stats are null, return the melee stats */
    if (!weaponStats) {
      return meleeStats;
    }
    const convertedStats = {};

    const processProperty = (prop, value) => {
      const convertedProp = convertCamelCase(prop);
      let convertedValue = convertContainsColons(value);
      convertedValue = convertCamelCase(convertedValue);
      convertedValue = roundLongDecimals(convertedValue);
      // Exclude key-value pair if the value is null, NaN, or matches other exclusion rules
      if (
        convertedValue !== null &&
        !isNaN(convertedValue) &&
        !(
          (convertedProp === 'Burst Count' || convertedProp === 'Shotgun Pellet Count') &&
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
    navigate('/weapon-skins', { state: { data: weaponData } });
  };

  return (
    <>
      <div className=''>
        <div className='flex items-center justify-center'>
          <BackButton />
          <Header text={weaponData.displayName} />
        </div>
        <FlexBasisFull />
        <div className={`${weaponIconWidth} max-w-[95vw]`}>
          <img src={weaponData.displayIcon} alt={weaponData.displayName} className='object-contain w-full' />
        </div>
        <FlexBasisFull />
        <button
          className='bg-[#ff5152] py-2 px-5 font-bold rounded mt-4 hover:scale-110 transition-transform duration-100'
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
