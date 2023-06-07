import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FlexBasisFull from '../components/FlexBasisFull';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import Subheader from '../components/Subheader';
import { convertCamelCase, shortenLevelText, convertContainsColons, removeParentheses, onlyLettersAndNumbers } from '../utilities/stringConversions';
import { fetchWeapon } from '../utilities/FetchWeapons';

const IndividualSkin = () => {
  const { weaponName, skinName } = useParams();
  const [weaponData, setWeaponData] = useState(null);

  useEffect(() => {
    const getWeaponData = async () => {
      const weaponData = await fetchWeapon(weaponName);
      setWeaponData(weaponData);
    };

    getWeaponData();
  }, [weaponName]);

  if (!weaponData) {
    return null; // Render a loading state or an error message
  }

  const skinData = weaponData.skins.find(
    (skin) =>
      onlyLettersAndNumbers(skin.displayName.toLowerCase()) === onlyLettersAndNumbers(skinName.toLowerCase())
  );

  const variations = skinData.chromas;
  const upgrades = skinData.levels;
  console.log('upgrades', upgrades)

  const normalizeVariationName = (str) => {
    let normalizedDetails = shortenLevelText(str);
    normalizedDetails = removeParentheses(normalizedDetails);
    return normalizedDetails;
  };

  const normalizeUpgradeDetails = (str) => {
    let normalizedDetails = convertContainsColons(str);
    normalizedDetails = convertCamelCase(normalizedDetails);
    return normalizedDetails;
  };

  return (
    <>
      <div className='flex items-center'>
        <BackButton />
        <Header text={skinData.displayName} />
      </div>
      <FlexBasisFull />
      <div className='flex flex-wrap justify-center w-full'>
        <div className='w-full lg:w-1/2'>
          <Subheader text={'Variations'} />
          {variations.map((variation, index) => (
            <div key={index} className='flex flex-wrap justify-center w-full mb-8'>
              <div className='w-full mb-4'>{normalizeVariationName(variation.displayName)}</div>
              <div className='w-full sm:w-1/2 lg-w-full mx-[50px] sm:mx-0'>
                {variation.fullRender && (
                  <img
                    src={variation.fullRender}
                    alt={`${variation.displayName} icon`}
                    className='object-contain w-full'
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className='w-full sm:w-1/2'>
          <Subheader text={'Upgrades'} />
          <FlexBasisFull />
          {upgrades.length > 1 ? (
            upgrades.map((upgrade, index) => (
              <React.Fragment key={index}>
                <div className='flex flex-wrap justify-center mb-6'>
                  <div className='w-full'>
                    <p>{shortenLevelText(upgrade.displayName)}</p>
                  </div>
                  <div className='w-full mb-2'>
                    <p>{normalizeUpgradeDetails(upgrade.levelItem)}</p>
                  </div>
                  {upgrade.streamedVideo && (
                    <div className='w-full flex justify-center'>
                      <video controls style={{ width: '500px' }}>
                        <source src={upgrade.streamedVideo} type='video/mp4' />
                      </video>
                    </div>
                  )}
                </div>
                <FlexBasisFull />
              </React.Fragment>
            ))
          ) : (
            <div className='mb-10 text-lg sm:text-2xl'>There are no upgrades for this skin! 😲</div>
          )}
        </div>
      </div>
    </>
  );
}

export default IndividualSkin;
