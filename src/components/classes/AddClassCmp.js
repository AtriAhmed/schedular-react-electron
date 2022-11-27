/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable radix */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unreachable */
/* eslint-disable no-bitwise */
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react';
import { db } from 'renderer/db';
import Swal from 'sweetalert2';

export default function AddClassCmp() {
  const [allcheckbox, setAllcheckbox] = useState({});
  const handleCheckbox = (e)=>{
      e.persist();
      setAllcheckbox({...allcheckbox,[e.target.name]:e.target.checked})
  }
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
    name: '',
    class_1_id:'',
    class_2_id:'',
  });
  const [errorsList,setErrors] = useState([])
  function resetInputs() {
    setItem({
      name: '',
      class_1_id:'',
      class_2_id:'',
    });
    setErrors({})
  }

  const handleInput = (e) => {
    e.persist();
    setItem({ ...inputs, [e.target.name]: e.target.value });
  };

  const submitItem = async (e) => {
    e.preventDefault();
    setErrors({})
    const data = {
      name: inputs.name.trim(),
      class_1_id: allcheckbox.group == 1 ? Number.parseInt(inputs.class_1_id) : '',
      class_2_id: allcheckbox.group == 1 ? Number.parseInt(inputs.class_2_id) : '',
    };
    if(!data.name) setErrors((errors)=>({...errors,name:"Le champ Nom ne peut pas être vide"}))
    if(!data.class_1_id ^ !data.class_2_id) setErrors((errors)=>({...errors, class_2_id:"On peut pas selectionner une seule classe", class_1_id:"On peut pas selectionner une seule classe"}))
    if(data.name && !(!data.class_1_id ^ !data.class_2_id))
    try {
      // Add the new friend!
      await db.classes.add(data);
      resetInputs()
      Swal.fire("Succès","Classe ajoutée avec succès","success");
    } catch (error) {
      error.inner.code == 0 ?
      setErrors((errors)=>({...errors,name:"Nom existe déjà"}))
        :
        Swal.fire("Erreur",error.inner.message,"error")
    }
  };
  return (
    <form onSubmit={submitItem} id="FORM">
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane card-body border fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div className="form-group mb-3">
            <label>Nom</label>
            <input
              type="text"
              name="name"
              onChange={handleInput}
              value={inputs.name}
              className="form-control"
            />
            <small className="text-danger">{errorsList.name}</small>
          </div>
          <div className="col-md-4 form-group mb-3">
              <label>Groupe des classes</label>
              <input type="checkbox" name="group" onChange={handleCheckbox} defaultChecked={allcheckbox.group === 1} className="w-50 h-50"/>
          </div>
         {allcheckbox.group ? <div className="form-group">
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
            {allcheckbox.group ? <div className="form-group">
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
      <button type="submit" className="btn btn-primary px-4 float-end">
        Soumettre
      </button>
    </form>
  );
}
