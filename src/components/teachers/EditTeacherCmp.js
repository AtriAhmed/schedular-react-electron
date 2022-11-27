import React, { useEffect, useState } from 'react'
import { db } from 'renderer/db';
import Swal from 'sweetalert2';
import LoadingCmp from '../LoadingCmp';

function EditTeacherCmp(props) {
  const [allcheckbox, setAllcheckbox] = useState({});
  const handleCheckbox = (e)=>{
      e.persist();
      setAllcheckbox({...allcheckbox,[e.target.name]:e.target.checked})
  }

  const [inputs, setItem] = useState({
    name:'',
    subject:'',
    email:'',
    tel:'',
    status:'',
  });

  const [loading, setLoading] = useState(true);

  useEffect(()=>{

          if(props.toedit)
          {
              setItem(props.toedit);
              setAllcheckbox({status:props.toedit.status});
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
          subject:inputs.subject,
          email:inputs.email,
          tel:inputs.tel,
      status: allcheckbox.status ? 1 : 0,
  };
  if(!data.name) setErrors((errors)=>({...errors,name:"Le champ Nom ne peut pas être vide"}))
  if((data.tel)&&(data.tel.toString().length != 8)) setErrors((errors)=>({...errors,tel:"Tel doit étre composée de 8 numéros ou vide"}))
  if((data.name)&&((data.tel.toString().length == 8)||(!data.tel)))
  try{
    await db.teachers.update(props.toedit.id,data)
    setErrors({})
    Swal.fire("Succès","Prof Modifiée avec succès","success");
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
      <div className="col-md-4 form-group mb-3">
                            <label>Status (Cochée = Disponible)</label>
                            <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1} className="w-50 h-50"/>
                        </div>
  </div>
</div>
<button type="submit" className='btn btn-primary px-4 float-end'>Mise à jour</button>
</form>
)
}

export default EditTeacherCmp
