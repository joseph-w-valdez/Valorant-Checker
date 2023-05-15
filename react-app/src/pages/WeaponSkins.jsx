import React from 'react';
import { useLocation } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import DataTable from '../components/DataTable';
import { alphabetizeArray } from '../utilities/arrayManipulations';

const WeaponSkins = () => {
  const location = useLocation();
  const weaponSkins = location.state.data;
  const sortedWeaponSkins = alphabetizeArray(weaponSkins);

  return (
    <>
      <div>
        <div className='flex items-center'>
          <BackButton />
          <Header text={'Weapon Skins'} />
        </div>
        <p>Click on a skin to view details, variations, and showcase clips!</p>
      </div>
      <DataTable data={sortedWeaponSkins} dataType={'weapon-skins'} />
    </>
  );
};

export default WeaponSkins;
