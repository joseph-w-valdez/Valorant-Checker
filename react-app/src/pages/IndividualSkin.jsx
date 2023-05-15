import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'

const IndividualSkin = () => {
  const location = useLocation()
  const skin = location.state.data
  console.log('skin', skin)
  const variations = skin.chromas
  console.log('variations', variations)

  return (
    <>
      <Header text={skin.displayName} />
    </>
  )
}

export default IndividualSkin
