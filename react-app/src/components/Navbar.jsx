import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className='navbar p-2 w-full flex items-baseline fixed z-10'>
        <Link to='/'> <h3 className='select-none p-1 font-bold cursor-pointer sm:ml-24'>Valochecker</h3></Link>
        <Link to='/agents-list'><h4 className='select-none p-1 cursor-pointer hover:text-blue-700 hover:font-bold'>Agents</h4></Link>
        <Link to='/weapons-list'><h4 className='select-none p-1 cursor-pointer hover:text-blue-700 hover:font-bold'>Weapons</h4></Link>
      </div>
  )
}