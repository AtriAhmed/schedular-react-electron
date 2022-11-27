/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-undef */
import React, { useState } from 'react'
import { db } from 'renderer/db';
import Swal from 'sweetalert2';

function AddclassNameroomCmp() {

    const [classroomInput, setClassroom] = useState({
        name:'',
        remark:'',
        status:1,
        });
        const [errorsList, setErrors] = useState([]);
        function resetInputs(){
          setClassroom({
              name:'',
              remark:'',
          })
          setErrors([])
      }
        const handleInput = (e)=>{
            e.persist();
            setClassroom({...classroomInput,[e.target.name]:e.target.value})
        }

        const submitclassNameroom = async (e)=>{
            e.preventDefault();
            setErrors({})
            const data = {
                name:classroomInput.name.trim(),
                remark:classroomInput.remark,
                status:1
            }
            if(!data.name) setErrors((errors)=>({...errors,name:"Le champ Nom ne peut pas être vide"}))
            else
            try {
              // Add the new friend!
              await db.classrooms.add(data);
              resetInputs()
              Swal.fire("Succès","Salle ajoutée avec succès","success");
            } catch (error) {
              error.inner.code == 0 ?
              setErrors((errors)=>({...errors,name:"Nom existe déjà"}))
                :
                Swal.fire("Erreur",error.inner.message,"error")
            }
        }
  return (
    <form onSubmit={submitclassNameroom} id='CLASSROOM-FORM'>
    <div className="tab-content" id="myTabContent">
        <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div className="form-group mb-3">
                <label>Nom</label>
                <input type="text" name='name' onChange={handleInput} value={classroomInput.name} className='form-control'/>
                <small className='text-danger'>{errorsList.name}</small>
            </div>
            <div className="form-group mb-3">
                <label>Remarque</label>
                <textarea name="remark" onChange={handleInput} value={classroomInput.remark} className='form-control' />
                <small className='text-danger'>{errorsList.remark}</small>
            </div>
        </div>
    </div>
    <button type="submit" className='btn btn-primary px-4 float-end'>Soumettre</button>
</form>
  )
}

export default AddclassNameroomCmp
