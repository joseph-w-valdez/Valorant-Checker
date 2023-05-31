import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import DataTable from '../components/DataTable';
import { alphabetizeArray } from '../utilities/arrayManipulations';
import { scrollToTop } from '../utilities/scrollToTop';

const WeaponSkins = () => {
  const location = useLocation();
  const weapon = location.state.data
  const weaponSkins = weapon.skins;
  const sortedWeaponSkins = alphabetizeArray(weaponSkins);

  useEffect(() => {
    scrollToTop();
  }, [location]);

  return (
    <>
      <div>
        <div className='flex items-center justify-center'>
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
