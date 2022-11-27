/* eslint-disable radix */
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react'
import { db } from 'renderer/db';
import Swal from 'sweetalert2';
import LoadingCmp from '../../LoadingCmp';

export default function EditSessionByClassroomCmp(props) {
  const [loading, setLoading] = useState(true);
  const [subjectsList, setSubjects] = useState([]);
  const [errorsList,setErrors] = useState({})
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

    const [classroom, setClassroom] = useState([]);
    useEffect(() => {
        if(props.toedit){
          db.classrooms.get(Number.parseInt(props.toedit.classroom_id)).then(res=>{
            if(res){
            setClassroom(res);
            setLoading(false);
          }})

    }
    }, [props.toedit])

    const [classesList, setClasses] = useState([]);
    const classes = useLiveQuery(
      () => db.classes.toArray()
    );
    useEffect(() => {
      if(classes){
        setClasses(classes)
       }else{
        setClasses([])
       }

    }, [classes])

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
          if(!inputs.end_time) {setErrors((errors)=>({...errors,end_time:"Vous devez sélectionner un temps du fin"}))}
          if(!inputs.subject_id) {setErrors((errors)=>({...errors,subject_id:"Vous devez sélectionner une matière"}))}
          if(!inputs.teacher_id) {setErrors((errors)=>({...errors,teacher_id:"Vous devez sélectionner un prof"}))}
          if(!inputs.class_id) {setErrors((errors)=>({...errors,class_id:"Vous devez sélectionner une classe"}))}
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
            Swal.fire("Erreur",`Classe ${classe.name} n'est pas disponible à ce moment-là`,"error")
          }
          else if(teacherNotFree){
            Swal.fire("Erreur",`Professeur ${teacher.name} n'est pas disponible à ce moment-là`,"error")
          }
          else if(classroomNotFree){
            Swal.fire("Erreur",`${classroom.name} n'est pas disponible à ce moment-là`,"error")
          }else{
            try{
              await db.sessions.update(props.toedit.id,data)
              Swal.fire("Success","Modifiée avec succès","success");
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
                    <label>Sélectionner Salle</label>
                    <div className="input-group mb-3">
                           <select name="classroom_id" value={inputs.classroom_id} className='form-control' disabled>
                           <option>Sélectionner Salle</option>
                           <option value={inputs.classroom_id}>{classroom.name}</option>
                            </select>
                            </div>
                        </div>

    <div className="form-group">
                    <label>Sélectionner jour</label>
                    <div className="input-group mb-3">
                           <select name="weekday" value={inputs.weekday} className='form-control' disabled>
                           <option value={inputs.weekday}>{inputs.weekday}</option>
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
                    <label>Sélectionner Classe</label>
                    <div className="input-group mb-3">
                           <select name="class_id" onChange={handleInput} value={inputs.class_id} className='form-control'>
                           <option value="">Sélectionner Classe</option>
                               {
                                   classesList.map((item)=>{
                                        return (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        )
                                   })
                               }

                            </select>
                            </div>
                            <small className='text-danger'>{errorsList.class_id}</small>
                        </div>
                        <div className="form-group">
                    <label>Sélectionner Prof</label>
                    <div className="input-group mb-3">
                           <select name="teacher_id" onChange={handleInput} value={inputs.teacher_id} className='form-control'>
                           <option value="">Sélectionner Prof</option>
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

    </div>
</div>
<button type="submit" className='btn btn-primary px-4 float-end'>Mise à jour</button>
</form>
)
}
