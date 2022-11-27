/* eslint-disable radix */
import React,{useState,useEffect} from 'react'
import { db } from 'renderer/db';

export default function TdToPrintByClassroom(props) {
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

  const [teacher, setTeacher] = useState([]);
  useEffect(() => {
    if(props.item.teacher_id){
      db.teachers.get(Number.parseInt(props.item.teacher_id)).then(res=>{
        if(res){
        setTeacher(res);
      }
      })
    }
  }, [props.item.teacher_id])

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

  return (
    <td>
      <div className="">{classe.name ? classe.name : ''}</div>
      <div className="">{teacher.name ? teacher.name : ''}</div>
    <div className="">{subject.name ? subject.name : ''}</div>
</td>
  )
}
