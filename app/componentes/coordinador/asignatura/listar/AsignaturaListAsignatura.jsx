import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faSearch } from "@fortawesome/free-solid-svg-icons";
import DataTable from 'react-data-table-component';
import "react-datepicker/dist/react-datepicker.css";


export default function Index({listaAsignaturas ,handleAsignaturaChange, handleChange, handleSubmit, formData, estado}) {

    const [search, setSearch] = useState('');
    /*
    const columnas = [
        {
            name: 'id',
            selector: (row) => row.id,
            sortable: true,
            width: '80px',
        },
        {
            name: 'ci',
            selector: (row) => row.ci,
            sortable: true,
        },
        {
            name: 'nombre',
            selector: (row) => row.nombre,
            sortable: true,
        },
        {
            name: 'apellido',
            selector: (row) => row.apellido,
            sortable: true,
        }
    ];
    */

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
            <div className="card">
                <div className="card shadow-lg border-0 rounded-lg">
                        <div className="card-header justify-content-center">
                            <h3 className="fw-light">Listar asignatura por carrera</h3>
                        </div>
                        {estado.message === '' ? (
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="listaAsignatura">Lista de asignaturas</label>
                                                    <select
                                                        className="form-control"
                                                        id="listaAsignatura"
                                                        onChange={handleAsignaturaChange}
                                                    >
                                                        <option value="" disabled selected>Seleccione una asignatura</option>
                                                        {listaAsignaturas.length > 0 ? (
                                                            listaAsignaturas.map((asignatura) => (
                                                                <option key={asignatura.id} value={asignatura.id}>{asignatura.nombre}</option>
                                                            ))
                                                        ) : (
                                                            <option>No se recibieron datos aún</option>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer text-center">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary">Listar</button>
                                    </div>
                                </form>
                            ) : (
                                    <div className="card-body">
                                        <div className={`alert alert-icon m-2 ${estado.estado === 200 ? "alert-primary" : "alert-secondary"}`} role="alert">
                                            <div className="alert-icon-aside">
                                                <i className="far fa-flag"></i>
                                            </div>
                                            <div className="alert-icon-content">
                                                <h6 className="alert-heading">Resultado</h6>
                                                    {estado.message}!
                                            </div>
                                        </div>
                                    </div>
                                )
                        }          
                </div>
            </div>
        </div>
    );
}