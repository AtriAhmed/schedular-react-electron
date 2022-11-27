import { Modal } from 'react-bootstrap'
import React from 'react'
import AddTeacherCmp from './AddTeacherCmp'

function AddTeacherModal(props) {
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Ajouter Prof
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <AddTeacherCmp/>
    </Modal.Body>
  </Modal>
  )
}

export default AddTeacherModal