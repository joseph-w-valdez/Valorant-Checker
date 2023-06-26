import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FlexBasisFull from '../components/FlexBasisFull';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import Subheader from '../components/Subheader';
import { convertCamelCase, shortenLevelText, convertContainsColons, removeParentheses, onlyLettersAndNumbers } from '../utilities/stringConversions';
import { fetchWeapon } from '../utilities/fetchWeapons';
import { useFetchObject } from '../hooks/useFetchRequest';

const IndividualSkin = () => {
  const navigate = useNavigate();
  const { weaponName, skinName } = useParams();
  const weaponData = useFetchObject(fetchWeapon, weaponName);

  if (!weaponData) {
    return null; // Don't try to render content until the fetch has completed
  }

  const skinData = skinName
    ? weaponData.skins.find(
        (skin: any) =>
          onlyLettersAndNumbers(skin.displayName.toLowerCase()) === onlyLettersAndNumbers(skinName.toLowerCase())
      )
    : null;

  const variations = skinData?.chromas;
  const upgrades = skinData?.levels;

  const normalizeVariationName = (str: string) => {
    let normalizedDetails = shortenLevelText(str);
    normalizedDetails = removeParentheses(normalizedDetails);
    return normalizedDetails;
  };

  const normalizeUpgradeDetails = (str: string) => {
    let normalizedDetails = convertContainsColons(str);
    normalizedDetails = convertCamelCase(normalizedDetails);
    return normalizedDetails;
  };

  if (!skinData) {
    navigate('/not-found');
    return null; // Don't try to render content until the fetch has completed
  }

  return (
    <>
      <div className="flex items-center">
        <BackButton />
        <Header text={skinData.displayName} />
      </div>
      <FlexBasisFull />
      <div className="flex flex-wrap justify-center w-full">
        <section className="w-full lg:w-1/2">
          <Subheader text={'Variations'} />
          {variations.map((variation: any, index: number) => (
            <div key={index} className="flex flex-wrap justify-center w-full mb-8">
              <div className="w-full mb-4">{normalizeVariationName(variation.displayName)}</div>
              <div className="w-full sm:w-1/2 lg-w-full mx-[50px] sm:mx-0">
                {variation.fullRender && (
                  <img
                    src={variation.fullRender}
                    alt={`${variation.displayName} icon`}
                    className="object-contain w-full"
                  />
                )}
              </div>
            </div>
          ))}
        </section>
        <section className="w-full sm:w-1/2">
          <Subheader text={'Upgrades'} />
          <FlexBasisFull />
          {upgrades.length > 1 ? (
            upgrades.map((upgrade: any, index: number) => (
              <React.Fragment key={index}>
                <div className="flex flex-wrap justify-center mb-6">
                  <div className="w-full">
                    <p>{shortenLevelText(upgrade.displayName)}</p>
                  </div>
                  <div className="w-full mb-2">
                    <p>{normalizeUpgradeDetails(upgrade.levelItem)}</p>
                  </div>
                  {upgrade.streamedVideo && (
                    <div className="w-full flex justify-center">
                      <video controls style={{ width: '500px' }}>
                        <source src={upgrade.streamedVideo} type="video/mp4" />
                      </video>
                    </div>
                  )}
                </div>
                <FlexBasisFull />
              </React.Fragment>
            ))
          ) : (
            <div className="mb-10 text-lg sm:text-2xl">There are no upgrades for this skin! 😲</div>
          )}
        </section>
      </div>
    </>
  );
};

export default IndividualSkin;
