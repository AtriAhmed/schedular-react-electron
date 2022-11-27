/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import {Outlet} from 'react-router-dom'
import {useNavigate} from 'react-router'
import Navbare from './Navbare'
import Sidebare from './Sidebare'

export default function Layout() {
    const  navigate  = useNavigate()

useEffect(() => {
 if(window.location.pathname=='/'){
     navigate('/home');
 }

}, [])
  return (
    <div>
    <Navbare/>
            <Sidebare/>
           <div className='content'>
            <Outlet/>
            </div>
</div>
  )
}
