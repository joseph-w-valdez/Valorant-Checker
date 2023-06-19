import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import DataTable, { DataTableProps } from '../components/DataTable';
import { alphabetizeArray } from '../utilities/arrayManipulations';
import { fetchWeapon } from '../utilities/fetchWeapons';
import { useLoadingContext } from '../contexts/LoadingContext';
import FlexBasisFull from '../components/FlexBasisFull';
import Subheader from '../components/Subheader';

const WeaponSkins = () => {
  const navigate = useNavigate();
  const { weaponName } = useParams();
  const { setIsLoading } = useLoadingContext();
  const [weaponData, setWeaponData] = useState<any>(null);
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

  const dataTableProps: DataTableProps = {
    data: sortedWeaponSkins,
    dataType: 'weapon-skins',
    weapon: weaponName,
    selectedOption: '', // Add the selectedOption property here
  };

  return (
    <>
      <div>
        <div className='flex items-center justify-center'>
          <BackButton />
          <Header text={`${weaponData.displayName} Skins`} />
        </div>
        <FlexBasisFull />
        <Subheader text={`There are currently ${weaponData.skins.length} ${weaponData.displayName.toLowerCase()} skins in game!`} />
        <p>Click on a skin to view details, variations, and showcase clips!</p>
      </div>
      <DataTable {...dataTableProps} />
    </>
  );
};

export default WeaponSkins;
