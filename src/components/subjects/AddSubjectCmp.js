/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react'
import { db } from 'renderer/db';
import Swal from 'sweetalert2';

export default function AddSubjectCmp() {
  const [inputs, setItem] = useState({
    name:'',
      });
      const [errorsList,setErrors] = useState({})
  function resetInputs(){
        setItem({
            name:'',
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
            }
            if(!data.name) setErrors((errors)=>({...errors,name:"Le champ Nom ne peut pas être vide"}))
            else
            try {
              // Add the new friend!
              await db.subjects.add(data);
              resetInputs()
              Swal.fire("Succès","Matière ajoutée avec succès","success");
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

        </div>
    </div>
    <button type="submit" className='btn btn-primary px-4 float-end'>Soumettre</button>
    </form>
    )
}
