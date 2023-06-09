import React from 'react'
import Header from '../components/Header'
import Subheader from '../components/Subheader'
import FlexBasisFull from '../components/FlexBasisFull'

const NotFound = () => {
  return (
    <>
      <Header text='404 - Page Not Found' />
      <FlexBasisFull />
      <p>The page you are looking for could not be found.</p>
      <p>Please check the URL or go back to the <a href="/">homepage</a>.</p>
    </>
  )
}

export default NotFound
