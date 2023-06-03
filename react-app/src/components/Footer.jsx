import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full'>
      <div className='w-full bg-[#212121] h-[20px]'></div>
      <div className='w-full bg-gradient-to-r from-[#ff5152] via-red-950 via-black to-black min-h-[100px] bg-stone-950 text-[12px] text-left px-5 pb-5'>
        <p className='py-4 font-bold text-[16px] test'>ValoChecker</p>
        <p>This website uses <a target='_blank' href="https://valorant-api.com/" className='text-[#1D4DA8] font-bold' rel="noreferrer">Valorant-API</a>, a non-official API, which is not endorsed by Riot Games in any way.</p>
        <p>Valorant Tracker isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.</p>
        <p>ValoChecker created by Joseph Valdez.</p>
        <p><a target='_blank' href="https://www.linkedin.com/in/joseph-w-valdez" className='text-[#1D4DA8] font-bold' rel="noreferrer">LinkedIn</a></p>
        <p><a target='_blank' href="http://jwv-portfolio.herokuapp.com/" className='text-[#1D4DA8] font-bold' rel="noreferrer">Portfolio</a></p>
        <p><a target='_blank' href="https://github.com/joseph-w-valdez" className='text-[#1D4DA8] font-bold' rel="noreferrer">GitHub Profile</a></p>
        <p><a target='_blank' href="https://github.com/joseph-w-valdez/Valorant-Checker/tree/react-conversion" className='text-[#1D4DA8] font-bold' rel="noreferrer">ValoChecker Repository</a></p>
      </div>
    </footer>
  )
}

export default Footer
