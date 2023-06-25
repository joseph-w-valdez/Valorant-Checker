import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';
import DataTable, { DataTableProps } from '../components/DataTable';
import { fetchWeapon } from '../utilities/fetchWeapons';
import { convertWeaponStats, filterProps, modifyAccuracyProps } from '../utilities/weaponUtils';
import { useFetchObject } from '../hooks/useFetchRequest';

const IndividualWeapon = () => {
  const navigate = useNavigate();
  const { weaponName } = useParams();
  const weaponData = useFetchObject(fetchWeapon, weaponName);

  if (!weaponData) {
    return null; // Don't try to render content until the fetch has completed
  }

  const weaponStats = weaponData.weaponStats;
  const weaponIconWidth = weaponData.shopData?.categoryText === 'Sidearms' || weaponName === 'Melee' ? 'w-[250px]' : 'w-[500px]';

  const convertedStats = convertWeaponStats(weaponStats);
  const filteredStats = filterProps(convertedStats, weaponData);
  const modifiedStats = modifyAccuracyProps(filteredStats); // Modify accuracy props
  const weaponStatsArray: [string, unknown][] = Object.entries(modifiedStats);

  const handleWeaponSkinsButton = () => {
    navigate(`/weapon/${weaponName}/skins`);
  };

  const dataTableProps: DataTableProps = {
    data: weaponStatsArray,
    dataType: 'individual-weapon',
    selectedOption: '',
  };

  return (
    <>
      <div>
        <div className='flex items-center justify-center'>
          <BackButton targetPage='/weapons' />
          <Header text={weaponData.displayName} />
        </div>
        <FlexBasisFull />
        <div className={`${weaponIconWidth} max-w-[95vw] my-8`}>
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
      <FlexBasisFull />
      <DataTable {...dataTableProps} />
    </>
  );
};

export default IndividualWeapon;
