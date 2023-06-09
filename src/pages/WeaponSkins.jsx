import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import DataTable from '../components/DataTable';
import { alphabetizeArray } from '../utilities/arrayManipulations';
import { fetchWeapon } from '../utilities/FetchWeapons';
import { LoadingContext } from '../contexts/LoadingContext';

const WeaponSkins = () => {
  const navigate = useNavigate();
  const { weaponName } = useParams();
  const { setIsLoading } = useContext(LoadingContext);
  const [weaponData, setWeaponData] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  useEffect(() => {
    const getWeaponData = async () => {
      try {
        setIsLoading(true);
        const weaponData = await fetchWeapon(weaponName);
        setWeaponData(weaponData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetchCompleted(true);
        setIsLoading(false);
      }
    };

    getWeaponData();
  }, [weaponName, setIsLoading]);

  useEffect(() => {
    if (isFetchCompleted && !weaponData) {
      navigate('/not-found');
    }
  }, [isFetchCompleted, weaponData, navigate]);

  if (!weaponData || !isFetchCompleted) {
    return null; // Don't try to render content until the fetch has completed
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