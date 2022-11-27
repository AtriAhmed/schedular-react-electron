import { Modal } from 'react-bootstrap'
import React from 'react'
import AddSessionByClassCmp from './AddSessionByClassCmp'

export default function AddScheduleByClassModal(props) {
  
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ajouter Session
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <AddSessionByClassCmp toadd={props.toadd}/>
        </Modal.Body>
      </Modal>
      )
}
