import React from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import DataTable, { DataTableProps } from '../components/DataTable';
import { alphabetizeArray } from '../utilities/arrayManipulations';
import { fetchWeapon } from '../utilities/fetchWeapons';
import FlexBasisFull from '../components/FlexBasisFull';
import Subheader from '../components/Subheader';
import { useFetchObject } from '../hooks/useFetchRequest';

const WeaponSkins = () => {
  const { weaponName } = useParams();
  const weaponData = useFetchObject(fetchWeapon, weaponName);

  if (!weaponData) {
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
          <BackButton targetPage={`/weapon/${weaponName}`}/>
          <Header text={`${weaponData.displayName} Skins`} />
        </div>
        <FlexBasisFull />
        <Subheader text={`There are currently ${weaponData.skins.length} ${weaponData.displayName.toLowerCase()} skins!`} />
        <p>Click on a skin to view details, variations, and showcase clips!</p>
      </div>
      <FlexBasisFull />
      <DataTable {...dataTableProps} />
    </>
  );
};

export default WeaponSkins;
