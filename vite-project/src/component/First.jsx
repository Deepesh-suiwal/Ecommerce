import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

function First() {
  return (
    <>
    <Header />
    <Outlet />
    </>
  )
}

export default First