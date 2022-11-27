import React from 'react'
import { Modal } from 'react-bootstrap'
import EditSessionByTeacherCmp from './EditSessionByTeacherCmp'

export default function EditSessionByTeacherModal(props) {
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
     <EditSessionByTeacherCmp toedit={props.toedit}/>
    </Modal.Body>
  </Modal>
  )
}
