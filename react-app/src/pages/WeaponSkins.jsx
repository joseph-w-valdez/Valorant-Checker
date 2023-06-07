import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import DataTable from '../components/DataTable';
import { alphabetizeArray } from '../utilities/arrayManipulations';
import { fetchWeapon } from '../utilities/FetchWeapons';
import { LoadingContext } from '../contexts/LoadingContext';

const WeaponSkins = () => {
  const { weaponName } = useParams();
  const { setIsLoading } = useContext(LoadingContext);
  const [weaponData, setWeaponData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeaponData = async () => {
      setIsLoading(true);
      try {
        const weaponData = await fetchWeapon(weaponName);
        setWeaponData(weaponData);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
      setIsLoading(false);
    };

    getWeaponData();
  }, [weaponName, setIsLoading]);

  if (error) {
    return <div>Error: {error}</div>; // Render an error message
  }

  if (!weaponData) {
    return null; // Render a loading state
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
      <DataTable data={sortedWeaponSkins} dataType={'weapon-skins'} weapon={weaponName} />
    </>
  );
};

export default WeaponSkins;
