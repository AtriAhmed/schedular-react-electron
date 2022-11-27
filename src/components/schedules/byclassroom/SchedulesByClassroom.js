import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from 'renderer/db';
import LoadingCmp from '../../LoadingCmp';

export default function SchedulesByClassroom() {
    const [loading, setLoading] = useState(true);
    const [itemsList, setItemsList] = useState([]);
    const classrooms = useLiveQuery(
      () => db.classrooms.toArray()
    );
      useEffect(() => {

        if(classrooms){
          setItemsList(classrooms)
          setLoading(false)
         }

      }, [classrooms])

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
                  <h5 className="mb-3 mb-md-0">teachers ({itemsList.length})</h5>
              </div>
              </div>
          </div>
          <div className="p-0 card-body">
            <div className="mx-0 row">
                <div className="py-2 col-5">nom de la salle</div>
                <div className="py-2 col-3 text-center">Remarque</div>
                <div className="py-2 col-2 text-center">Status</div>
            </div>
                                {itemsList.map((item,idx)=>{
                                    return (
            <div className="mx-0 border-bottom border-200 row" key={idx}>
                <div className="col-5">
                <Link className='text-decoration-none' to={`/schedules/schedules-by-classroom/${item.id}`}>
                              <h5 className="text-dark m-0"><strong>{item.name}</strong></h5>
                              </Link>
                </div>
                <div className="py-3 col-3 d-flex align-items-center justify-content-center">

                           {item.remark}

                </div>
                <div className="py-3 col-2 d-flex align-items-center justify-content-center">

                            {item.status == 1 ? "disponible" : "non disponible"}

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
         </div>
     </div>
       <div className='card-body py-5 text-center'>
       <h4>Il ya aucune Salle !</h4>
       </div>
     </div>
      }
     return(
  <div>
<div className='text-secondary'><Link className='text-decoration-none text-secondary' to="/home"><FontAwesomeIcon className='text-secondary' icon="fas fa-home" /> Home</Link> {'>>'} <Link className='text-decoration-none text-secondary' to="/schedules"> Emplois </Link> {'>>'} emploie par salle </div>
  <div className='container p-0 p-sm-1 p-md-2 p-lg-4 p-xl-5'>
              {itemsHtml}
              </div>
  </div>
     )
}
