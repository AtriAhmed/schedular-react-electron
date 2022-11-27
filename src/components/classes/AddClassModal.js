import { Modal } from 'react-bootstrap'
import React from 'react'
import AddClassCmp from './AddClassCmp'

export default function AddClassModal(props) {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ajouter Classe
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <AddClassCmp/>
        </Modal.Body>
      </Modal>
      )
}
