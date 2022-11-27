/* eslint-disable func-names */
/* eslint-disable promise/no-nesting */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React,{useState} from 'react'
import IDBExportImport from 'indexeddb-export-import'
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db } from 'renderer/db';

export default function Export() {
  const [file, setFile] = useState();

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
      setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
      e.preventDefault();

      if (file) {
          fileReader.onload = function (event) {
              const csvOutput = event.target.result;
              Swal.fire({
                title: 'Importer une base de données',
                text: `Etes-vous sûr que vous voulez importer cette base données ? tous les données actuelles seront supprimées !`,
                showDenyButton: true,
                confirmButtonText: 'Importer',
                denyButtonText: `Annuler`,
                confirmButtonColor: '#df4759',
                denyButtonColor: '#d9e2ef',
              }).then((result) => {
                if (result.isConfirmed) {
                  db.open().then(function() {
                    const idbDatabase = db.backendDB(); // get native IDBDatabase object from Dexie wrapper
                    // export to JSON, clear database, and import from JSON
                    IDBExportImport.clearDatabase(idbDatabase, function(err) {
                      if (!err) { // cleared data successfully
                        IDBExportImport.importFromJsonString(idbDatabase, JSON.parse(csvOutput), function(err) {
                          if (!err) {
                            Swal.fire("Succès",'Données importées avec succès',"success");
                          }
                        });
                      }
                    });
                  }).catch(function(e) {
                    Swal.fire("Erreur",`Could not connect. ${  e}`,"error");
                  });

                } else if (result.isDenied) {
                }
              });

          };

          fileReader.readAsText(file);
      }
  };

  const indexedDb = db.backendDB()

  const saveFile = (data) => {
    const fileData = JSON.stringify(data);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'andalus-emplois.json';
    link.href = url;
    link.click();
  };

  const ex = ()=>{
    db.open().then(function() {
      const idbDatabase = db.backendDB(); // get native IDBDatabase object from Dexie wrapper
      // export to JSON, clear database, and import from JSON
      IDBExportImport.exportToJsonString(idbDatabase, function(err, jsonString) {
        if (err) {
          console.error(err);
        } else {
          saveFile(jsonString)
        }
      });
    }).catch(function(e) {
      Swal.fire("Erreur",`Could not connect. ${  e}`,"error")
    });
  }

  return (
    <div className=' container row pt-5'>
<div className='col-6 text-center mb-4'> <form>
                <input
                className="form-control mb-4"
                    type="file"
                    id="csvFileInput"
                    accept=".json"
                    onChange={handleOnChange}
                />
            </form></div>
<div className='col-6 text-center mb-4'><div className='card shadow p-4' role="button" onClick={ex}><h1><FontAwesomeIcon icon="fas fa-download"/> Exporter</h1></div></div>
       <div className='col-6 text-center'>
       <div className='card shadow p-4' role="button" onClick={(e) => {handleOnSubmit(e);}}><h1><FontAwesomeIcon icon="fas fa-upload" /> Importer</h1></div>
        </div>
    </div>
  )
}
