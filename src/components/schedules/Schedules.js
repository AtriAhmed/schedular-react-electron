import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Schedules() {
  return (
    <div>
        <div className='text-secondary'><Link className='text-decoration-none text-secondary' to="/home"><FontAwesomeIcon className='text-secondary' icon="fas fa-home" /> Home</Link> {'>>'} emplois</div>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-6 col-lg-6 col-xl-4"><Link className='text-decoration-none text-dark' to="schedules-by-class"> <div className="card shadow  d-flex align-items-center justify-content-center m-5 p-4"> <div className="row"><div className='align-self-center'><FontAwesomeIcon size='5x' icon="fas fa-layer-group" /></div></div> <div className="row text-center w-75"> <strong className='fs-4'>Emploie par Classes</strong> </div> </div> </Link></div>
          <div className="col-12 col-sm-10 col-md-6 col-lg-6 col-xl-4"> <Link className='text-decoration-none text-dark' to="schedules-by-teacher"> <div className="card shadow  d-flex align-items-center justify-content-center m-5 p-4"> <div className="row"><div className='align-self-center'><FontAwesomeIcon size='5x' icon="fas fa-users" /></div></div> <div className="row text-center w-75"> <strong className='fs-4'>Emploie par Profs</strong> </div> </div> </Link></div>
          <div className="col-12 col-sm-10 col-md-6 col-lg-6 col-xl-4"><Link className='text-decoration-none text-dark' to="schedules-by-classroom"> <div className="card shadow  d-flex align-items-center justify-content-center m-5 p-4"> <div className="row"><div className='align-self-center'><FontAwesomeIcon size='5x' icon="fas fa-school" /></div></div> <div className="row text-center w-75"> <strong className='fs-4'>Emploie par Salles</strong> </div> </div> </Link></div>
        </div>
    </div>
  )
}
