import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from 'renderer/db';
import Swal from 'sweetalert2';
import LoadingCmp from '../LoadingCmp';
import AddSubjectModal from './AddSubjectModal';
import EditSubjectModal from './EditSubjectModal';

export default function Subjects() {
    const [loading, setLoading] = useState(true);
    const [itemsList, setItemsList] = useState([]);
      const [modalShow, setModalShow] = useState(false);
      const [editModalShow, setEditModalShow] = useState(false);
      const [toEdit, setToEdit] = useState({});
      const subjects = useLiveQuery(
        () => db.subjects.toArray()
      );
      useEffect(() => {
        if(subjects){
          setItemsList(subjects)
          setLoading(false)
         }

      }, [subjects])


        const deleteItem = async (e,item) =>{
            e.preventDefault();

            Swal.fire({
              title: 'Supprimée la matière',
              text:`Etes-vous sûr que vous voulez supprimer ${item.name} ?`,
              showDenyButton: true,
              confirmButtonText: 'Supprimer',
              denyButtonText: `Annuler`,
              confirmButtonColor: '#df4759',
              denyButtonColor: '#d9e2ef',
            }).then(async (result) => {
              if (result.isConfirmed) {
                  await db.subjects.delete(item.id)
                  Swal.fire("Succès","Matière Supprimée avec succès","success");
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
                  <h5 className="mb-3 mb-md-0">Matieres ({itemsList.length})</h5>
              </div>
              <div className="col-md-auto">
              <button type="button" className="btn btn-primary"  onClick={()=>{setModalShow(true)}}>Ajouter Matiere</button>
              </div>
              </div>
          </div>
          <div className="p-0 card-body">
              <div className="mx-0 row">
                  <div className="py-2 col-6">Nom</div>
                  <div className="py-2 col-6 text-center">Actions</div>
              </div>
                                  {itemsList.map((item,idx)=>{
                                      return (
              <div className="mx-0 border-bottom border-200 row" key={idx}>
                  <div className="col-6 d-flex align-items-center">
                              <h5 className="text-dark m-0"><strong>{item.name}</strong></h5>
                  </div>
                  <div className="py-3 col-6 text-center">
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
             <h5 className="mb-3 mb-md-0">Matières ({itemsList.length})</h5>
         </div>
         <div className="col-md-auto">
           <button type="button" className="btn btn-primary"  onClick={()=>{setModalShow(true)}}>Ajouter Matiere</button>
           </div>
         </div>
     </div>
       <div className='card-body py-5 text-center'>
       <h4>Il ya aucune matière !</h4>
       </div>
     </div>
      }
     return(
  <div>
    <div className='text-secondary'><Link className='text-decoration-none text-secondary' to="/home"><FontAwesomeIcon className='text-secondary' icon="fas fa-home" /> Home</Link> {'>>'} Matières</div>
  <div className='container p-0 p-sm-1 p-md-2 p-lg-4 p-xl-5'>
          <AddSubjectModal
          show={modalShow}
          onHide={() => {setModalShow(false)/* ;axios.get('/api/view-subjects').then(res=>{if(res.data.status === 200){setItemsList(res.data.items);}}); */}}
        />
        <EditSubjectModal
        toedit={toEdit}
          show={editModalShow}
          onHide={() => {setEditModalShow(false);/* axios.get('/api/view-subjects').then(res=>{if(res.data.status === 200){setItemsList(res.data.items);}}); */}}
        />
              {itemsHtml}
              </div>
  </div>
     )
}
