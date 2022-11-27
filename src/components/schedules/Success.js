import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Success() {
  return (
    <div className='d-flex justify-content-center align-items-center'>
    <div className='text-center'>
    <div className='align-item-center'><FontAwesomeIcon className='m-3' style={{color:'#90EE90'}} size='5x' icon="fas fa-check-circle" /></div>
    <div className='fw-bold fs-1 m-3'>Succès !</div>
        <div className='m-3'>Séance ajoutée avec succès !</div>
        </div>
    </div>
  )
}
