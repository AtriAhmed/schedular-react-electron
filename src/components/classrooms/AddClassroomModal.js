import { Modal } from 'react-bootstrap'
import React from 'react'
import AddClassroomCmp from './AddClassroomCmp'

function AddClassroomModal(props) {
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Ajouter Salle
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <AddClassroomCmp/>
    </Modal.Body>
  </Modal>
  )
}

export default AddClassroomModal