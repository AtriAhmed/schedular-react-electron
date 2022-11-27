import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from 'renderer/db';
import Swal from 'sweetalert2';
import LoadingCmp from '../LoadingCmp';
import AddTeacherModal from './AddTeacherModal';
import EditTeacherModal from './EditTeacherModal';

function Teachers() {
  const [loading, setLoading] = useState(true);
  const [itemsList, setItemsList] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [toEdit, setToEdit] = useState({});

    const teachers = useLiveQuery(
      () => db.teachers.toArray()
    );

    useEffect(() => {
      if(teachers){
        setItemsList(teachers)
        setLoading(false)
       }

    }, [teachers])


      const deleteTeacher = (e,item) =>{
          e.preventDefault();

          Swal.fire({
            title: 'Supprimée Prof',
            text:`Etes-vous sûr que vous voulez supprimer ${item.name} ?`,
            showDenyButton: true,
            confirmButtonText: 'Supprimer',
            denyButtonText: `Annuler`,
            confirmButtonColor: '#df4759',
            denyButtonColor: '#d9e2ef',
          }).then(async (result) => {
            if (result.isConfirmed) {
                await db.teachers.delete(item.id)
                Swal.fire("Succès","Prof Supprimée avec succès","success");

            } else if (result.isDenied) {

            }
          })

      }
      if(loading)
    {
        return <LoadingCmp/>
    }
    let itemsHtml = '';
    if(itemsList.length>0)
    {
        itemsHtml = (<>
        <div className="card shadow">
    <div className="card-header">
        <div className="justify-content-between row">
            <div className="col-md-auto">
                <h5 className="mb-3 mb-md-0">Profs ({itemsList.length})</h5>
            </div>
            <div className="col-md-auto">
              <button type="button" className="btn btn-primary"  onClick={()=>{setModalShow(true)}}>Ajouter Prof</button>
              </div>
            </div>
        </div>
        <div className="p-0 card-body">
            <div className="mx-0 row">
                <div className="py-2 col-2">Nom</div>
                <div className="py-2 col-2 text-center">Matière</div>
                <div className="py-2 col-2 text-center">Email</div>
                <div className="py-2 col-2 text-center">Tel</div>
                <div className="py-2 col-2 text-center">Status</div>
                <div className="py-2 col-2 text-center">Actions</div>
            </div>
                                {itemsList.map((item,idx)=>{
                                    return (
            <div className="mx-0 border-bottom border-200 row" key={idx}>
                <div className="col-2 d-flex align-items-center">
                            <h5 className="text-dark m-0 "><strong>{item.name}</strong></h5>
                </div>
                <div className="py-3 col-2 text-center">

                           {item.subject}

                </div>
                <div className="py-3 col-2 text-center">

{item.email}

</div>
<div className="py-3 col-2 text-center">

{item.tel}

</div>
                <div className="py-3 col-2 text-center">

                            {item.status == 1 ? "disponible" : "non disponible"}

                </div>
                <div className="py-3 col-2 text-center">
                    <div className="row">
                        <div className="col-6"><button type='button' className='btn p-0' onClick={(e)=>deleteTeacher(e,item)}><FontAwesomeIcon className='text-danger' size='lg' icon="fas fa-trash" /></button></div>
                        <div className="col-6"><button type='button' className='btn p-0' onClick={()=>{setToEdit(item);setEditModalShow(true)}}><FontAwesomeIcon className='text-primary' size='lg' icon="fas fa-edit" /></button></div>
                    </div>
                </div>
            </div>

                                 )
                                })}

        </div>

    </div>
                    </>
        )
    }
    else
    {
      itemsHtml = <div className="card shadow">
      <div className="card-header">
   <div className="justify-content-between row">
       <div className="col-md-auto">
           <h5 className="mb-3 mb-md-0">Proffesseurs ({itemsList.length})</h5>
       </div>
       <div className="col-md-auto">
         <button type="button" className="btn btn-primary"  onClick={()=>{setModalShow(true)}}>Ajouter Prof</button>
         </div>
       </div>
   </div>
     <div className='card-body py-5 text-center'>
     <h4>Il ya aucune Proffesseur !</h4>
     </div>
   </div>
    }
   return(
<div>
<div className='text-secondary'><Link className='text-decoration-none text-secondary' to="/home"><FontAwesomeIcon className='text-secondary' icon="fas fa-home" /> Home</Link> {'>>'} Profs</div>
<div className='container p-0 p-sm-1 p-md-2 p-lg-4 p-xl-5'>
        <AddTeacherModal
        show={modalShow}
        onHide={() => {setModalShow(false);}}
      />
      <EditTeacherModal
      toedit={toEdit}
        show={editModalShow}
        onHide={() => {setEditModalShow(false);}}
      />
            {itemsHtml}
            </div>
</div>
   )
}

export default Teachers
