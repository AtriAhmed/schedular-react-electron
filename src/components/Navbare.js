import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbare.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from '../../assets/logo-andalus.png';

export default function Navbare() {
  const navigate = useNavigate()
    const toggleSidebar = (e)=>{
        e.persist();
        document.body.classList.toggle('sidenav-toggled');
        localStorage.setItem('sidebar-toggle', document.body.classList.contains('sidenav-toggled'));
    }
  return (
    <div>
        <nav className="navbar navbar-white navbar-expand-lg bg-white px-3 shadow fixed-top">

        <button type='button' className="btn btn-link btn-sm px-1 me-5" onClick={()=>{navigate(-1)}}><FontAwesomeIcon className='text-dark' icon="fas fa-arrow-left" size='lg' /> </button>
  <Link className="nav-item px-1" to="/home">
    <img src={icon} width="30" height="30" alt=""/>
  </Link>

</nav>
    </div>
  )
}
