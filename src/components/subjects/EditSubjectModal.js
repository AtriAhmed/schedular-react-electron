import React from 'react'
import { Modal } from 'react-bootstrap'
import EditSubjectCmp from './EditSubjectCmp'

export default function EditSubjectModal(props) {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modifier Matière
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <EditSubjectCmp toedit={props.toedit}/>
        </Modal.Body>
      </Modal>
      )
}
