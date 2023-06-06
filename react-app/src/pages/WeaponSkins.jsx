import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import DataTable from '../components/DataTable';
import { alphabetizeArray } from '../utilities/arrayManipulations';
import { fetchWeapon } from '../utilities/FetchWeapons';

const WeaponSkins = () => {
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

  const weaponSkins = weaponData.skins;
  const sortedWeaponSkins = alphabetizeArray(weaponSkins);

  return (
    <>
      <div>
        <div className='flex items-center justify-center'>
          <BackButton />
          <Header text={`${weaponData.displayName} Skins`} />
        </div>
        <p>Click on a skin to view details, variations, and showcase clips!</p>
      </div>
      <DataTable data={sortedWeaponSkins} dataType={'weapon-skins'} />
    </>
  );
};

export default WeaponSkins;
