/* eslint-disable radix */
import React,{useState,useEffect} from 'react'
import { db } from 'renderer/db';

export default function TdToPrintByTeacher(props) {
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

  return (
    <td>
    <div className="">{classe.name ? classe.name : ''}</div>
    <div className="">{subject.name ? subject.name : ''}</div>
    <div className="">{classroom.name ? classroom.name : ''}</div>
</td>
  )
}
