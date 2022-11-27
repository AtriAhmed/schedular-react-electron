import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from 'renderer/db';
import Swal from 'sweetalert2';
import LoadingCmp from '../LoadingCmp';
import AddClassroomModal from './AddClassroomModal';
import EditClassroomModal from './EditClassroomModal';

export default function Classrooms() {
    const [loading, setLoading] = useState(true);
    const [itemsList, setItemsList] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [toEdit, setToEdit] = useState({});

    const classrooms = useLiveQuery(
      () => db.classrooms.toArray()
    );
    useEffect(() => {
      if(classrooms){
        setItemsList(classrooms)
        setLoading(false)
       }

    }, [classrooms])


      const deleteItem = async (e,item) =>{
          e.preventDefault();

          Swal.fire({
            title: 'Supprimée la salle',
            text:`Etes-vous sûr que vous voulez supprimer ${item.name} ?`,
            showDenyButton: true,
            confirmButtonText: 'Supprimer',
            denyButtonText: `Annuler`,
            confirmButtonColor: '#df4759',
            denyButtonColor: '#d9e2ef',
          }).then(async (result) => {
            if (result.isConfirmed) {
              await db.classrooms.delete(item.id)
              Swal.fire("Succès","Salle Supprimée avec succès","success");
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
                <h5 className="mb-3 mb-md-0">Salles ({itemsList.length})</h5>
            </div>
            <div className="col-md-auto">
              <button type="button" className="btn btn-primary"  onClick={()=>{setModalShow(true)}}>Ajouter Salle</button>
              </div>
            </div>
        </div>
        <div className="p-0 card-body">
            <div className="mx-0 row">
                <div className="py-2 col-5">Nom</div>
                <div className="py-2 col-3 text-center">Remarque</div>
                <div className="py-2 col-2 text-center">Status</div>
                <div className="py-2 col-2 text-center">Actions</div>
            </div>
                                {itemsList.map((item,idx)=>{
                                    return (
            <div className="mx-0 border-bottom border-200 row" key={idx}>
                <div className="col-5 d-flex align-items-center">
                            <h5 className="text-dark m-0"><strong>{item.name}</strong></h5>
                </div>
                <div className="py-3 col-3 d-flex align-items-center justify-content-center">

                           {item.remark}

                </div>
                <div className="py-3 col-2 d-flex align-items-center justify-content-center">

                            {item.status == 1 ? "disponible" : "non disponible"}

                </div>
                <div className="py-3 col-2 text-center">
                    <div className="row">
                        <div className="col-6"><button type='button' className='btn p-0' onClick={(e)=>deleteItem(e,item)}><FontAwesomeIcon className='text-danger' size='lg' icon="fas fa-trash" /></button></div>
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
                <h5 className="mb-3 mb-md-0">Salles ({itemsList.length})</h5>
            </div>
            <div className="col-md-auto">
              <button type="button" className="btn btn-primary"  onClick={()=>{setModalShow(true)}}>Ajouter Salle</button>
              </div>
            </div>
        </div>
          <div className='card-body py-5 text-center'>
          <h4>Il ya aucune salle !</h4>
          </div>
        </div>
    }
   return(
<div>
<div className='text-secondary'><Link className='text-decoration-none text-secondary' to="/home"><FontAwesomeIcon className='text-secondary' icon="fas fa-home" /> Home</Link> {'>>'} Salles</div>
<div className='container p-0 p-sm-1 p-md-2 p-lg-4 p-xl-5'>
        <AddClassroomModal
        show={modalShow}
        onHide={() => {setModalShow(false);}}
      />
      <EditClassroomModal
      toedit={toEdit}
        show={editModalShow}
   onHide={() => {setEditModalShow(false);}}
      />
            {itemsHtml}
            </div>
</div>
   )
}
