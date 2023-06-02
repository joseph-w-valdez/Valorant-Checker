import React from 'react'
import Header from '../components/Header'

const Homepage = () => {
  return (
    <div>
      <Header text={'Homepage'}/>
      <div className="basis-full"></div>
      <div className="logo-frame w-96"><img src="../assets/images/valorant-logo.webp" alt="Valorant Logo" /></div>
    </div>
  )
}

export default Homepage
