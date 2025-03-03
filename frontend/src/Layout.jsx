import React from 'react'
import Header from '../src/Header Footer/Header.jsx'
import Footer from '../src/Header Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout
