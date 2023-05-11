import React from 'react'
import Header from '../components/Header'
import FilterTable from '../components/FilterTable'
import DataTable from '../components/DataTable'
import FlexBasisFull from '../components/FlexBasisFull'

const AgentsList = () => {
  return (
     <>
      <Header text={'Agents'} />
      <FlexBasisFull />
      <FilterTable />
      <FlexBasisFull />
      <DataTable />
     </>
  )
}

export default AgentsList
