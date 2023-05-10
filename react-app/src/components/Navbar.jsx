import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className='navbar p-2 w-full flex items-center'>
        <Link to='/'> <h3 className='p-1 font-bold cursor-pointer'>Valochecker</h3></Link>
        <Link to='/agents-list'><h4 className='p-1 cursor-pointer'>Agents</h4></Link>
        <Link to='/weapons-list'><h4 className='p-1 cursor-pointer'>Weapons</h4></Link>
      </div>
  )
}
