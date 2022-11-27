/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'react-router-dom';
import { db } from 'renderer/db';
import LoadingCmp from '../LoadingCmp';
import AddClassModal from './AddClassModal';
import EditClassModal from './EditClassModal';

export default function Classes() {
  const [toEdit, setToEdit] = useState({});
  const [loading, setLoading] = useState(true);
  const [itemsList, setItemsList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  function findClassName(id) {
    return itemsList.map((item) => {
      if(item.id == id)
      return item.name
    })
  }

  const classes = useLiveQuery(
    () => db.classes.toArray()
  );

  useEffect(() => {
    if(classes){
   setItemsList(classes)
   setLoading(false)
  }

  }, [classes]);

  const deleteItem = (e, item) => {
    e.preventDefault();

    Swal.fire({
      title: 'Supprimée la classe',
      text: `Etes-vous sûr que vous voulez supprimer ${item.name} ?`,
      showDenyButton: true,
      confirmButtonText: 'Supprimer',
      denyButtonText: `Annuler`,
      confirmButtonColor: '#df4759',
      denyButtonColor: '#d9e2ef',
    }).then((result) => {
      if (result.isConfirmed) {
db.classes.delete(item.id)
Swal.fire("Succès","Classe Supprimée avec succès","success");

      } else if (result.isDenied) {
      }
    });
  };
  if (loading) {
    return <LoadingCmp />;
  }
  let itemsHtml = '';
  if (itemsList.length > 0) {
    itemsHtml = (
      <>
        <div className="card shadow">
          <div className="card-header">
            <div className="justify-content-between row">
              <div className="col-md-auto">
                <h5 className="mb-3 mb-md-0">Classes ({itemsList.length})</h5>
              </div>
              <div className="col-md-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setModalShow(true);
                  }}
                >
                  Ajouter Classe
                </button>
              </div>
            </div>
          </div>
          <div className="p-0 card-body">
            <div className="mx-0 row">
              <div className="py-2 col-3">Nom</div>
              <div className="py-2 col-3 text-center">Classe 1</div>
              <div className="py-2 col-3 text-center">Classe 2</div>
              <div className="py-2 col-3 text-center">Actions</div>
            </div>
            {itemsList.map((item, idx) => {
              return (
                <div className="mx-0 border-bottom border-200 row" key={idx}>
                  <div className="col-3 d-flex align-items-center">
                    <h5 className="text-dark m-0">
                      <strong>{item.name}</strong>
                    </h5>
                  </div>
                  <div className="py-3 col-3 text-center">
                    {item.class_1_id ? findClassName(item.class_1_id) : ''}
                  </div>
                  <div className="py-3 col-3 text-center">
                    {item.class_2_id ? findClassName(item.class_2_id) : ''}
                  </div>
                  <div className="py-3 col-3 text-center">
                    <div className="row">
                      <div className="col-6">
                        <button
                          type="button"
                          className="btn p-0"
                          onClick={(e) => deleteItem(e, item)}
                        >
                          <FontAwesomeIcon className='text-danger' size='lg' icon="fas fa-trash" />
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          type="button"
                          className="btn p-0"
                          onClick={() => {
                            setToEdit(item);
                            setEditModalShow(true);
                          }}
                        >
                          <FontAwesomeIcon className='text-primary' size='lg' icon="fas fa-edit" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  } else {
    itemsHtml = (
      <div className="card shadow">
        <div className="card-header">
          <div className="justify-content-between row">
            <div className="col-md-auto">
              <h5 className="mb-3 mb-md-0">Classes ({itemsList.length})</h5>
            </div>
            <div className="col-md-auto">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setModalShow(true);
                }}
              >
                Ajouter Classe
              </button>
            </div>
          </div>
        </div>
        <div className="card-body py-5 text-center">
          <h4>Il ya aucune classe !</h4>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className='text-secondary'><Link className='text-decoration-none text-secondary' to="/home"><FontAwesomeIcon className='text-secondary' icon="fas fa-home" /> Home</Link> {'>>'} Classes</div>
      <div className="container p-0 p-sm-1 p-md-2 p-lg-4 p-xl-5">
        <AddClassModal
          show={modalShow}
          onHide={() => {
            setModalShow(
              false
            );
          }}
        />
        <EditClassModal
          toedit={toEdit}
          show={editModalShow}
          onHide={() => {
            setEditModalShow(
              false
            );
          }}
        />
        {itemsHtml}
      </div>
    </div>
  );
}
