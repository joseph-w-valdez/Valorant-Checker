import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import BackButton from '../components/BackButton'

const IndividualSkin = () => {
  const location = useLocation()
  const skin = location.state.data
  console.log('skin', skin)
  const variations = skin.chromas
  console.log('variations', variations)

  return (
    <>
      <div className='flex items-center'>
        <BackButton />
        <Header text={skin.displayName} />
      </div>
    </>
  )
}

export default IndividualSkin
