import React,{useState,useEffect} from 'react'
import { db } from 'renderer/db';
import Swal from 'sweetalert2';
import LoadingCmp from '../LoadingCmp';

function EditClassroomsCmp(props) {
    const [allcheckbox, setAllcheckbox] = useState({});
    const handleCheckbox = (e)=>{
        e.persist();
        setAllcheckbox({...allcheckbox,[e.target.name]:e.target.checked})
    }

    const [classroomInput, setClassroom] = useState({
        name:'',
        remark:'',
    });

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(props.toedit){
                setClassroom(props.toedit);
                setAllcheckbox({status:props.toedit.status});
            setLoading(false);
        }
    },[props.toedit])

  const [errorsList,setErrors] = useState([]);

  const handleInput = (e) =>{
      e.persist();
      setClassroom({...classroomInput, [e.target.name]: e.target.value});
  }

  const updateClassroom = async (e)=>{
      e.preventDefault();
      setErrors({})
      const data = {
        name: classroomInput.name.trim(),
        remark: classroomInput.remark,
        status: allcheckbox.status ? 1 : 0,
    };
    if(!data.name) setErrors((errors)=>({...errors,name:"Le champ Nom ne peut pas être vide"}))
    else
    try{
      await db.classrooms.update(props.toedit.id,data)
      setErrors({})
      Swal.fire("Succès","Salle Modifiée avec succès","success");
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
<form onSubmit={updateClassroom} id='CLASSROOM-FORM'>
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
export default EditClassroomsCmp
