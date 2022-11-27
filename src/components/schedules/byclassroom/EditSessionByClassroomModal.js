import React from 'react'
import { Modal } from 'react-bootstrap'
import EditSessionByClassroomCmp from './EditSessionByClassroomCmp'

export default function EditSessionByClassroomModal(props) {
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Modifier Session
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <EditSessionByClassroomCmp toedit={props.toedit}/>
    </Modal.Body>
  </Modal>
  )
}
