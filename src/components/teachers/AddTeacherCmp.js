/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react'
import { db } from 'renderer/db';
import Swal from 'sweetalert2';

function AddTeacherCmp() {

  const [inputs, setItem] = useState({
    name:'',
    subject:'',
    email:'',
    tel:'',
    status:'',
      });
      const [errorsList,setErrors] = useState([])
  function resetInputs(){
    setItem({
        name:'',
        subject:'',
        email:'',
        tel:'',
    })
    setErrors([])
}

    const handleInput = (e)=>{
        e.persist();
        setItem({...inputs,[e.target.name]:e.target.value})
    }
    const submitItem = async (e)=>{
        e.preventDefault();
        setErrors({})
        const data = {
          name:inputs.name.trim(),
          subject:inputs.subject,
          email:inputs.email,
          tel:inputs.tel,
          status:1,
        }
        if(!data.name) setErrors((errors)=>({...errors,name:"Le champ Nom ne peut pas être vide"}))
        if((data.tel)&&(data.tel.toString().length != 8)) setErrors((errors)=>({...errors,tel:"Tel doit étre composée de 8 numéros ou vide"}))
        if((data.name)&&((data.tel.toString().length == 8)||(!data.tel)))
        try {
          // Add the new friend!
          await db.teachers.add(data);
          resetInputs()
          Swal.fire("Succès","Prof ajoutée avec succès","success");
        } catch (error) {
          error.inner.code == 0 ?
          setErrors((errors)=>({...errors,name:"Nom existe déjà"}))
            :
            Swal.fire("Erreur",error.inner.message,"error")
        }

    }
return (
<form onSubmit={submitItem} id='FORM'>
<div className="tab-content" id="myTabContent">
    <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <div className="form-group mb-3">
            <label>Nom</label>
            <input type="text" name='name' onChange={handleInput} value={inputs.name} className='form-control'/>
            <small className='text-danger'>{errorsList.name}</small>
        </div>
        <div className="form-group mb-3">
            <label>Matière</label>
            <input type="text" name='subject' onChange={handleInput} value={inputs.subject} className='form-control'/>
            <small className='text-danger'>{errorsList.subject}</small>
        </div>
        <div className="form-group mb-3">
            <label>Email</label>
            <input type="email" name='email' onChange={handleInput} value={inputs.email} className='form-control'/>
            <small className='text-danger'>{errorsList.email}</small>
        </div>
        <div className="form-group mb-3">
            <label>Tel.</label>
            <input type="text" name='tel' onChange={handleInput} value={inputs.tel} className='form-control'/>
            <small className='text-danger'>{errorsList.tel}</small>
        </div>
    </div>
</div>
<button type="submit" className='btn btn-primary px-4 float-end'>Soumettre</button>
</form>
)
}

export default AddTeacherCmp
