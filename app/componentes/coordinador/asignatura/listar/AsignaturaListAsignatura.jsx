import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faSearch } from "@fortawesome/free-solid-svg-icons";
import DataTable from 'react-data-table-component';
import "react-datepicker/dist/react-datepicker.css";


export default function Index({cargando, listaAsignaturas ,handleAsignaturaChange, handleChange, handleSubmit, formData, estado}) {

    const [search, setSearch] = useState('');
   
    const columnas = [
        {
            name: 'ID',
            selector: (row) => row.id,
            sortable: true,
            width: '80px',
        },
        {
            name: 'Nombre',
            selector: (row) => row.nombre,
            sortable: true,
        }
    ];

    const handleDateChange = (date) => {
        handleChange({
            target: {
                name: 'Horario',
                value: date //format(date, 'yyyy-MM-dd')
            }
        });
    };

    function Loader() {
        return <div className='text-center'><FontAwesomeIcon icon={faSpinner} spin /></div>
    }

    const tableHeaderstyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "#ccc"
            },
        },
    }

    return (
        <div className="container-xl px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h3 className="fw-light">Asignaturas</h3>
                </div>
                <div className="card-body" style={{ position: 'relative' }}>
                    <DataTable
                        columns={columnas}
                        data={listaAsignaturas}
                        progressPending={cargando}
                        progressComponent={<Loader />}
                        noHeader
                        pagination
                        customStyles={tableHeaderstyle}
                    />
                    <a 
                        href="/privado/Coordinador/Asignatura/Listar" 
                        className="btn btn-link" 
                        style={{ position: 'absolute', left: '10px', bottom: '10px' }}>
                            Volver
                    </a>
                </div>
            </div>
        </div>
    );
}