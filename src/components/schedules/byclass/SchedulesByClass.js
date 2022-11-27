import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { db } from 'renderer/db';
import LoadingCmp from '../../LoadingCmp';

export default function SchedulesByClass() {
    const [loading, setLoading] = useState(true);
    const [itemsList, setItemsList] = useState([]);
    const classes = useLiveQuery(
      () => db.classes.toArray()
    );
      useEffect(() => {

        if(classes){
          setItemsList(classes)
          setLoading(false)
         }

      }, [classes])

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
                  <h5 className="mb-3 mb-md-0">Classes ({itemsList.length})</h5>
              </div>
              </div>
          </div>
          <div className="p-0 card-body">
              <div className="mx-0 row">
                  <div className="py-2 col-12">Nom de la classe</div>
              </div>
                                  {itemsList.map((item,idx)=>{
                                      return (
              <div className="p-2 mx-0 border-bottom border-200 row" key={idx}>
                  <div className="col-12">
                    <Link className='text-decoration-none' to={`/schedules/schedules-by-class/${item.id}`}>
                              <h5 className="text-dark m-0"><strong>{item.name}</strong></h5>
                              </Link>
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
             <h5 className="mb-3 mb-md-0">Classes ({itemsList.length})</h5>
         </div>
         </div>
     </div>
       <div className='card-body py-5 text-center'>
       <h4>Il ya aucune classe !</h4>
       </div>
     </div>
      }
     return(
  <div>
    <div className='text-secondary'><Link className='text-decoration-none text-secondary' to="/home"><FontAwesomeIcon className='text-secondary' icon="fas fa-home" /> Home</Link> {'>>'} <Link className='text-decoration-none text-secondary' to="/schedules"> Emplois </Link> {'>>'} emploie par classe </div>
  <div className='container p-0 p-sm-1 p-md-2 p-lg-4 p-xl-5'>
              {itemsHtml}
              </div>
  </div>
     )
}
