import { Modal } from 'react-bootstrap'
import React from 'react'
import EditClassroomsCmp from './EditClassroomsCmp'

function EditClassroomModal(props) {
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Modifier Salle
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <EditClassroomsCmp toedit={props.toedit}/>
    </Modal.Body>
  </Modal>
  )
}

export default EditClassroomModal