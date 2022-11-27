/* eslint-disable no-bitwise */
/* eslint-disable radix */
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react'
import { db } from 'renderer/db';
import Swal from 'sweetalert2';
import LoadingCmp from '../LoadingCmp';

export default function EditClassCmp(props) {

  const [classesList, setClasses] = useState([]);
    const classes = useLiveQuery(
      () => db.classes.where({class_1_id:''}).toArray()
    );

    useEffect(() => {
      if(classes){
        setClasses(classes)
       }
    }, [classes])

    const [inputs, setItem] = useState({
      name:'',
      class_1_id:'',
      class_2_id:'',
    });

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(props.toedit){
                setItem(props.toedit);
            setLoading(false);
        }
    },[props.toedit])

  const [errorsList,setErrors] = useState([]);

  const handleInput = (e) =>{
      e.persist();
      setItem({...inputs, [e.target.name]: e.target.value});
  }

  const updateItem = async (e)=>{
      e.preventDefault();
      setErrors({})
      const data = {
          name:inputs.name.trim(),
          class_1_id: inputs.class_1_id ? Number.parseInt(inputs.class_1_id) : '',
          class_2_id: inputs.class_2_id ? Number.parseInt(inputs.class_2_id) : '',
    };
    if(!data.class_1_id ^ !data.class_2_id) setErrors((errors)=>({...errors, class_2_id:"On peut pas selectionner une seule classe", class_1_id:"On peut pas selectionner une seule classe"}))
    if(data.name && !(!data.class_1_id ^ !data.class_2_id))
try{
  await db.classes.update(props.toedit.id,data)
  setErrors({})
  Swal.fire("Succès","Classe Modifiée avec succès","success");
}
  catch(error){
    setErrors((errors)=>({...errors,name:"Nom existe déjà"}))
  }

  }
  if(loading)
  {
      return (
          <LoadingCmp/>
      )
  }
  return (
  <form onSubmit={updateItem} id='FORM'>
  <div className="tab-content" id="myTabContent">
    <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
    <div className="form-group mb-3">
              <label>Nom</label>
              <input type="text" name='name' onChange={handleInput} value={inputs.name} className='form-control'/>
              <small className='text-danger'>{errorsList.name}</small>
          </div>
          {inputs.class_1_id ? <div className="form-group">
                      <label>Sélectionner Classe 1</label>
                      <div className="input-group mb-3">
                             <select name="class_1_id" onChange={handleInput} value={inputs.class_1_id} className='form-control'>
                             <option value="">Sélectionner Classe 1</option>
                                 {
                                     classesList.map((item)=>{
                                          return(
                                          item.id != inputs.class_2_id ? <option value={item.id} key={item.id}>{item.name}</option>:''
                                          )
                                     })
                                 }

                              </select>
                              </div>
                              <small className='text-danger'>{errorsList.class_1_id}</small>
            </div>:''}
            {inputs.class_1_id ? <div className="form-group">
                      <label>Sélectionner Classe 2</label>
                      <div className="input-group mb-3">
                             <select name="class_2_id" onChange={handleInput} value={inputs.class_2_id} className='form-control'>
                             <option value="">Sélectionner Classe 2</option>
                                 {
                                     classesList.map((item)=>{
                                          return(
                                              item.id != inputs.class_1_id ? <option value={item.id} key={item.id}>{item.name}</option>:''
                                              )
                                     })
                                 }

                              </select>
                              </div>
                              <small className='text-danger'>{errorsList.class_2_id}</small>
                          </div>:''}
    </div>
  </div>
  <button type="submit" className='btn btn-primary px-4 float-end'>Mise à jour</button>
  </form>
  )
}
