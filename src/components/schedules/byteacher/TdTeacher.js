/* eslint-disable radix */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState,useEffect } from 'react'
import { db } from 'renderer/db';
import Swal from 'sweetalert2';

export default function TdTeacher(props) {
  const [subject, setSubject] = useState([]);
  useEffect(() => {
    if(props.item.subject_id){
      db.subjects.get(Number.parseInt(props.item.subject_id)).then(res=>{
        if(res){
        setSubject(res);
      }
      })
    }
  }, [props.item.subject_id])

  const [classe, setClasse] = useState([]);
  useEffect(() => {
    if(props.item.class_id){
      db.classes.get(Number.parseInt(props.item.class_id)).then(res=>{
        if(res){
        setClasse(res);
      }
      })
    }
  }, [props.item.class_id])

  const [classroom, setClassroom] = useState([]);
  useEffect(() => {
    if(props.item.classroom_id){
      db.classrooms.get(Number.parseInt(props.item.classroom_id)).then(res=>{
        if(res){
        setClassroom(res);
      }
      })
    }
  }, [props.item.classroom_id])

      const deleteItem = (e,item) =>{
        e.preventDefault();

        Swal.fire({
          title: 'Supprimer la matiere',
          text:`Etes-vous sûr que vous voulez supprimer ${subject.name} du ${item.start_time} à ${item.end_time}  ?`,
          showDenyButton: true,
          confirmButtonText: 'Supprimer',
          denyButtonText: `Annuler`,
          confirmButtonColor: '#df4759',
          denyButtonColor: '#d9e2ef',
        }).then((result) => {
          if (result.isConfirmed) {
            db.sessions.delete(item.id).then(()=>{
              Swal.fire("Succès","Séance supprimée avec succès","success");
            })} else if (result.isDenied) {

          }
        })

    }
      return (
            <>
            {props.item.teacher_id ?
             <td>
                  <div className="row"><div className='col-4'><button type='button' className='btn p-0' onClick={()=>{props.settoedit(props.item);props.settoeditmodal(true)}}><FontAwesomeIcon className='text-primary' icon="fas fa-edit" /></button></div><div className='col-4' /> <div className='col-4'> <button type='button' className='btn p-0' onClick={(e)=>deleteItem(e,props.item)}><FontAwesomeIcon className='text-danger' icon="fas fa-trash" /></button> </div> </div>
                  <div className="">{classe.name ? classe.name : ''}</div>
                  <div className="">{subject.name ? subject.name : ''}</div>
                  <div className="">{classroom.name ? classroom.name : ''}</div>
              </td>
                                    :
              <td>
                    <button type="button" className="btn btn-primary"  onClick={()=>{props.settoadd(props.data);props.settoaddmodal(true)}}>+</button>
              </td>
                                 }
    </>
      )
}
