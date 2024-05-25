import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faSearch } from "@fortawesome/free-solid-svg-icons";
import DataTable from 'react-data-table-component';

export default function Index({ listaAsignaturas, handleAsignaturaChange, handleChange, handleSubmit, periodoActivo, listaDocentes, formData, estado }) {
    const periodoInicio = formatFecha(periodoActivo.diaInicio);
    const periodoFin = formatFecha(periodoActivo.diaFin);
    const [selectedDocente, setSelectedDocente] = useState({
        id: null,
        ci: "",
        nombre: "Debe seleccionar un docente",
        apellido: ""
    });
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(listaDocentes);
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

    useEffect(() => {
        const result = listaDocentes.filter((item) => {
            return item.apellido ? item.apellido.toLowerCase().includes(search.toLowerCase()) : false;
        });
        setFilter(result);
    }, [search, listaDocentes]);

    const handleSelectDocente = (docente) => {
        setSelectedDocente(docente);
        formData.idDocente = docente.id;
        // Cerrar el modal
        document.querySelector('#docenteModal .btn-close').click();
    };

    function formatFecha(fecha) {
        const date = new Date(fecha);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses son indexados desde 0
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleDateChange = (date) => {
        handleChange({
            target: {
                name: 'fechaExamen',
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
                        <h3 className="fw-light">Registro de un exámen relacionado a una asignatura</h3>
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
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="fechaExamen"
                                                className="form-label col-md-12 mb-0">
                                                Fecha exámen:
                                                <span className="badge bg-primary text-white ms-5">
                                                    Inicio: {periodoInicio} - Fin {periodoFin}
                                                </span>
                                            </label>
                                            <DatePicker
                                                id="fechaExamen"
                                                selected={formData.fechaExamen}
                                                onChange={handleDateChange}
                                                dateFormat="yyyy-MM-dd"
                                                minDate={new Date(periodoInicio)}
                                                maxDate={new Date(periodoFin)}
                                                className="form-control w-100"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label htmlFor="codigo" className="form-label">Docente:</label>
                                            <div className="input-group input-group-joined">
                                                <input
                                                    type="text"
                                                    id="idDocente"
                                                    name="idDocenteDatos"
                                                    value={"[ " + selectedDocente.id + " ] " + selectedDocente.nombre + " " + selectedDocente.apellido + " ( " + selectedDocente.ci + " )"}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    disabled
                                                    required
                                                />
                                                <span className="input-group-text">
                                                    <FontAwesomeIcon
                                                        icon={faSearch}
                                                        data-bs-toggle="modal" data-bs-target="#docenteModal"
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary">Crear exámen</button>
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

                    <div className="modal fade" id="docenteModal" role="dialog" aria-labelledby="docenteModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="docenteModalLabel">Seleccione un Docente para el examen</h5>
                                    <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="popup">
                                        <DataTable
                                            customStyles={tableHeaderstyle}
                                            columns={columnas}
                                            data={filter}
                                            pagination
                                            fixedHeader
                                            highlightOnHover
                                            subHeader
                                            subHeaderComponent={
                                                <input type="text"
                                                    className="w-25 form-control"
                                                    placeholder="Buscar por apellido..."
                                                    value={search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                />
                                            }
                                            subHeaderAlign="right"
                                            progressComponent={<Loader />}
                                            onRowClicked={handleSelectDocente}
                                        />
                                    </div>
                                    <div className="modal-footer"><button className="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
