import React, { useEffect, useState } from 'react'
import { db } from 'renderer/db';
import Swal from 'sweetalert2';
import LoadingCmp from '../LoadingCmp';

export default function EditSubjectCmp(props) {

    const [inputs, setItem] = useState({
      name:'',
    });

    const [loading, setLoading] = useState(true);

    useEffect(()=>{

            if(props.toedit)
            {
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
    };
    if(!data.name) setErrors((errors)=>({...errors,name:"Le champ Nom ne peut pas être vide"}))
    else
    try{
      await db.subjects.update(props.toedit.id,data)
      setErrors({})
      Swal.fire("Succès","Matière Modifiée avec succès","success");
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
    </div>
  </div>
  <button type="submit" className='btn btn-primary px-4 float-end'>Mise à jour</button>
  </form>
  )
}
