/* eslint-disable radix */
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react'
import { db } from 'renderer/db';
import Swal from 'sweetalert2';
import LoadingCmp from '../../LoadingCmp';

export default function EditSessionByClassCmp(props) {
    const [loading, setLoading] = useState(true);
    const [errorsList,setErrors] = useState({})
    const [subjectsList, setSubjects] = useState([]);
    const subjects = useLiveQuery(
      () => db.subjects.toArray()
    );
    useEffect(() => {
      if(subjects){
        setSubjects(subjects)
       }
       else{
        setSubjects([])
       }

    }, [subjects])

    const [classe, setClass] = useState([]);
    useEffect(() => {
        if(props.toedit){
          db.classes.get(Number.parseInt(props.toedit.class_id)).then(res=>{
            if(res){
            setClass(res);
            setLoading(false);
          }})

    }
    }, [props.toedit])

    const [teachersList, setTeachers] = useState([]);
    const teachers = useLiveQuery(
      () => db.teachers.where({status:1}).toArray()
    );
    useEffect(() => {
      if(teachers){
        setTeachers(teachers)
       }
       else{
        setTeachers([])
       }

    }, [teachers])

    const [classroomsList, setClassrooms] = useState([]);
    const classrooms = useLiveQuery(
      () => db.classrooms.where({status:1}).toArray()
    );
    useEffect(() => {
      if(classrooms){
        setClassrooms(classrooms)
       }else{
        setClassrooms([])
       }

    }, [classrooms])

    const [inputs, setInputs] = useState([]);
    useEffect(() => {
      setInputs({
        subject_id:'',
        class_id:props.toedit.class_id,
        teacher_id:'',
        classroom_id:'',
        weekday:props.toedit.weekday,
        start_time:props.toedit.start_time,
        end_time:'',
        errorsList:[],
      })
    }, [props.toedit])

      const handleInput = (e)=>{
          e.persist();
          setInputs({...inputs,[e.target.name]:e.target.value})
      }

      useEffect(()=>{
        db.sessions.get(Number.parseInt(props.toedit.id)).then(res=>{
          if(res){
          setInputs(res);
          setLoading(false);
        }})

    },[props.toedit])

      const updateSession = async (e)=>{
          e.preventDefault();
          setErrors({})
          if(!inputs.end_time) {setErrors((errors)=>({...errors,end_time:"Vous devez s??lectionner un temps du fin"}))}
          if(!inputs.subject_id) {setErrors((errors)=>({...errors,subject_id:"Vous devez s??lectionner une mati??re"}))}
          if(!inputs.teacher_id) {setErrors((errors)=>({...errors,teacher_id:"Vous devez s??lectionner un prof"}))}
          if(!inputs.classroom_id) {setErrors((errors)=>({...errors,classroom_id:"Vous devez s??lectionner une salle"}))}
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
            if(session.id != inputs.id)
            if(((data.start_time >= session.start_time)&&(data.start_time < session.end_time))||((data.end_time>session.start_time)&&(data.end_time<=session.end_time))||((data.start_time<=session.start_time)&&(data.end_time>=session.end_time))){
              if(session.class_id == data.class_id){classNotFree = true;}
              else if(session.teacher_id == data.teacher_id){teacherNotFree = true;}
              else if(session.classroom_id == data.classroom_id){classroomNotFree = true;}
            }
          })
        }).then(async ()=>{
          if(classNotFree){
            Swal.fire("Erreur",`Classe ${classe.name} n'est pas disponible ?? ce moment-l??`,"error")
          }
          else if(teacherNotFree){
            Swal.fire("Erreur",`Professeur ${teacher.name} n'est pas disponible ?? ce moment-l??`,"error")
          }
          else if(classroomNotFree){
            Swal.fire("Erreur",`${classroom.name} n'est pas disponible ?? ce moment-l??`,"error")
          }else{
            try{
              await db.sessions.update(props.toedit.id,data)
              Swal.fire("Success","Modifi??e avec succ??s","success");
            }
              catch(error){
                Swal.fire("Success",error.inner.message,"success");
              }
          }
        })
      }
      }
      if(loading)
    {
        return <LoadingCmp/>
    }
  return (
  <form onSubmit={updateSession} id='FORM'>
  <div className="tab-content" id="myTabContent">
      <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
      <div className="form-group">
                      <label>S??lectionner classe</label>
                      <div className="input-group mb-3">
                             <select name="class_id" value={inputs.class_id} className='form-control' disabled>
                             <option>S??lectionner classe</option>
                             <option value={inputs.class_id}>{classe.name}</option>
                              </select>
                              </div>
                          </div>

      <div className="form-group">
                      <label>S??lectionner jour</label>
                      <div className="input-group mb-3">
                             <select name="weekday" value={inputs.weekday} className='form-control' disabled>
                             <option value={inputs.weekday}>{inputs.weekday}</option>
                              </select>
                              </div>
                          </div>
      <div className="form-group">
                      <label>S??lectionner debut</label>
                      <div className="input-group mb-3">
                             <select name="start_time" value={inputs.start_time} className='form-control' disabled>
                             <option value={inputs.start_time}>{inputs.start_time}</option>
                              </select>
                              </div>
                          </div>
                          <div className="form-group">
                      <label>S??lectionner fin</label>
                      <div className="input-group mb-3">
                             <select name="end_time" onChange={handleInput} value={inputs.end_time} className='form-control'>
                             <option value="">S??lectionner fin</option>
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
                      <label>S??lectionner matiere</label>
                      <div className="input-group mb-3">
                             <select name="subject_id" onChange={handleInput} value={inputs.subject_id} className='form-control'>
                             <option value="">S??lectionner matiere</option>
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
                      <label>S??lectionner prof</label>
                      <div className="input-group mb-3">
                             <select name="teacher_id" onChange={handleInput} value={inputs.teacher_id} className='form-control'>
                             <option value="">S??lectionner prof</option>
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
                      <label>S??lectionner salle</label>
                      <div className="input-group mb-3">
                             <select name="classroom_id" onChange={handleInput} value={inputs.classroom_id} className='form-control'>
                             <option value="">S??lectionner salle</option>
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
  <button type="submit" className='btn btn-primary px-4 float-end'>Mise ?? jour</button>
  </form>
  )
}
