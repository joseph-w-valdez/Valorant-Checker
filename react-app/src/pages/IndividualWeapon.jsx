import React from 'react'
import { useLocation } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Header from '../components/Header'
import FlexBasisFull from '../components/FlexBasisFull'
import DataTable from '../components/DataTable'

const IndividualWeapon = () => {
  const location = useLocation()
  const weapon = location.state.data
  const weaponStats = weapon.weaponStats
  console.log('weapon stats', weaponStats)

  return (
    <>
      <div className=''>
        <div className='flex items-center justify-center'>
          <BackButton />
          <Header text={weapon.displayName}/>
        </div>
        <FlexBasisFull />
        <div className='w-[500px]'>
          <img src={weapon.displayIcon} alt={weapon.displayName} className='object-contain w-full' />
        </div>
        <FlexBasisFull />
      </div>
      <DataTable data={weaponStats} dataType={'individual-weapon'}/>
    </>
  )
}

export default IndividualWeapon
