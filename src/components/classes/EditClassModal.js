import { Modal } from 'react-bootstrap'
import React from 'react'
import EditClassCmp from './EditClassCmp'

export default function EditClassModal(props) {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modifier Classe
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <EditClassCmp toedit={props.toedit}/>
        </Modal.Body>
      </Modal>
      )
}
