/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-template */
/* eslint-disable radix */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react'
import { db } from 'renderer/db';
import Swal from 'sweetalert2';
import LoadingCmp from '../../LoadingCmp';
import Success from '../Success';

export default function AddSessionByClassCmp(props) {
  function dayToArabic(day){
switch(day){
  case "Monday" : return "الإثنين";
  case "Tuesday" : return "الثلاثاء";
  case "Wednesday" : return "الإربعاء";
  case "Thursday" : return "الخميس";
  case "Friday" : return "الجمعة";
  case "Saturday" : return "السبت";
  default:return day
}
  }
  const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
  const [subjectsList, setSubjects] = useState([]);
  const [errorsList,setErrors] = useState({})

  const subjects = useLiveQuery(
    () => db.subjects.toArray()
  );
  useEffect(() => {
    if(subjects){
      setSubjects(subjects)
     }
  }, [subjects])
  const [classe, setClass] = useState([]);
  useEffect(() => {
    if(props.toadd){
      db.classes.get(Number.parseInt(props.toadd.class_id)).then(res=>{
        if(res){
        setClass(res);
        setLoading(false);
      }
      })
    }
  }, [props.toadd])

  const teachers = useLiveQuery(
    () => db.teachers.where({status:1}).toArray()
  );

  const [teachersList, setTeachers] = useState([]);
  useEffect(() => {
    if(teachers){
      setTeachers(teachers)
     }
  }, [teachers])

  const classrooms = useLiveQuery(
    () => db.classrooms.where({status:1}).toArray()
  );

  const [classroomsList, setClassrooms] = useState([]);
  useEffect(() => {
    if(classrooms){
      setClassrooms(classrooms)
     }
  }, [classrooms])
  const [inputs, setInputs] = useState({
    subject_id:'',
    class_id:'',
    teacher_id:'',
    classroom_id:'',
    weekday:'',
    start_time:'',
    end_time:'',
  });
  useEffect(() => {
    setInputs({
      subject_id:'',
      class_id:props.toadd.class_id,
      teacher_id:'',
      classroom_id:'',
      weekday:props.toadd.weekday,
      start_time:props.toadd.start_time,
      end_time:'',
    })
  }, [props.toadd])

    const handleInput = (e)=>{
        e.persist();
        setInputs({...inputs,[e.target.name]:e.target.value})
    }

    const submitSession = async (e)=>{
      e.preventDefault();
      setErrors({})
          if(!inputs.end_time) {setErrors((errors)=>({...errors,end_time:"Vous devez sélectionner un temps du fin"}))}
          if(!inputs.subject_id) {setErrors((errors)=>({...errors,subject_id:"Vous devez sélectionner une matière"}))}
          if(!inputs.teacher_id) {setErrors((errors)=>({...errors,teacher_id:"Vous devez sélectionner un prof"}))}
          if(!inputs.classroom_id) {setErrors((errors)=>({...errors,classroom_id:"Vous devez sélectionner une salle"}))}
          if((inputs.end_time)&&(inputs.subject_id)&&(inputs.teacher_id)&&(inputs.classroom_id)){
          const data = {
          subject_id:Number.parseInt(inputs.subject_id),
          class_id:Number.parseInt(inputs.class_id),
          teacher_id:Number.parseInt(inputs.teacher_id),
          classroom_id:Number.parseInt(inputs.classroom_id),
          weekday:inputs.weekday,
          start_time:inputs.start_time,
          end_time:inputs.end_time,
        }
        const teacher = await db.teachers.get(data.teacher_id)
        const classroom = await db.classrooms.get(data.classroom_id)
        const classe = await db.classes.get(data.class_id)
        let teacherNotFree = false
        let classNotFree = false
        let classroomNotFree = false
        db.sessions.where("weekday").equals(inputs.weekday).toArray()
        .then((res)=>{
          res.map((session)=>{
            if(((data.start_time >= session.start_time)&&(data.start_time < session.end_time))||((data.end_time>session.start_time)&&(data.end_time<=session.end_time))||((data.start_time<=session.start_time)&&(data.end_time>=session.end_time))){
              if(session.class_id == data.class_id){classNotFree = true;}
              else if(session.teacher_id == data.teacher_id){teacherNotFree = true;}
              else if(session.classroom_id == data.classroom_id){classroomNotFree = true;}
            }
          })
        }).then(async ()=>{
          if(classNotFree){
            Swal.fire("Erreur",`Classe ${classe.name} n'est pas disponible à ce moment-là`,"error")
          }
          else if(teacherNotFree){
            Swal.fire("Erreur",`Professeur ${teacher.name} n'est pas disponible à ce moment-là`,"error")
          }
          else if(classroomNotFree){
            Swal.fire("Erreur",`${classroom.name} n'est pas disponible à ce moment-là`,"error")
          }else{
            try {
              // Add the new friend!
              await db.sessions.add(data);
              setSubmitted(true)
            } catch (error) {
              error.inner.code == 0 ?
                Swal.fire("Erreur","Nom existe déjà","error")
                :
                Swal.fire("Erreur",error.inner.message,"error")
            }
          }
        })
      }
    }
    if(loading)
    {
        return <LoadingCmp/>
    }
if(!submitted)
return (
<form onSubmit={submitSession} id='FORM'>
<div className="tab-content" id="myTabContent">
    <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
    <div className="form-group">
                    <label>Sélectionner classe</label>
                    <div className="input-group mb-3">
                           <select name="class_id" value={inputs.class_id} className='form-control' disabled>
                           <option>Sélectionner classe</option>
                           <option value={inputs.class_id}>{classe.name}</option>
                            </select>
                            </div>
                        </div>

    <div className="form-group">
                    <label>Sélectionner jour</label>
                    <div className="input-group mb-3">
                           <select name="weekday" value={inputs.weekday} className='form-control' disabled>
                           <option value={inputs.weekday}>{dayToArabic(inputs.weekday)}</option>
                            </select>
                            </div>
                        </div>
    <div className="form-group">
                    <label>Sélectionner debut</label>
                    <div className="input-group mb-3">
                           <select name="start_time" value={inputs.start_time} className='form-control' disabled>
                           <option value={inputs.start_time}>{inputs.start_time}</option>
                            </select>
                            </div>
                        </div>
                        <div className="form-group">
                    <label>Sélectionner fin</label>
                    <div className="input-group mb-3">
                           <select name="end_time" onChange={handleInput} value={inputs.end_time} className='form-control'>
                           <option value="">Sélectionner fin</option>
                           {inputs.start_time < "09:00:00" && "09" - inputs.start_time.substr(0,2) < 5 ? <option value="09:00:00">09:00</option> :''}
                           {inputs.start_time < "10:00:00" && "10" - inputs.start_time.substr(0,2) < 5 ? <option value="10:00:00">10:00</option> :''}
                           {inputs.start_time < "11:00:00" && "11" - inputs.start_time.substr(0,2) < 5 ? <option value="11:00:00">11:00</option> :''}
                           {inputs.start_time < "12:00:00" && "12" - inputs.start_time.substr(0,2) < 5 ? <option value="12:00:00">12:00</option> :''}
                           {inputs.start_time < "13:00:00" && "13" - inputs.start_time.substr(0,2) < 5 ? <option value="13:00:00">13:00</option> :''}
                           {inputs.start_time < "14:00:00" && "14" - inputs.start_time.substr(0,2) < 5 ? <option value="14:00:00">14:00</option> :''}
                           {inputs.start_time < "15:00:00" && "15" - inputs.start_time.substr(0,2) < 5 ? <option value="15:00:00">15:00</option> :''}
                           {inputs.start_time < "16:00:00" && "16" - inputs.start_time.substr(0,2) < 5 ? <option value="16:00:00">16:00</option> :''}
                           {"17" - inputs.start_time.substr(0,2) < 5 ? <option value="17:00:00">17:00</option>:''}
                            </select>
                            </div>
                            <small className='text-danger'>{errorsList.end_time}</small>
                        </div>
    <div className="form-group">
                    <label>Sélectionner matiere</label>
                    <div className="input-group mb-3">
                           <select name="subject_id" onChange={handleInput} value={inputs.subject_id} className='form-control'>
                           <option value="">Sélectionner matiere</option>
                               {
                                   subjectsList.map((item)=>{
                                        return (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        )
                                   })
                               }

                            </select>
                            </div>
                            <small className='text-danger'>{errorsList.subject_id}</small>
                        </div>
                        <div className="form-group">
                    <label>Sélectionner prof</label>
                    <div className="input-group mb-3">
                           <select name="teacher_id" onChange={handleInput} value={inputs.teacher_id} className='form-control'>
                           <option value="">Sélectionner prof</option>
                               {
                                   teachersList.map((item)=>{
                                        return (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        )
                                   })
                               }

                            </select>
                            </div>
                            <small className='text-danger'>{errorsList.teacher_id}</small>
                        </div>
                        <div className="form-group">
                    <label>Sélectionner salle</label>
                    <div className="input-group mb-3">
                           <select name="classroom_id" onChange={handleInput} value={inputs.classroom_id} className='form-control'>
                           <option value="">Sélectionner salle</option>
                               {
                                   classroomsList.map((item)=>{
                                        return (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        )
                                   })
                               }
                            </select>
                            </div>
                            <small className='text-danger'>{errorsList.classroom_id}</small>
                        </div>

    </div>
</div>
<button type="submit" className='btn btn-primary px-4 float-end'>Soumettre</button>
</form>
)
return(
<Success/>
)
}
