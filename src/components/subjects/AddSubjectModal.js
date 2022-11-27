import React from 'react'
import { Modal } from 'react-bootstrap'
import AddSubjectCmp from './AddSubjectCmp'

export default function AddSubjectModal(props) {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ajouter Matière
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <AddSubjectCmp/>
        </Modal.Body>
      </Modal>
      )
}
