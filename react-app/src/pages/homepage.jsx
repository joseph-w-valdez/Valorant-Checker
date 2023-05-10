import React from 'react'

const homepage = () => {
  return (
    <>
      <div className='navbar p-2 w-full flex items-center'>
        <h3 className='p-1 font-bold cursor-pointer'>Valochecker</h3>
        <h4 className='p-1 cursor-pointer'>Agents</h4>
        <h4 className='p-1 cursor-pointer'>Weapons</h4>
      </div>
      <h1 className='text-5xl m-6'>Homepage</h1>
      <div className="basis-full"></div>
      <div class="logo-frame w-96"><img src="../assets/images/valorant-logo.webp" alt="Valorant Logo" /></div>
    </>
  )
}

export default homepage
