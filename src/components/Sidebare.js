import React from 'react'
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Sidebare() {
  return (
    <div className="sidebar bg-white shadow">
  <NavLink to="/home"><FontAwesomeIcon icon="fas fa-home" /> Home</NavLink>
  <NavLink to="/classes"><FontAwesomeIcon icon="fas fa-layer-group" /> Classes</NavLink>
  <NavLink to="/teachers"><FontAwesomeIcon icon="fas fa-users" /> Profs</NavLink>
  <NavLink to="/classrooms"><FontAwesomeIcon icon="fas fa-school" /> Salles</NavLink>
  <NavLink to="/subjects"><FontAwesomeIcon icon="fas fa-th" /> Matieres</NavLink>
  <NavLink to="/schedules"><FontAwesomeIcon icon="fas fa-calendar-alt" /> Emplois</NavLink>
  <NavLink to="/export"><FontAwesomeIcon icon="fas fa-download" /> Importer / Exporter</NavLink>
</div>
  )
}
