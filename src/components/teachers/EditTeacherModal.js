import { Modal } from 'react-bootstrap'
import React from 'react'
import EditTeacherCmp from './EditTeacherCmp'

function EditTeacherModal(props) {
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Modifier Prof
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <EditTeacherCmp toedit={props.toedit}/>
    </Modal.Body>
  </Modal>
  )
}

export default EditTeacherModal
