import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import FlexBasisFull from '../components/FlexBasisFull'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import Subheader from '../components/Subheader'
import { convertCamelCase, shortenLevelText, convertContainsColons, removeParentheses } from '../utilities/stringConversions'
import { scrollToTop } from '../utilities/scrollToTop'

const IndividualSkin = () => {
  const location = useLocation()
  const skin = location.state.data
  const variations = skin.chromas
  const upgrades = skin.levels

  useEffect(() => {
    scrollToTop();
  }, []);

  const normalizeVariationName = (str) => {
    let normalizedDetails = shortenLevelText(str);
    normalizedDetails = removeParentheses(normalizedDetails);
    return normalizedDetails;
  }

  const normalizeUpgradeDetails = (str) => {
    let normalizedDetails = convertContainsColons(str);
    normalizedDetails = convertCamelCase(normalizedDetails)
    return normalizedDetails
  }

  return (
    <>
      <div className='flex items-center'>
        <BackButton />
        <Header text={skin.displayName} />
      </div>
      <FlexBasisFull />
      <div className='flex flex-wrap justify-center w-full'>
        <div className='w-full sm:w-1/2'>
          <Subheader text={'Variations'} />
          {variations.map((variation, index) => (
            <div key={index} className='flex flex-wrap justify-center w-full mb-8'>
              <div className='w-full mb-4'>{normalizeVariationName(variation.displayName)}</div>
              <div className='w-full sm:w-1/2'>
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
              <>
                <div
                  key={upgrade.id}
                  className='flex flex-wrap justify-center mb-6'
                >
                  <div className='w-full'>
                    <p>{shortenLevelText(upgrade.displayName)}</p>
                  </div>
                  <div className="w-full mb-2">
                    <p>{normalizeUpgradeDetails(upgrade.levelItem)}</p>
                  </div>
                  {upgrade.streamedVideo && (
                    <div className='w-full flex justify-center'>
                      <video controls style={{width: '500px'}}>
                        <source src={upgrade.streamedVideo} type='video/mp4' />
                      </video>
                    </div>
                  )}
                </div>
                <FlexBasisFull />
              </>
            ))
          ) : (
              <div className='mb-10 text-2xl'>There are no upgrades for this skin! 😲</div>
          )}
        </div>
      </div>
    </>
  )
}

export default IndividualSkin
