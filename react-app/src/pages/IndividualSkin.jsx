import React from 'react'
import { useLocation } from 'react-router-dom'
import FlexBasisFull from '../components/FlexBasisFull'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import Subheader from '../components/Subheader'

const IndividualSkin = () => {
  const location = useLocation()
  const skin = location.state.data
  console.log('skin', skin)
  const variations = skin.chromas
  console.log('variations', variations)
  const upgrades = skin.levels
  console.log('upgrades', upgrades)

  return (
    <>
      <div className='flex items-center'>
        <BackButton />
        <Header text={skin.displayName} />
      </div>
      <FlexBasisFull />
      <div className='flex flex-wrap justify-center'>
        <Subheader text={'Variations'} />
        {variations.map((variation, index) => (
          <div key={index} className='flex flex-wrap justify-center w-full mb-8'>
            <div className='w-full mb-4'>{variation.displayName}</div>
            <div className='w-1/4'>
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
        <Subheader text={'Upgrades'} />
        <FlexBasisFull />
        {upgrades.length > 1 ? (
          upgrades.map((upgrade, index) => (
            <>
              <div
                key={index}
                className='flex flex-wrap justify-center mb-6'
              >
                <div className='w-full'>
                  <p>{upgrade.displayName}</p>
                </div>
                <div className="w-full mb-2">
                  <p>{upgrade.levelItem}</p>
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
            <div className='mb-10'>There are no upgrades for this skin! 😲</div>
        )}
      </div>
    </>
  )
}

export default IndividualSkin
