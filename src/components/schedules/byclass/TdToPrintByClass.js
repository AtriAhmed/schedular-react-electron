/* eslint-disable radix */
import React,{useState,useEffect} from 'react'
import { db } from 'renderer/db';

export default function TdToPrintByClass(props) {
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
    <div className="">{subject.name ? subject.name : ''}</div>
    <div className="">{teacher.name ? teacher.name : ''}</div>
    <div className="">{classroom.name ? classroom.name : ''}</div>
</td>
  )
}
