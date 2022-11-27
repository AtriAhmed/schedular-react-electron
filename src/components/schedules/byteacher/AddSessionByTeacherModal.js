import React from 'react'
import { Modal } from 'react-bootstrap'
import AddSessionByTeacherCmp from './AddSessionByTeacherCmp'

export default function AddSessionByTeacherModal(props) {
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
         <AddSessionByTeacherCmp toadd={props.toadd}/>
        </Modal.Body>
      </Modal>
      )
}
