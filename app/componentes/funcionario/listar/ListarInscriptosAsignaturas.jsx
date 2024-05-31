import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faSearch } from "@fortawesome/free-solid-svg-icons";
import DataTable from 'react-data-table-component';
import "react-datepicker/dist/react-datepicker.css";
import axios from '@/utils/axios';

export default function ListarInscriptosAsignaturas({ listaAsignaturas, handleAsignaturaChange, handleChange, estado, formData }) {
    
    const [listaAniosElectivos, setListaAniosElectivos] = useState([]); // Estado para almacenar la lista de años electivos
    const [selectedAnioElectivo, setSelectedAnioElectivo] = useState(""); // Estado para almacenar el año electivo seleccionado

    const columnas = [
        { name: 'ID', selector: (row) => row.id, sortable: true, width: '80px' },
        { name: 'Nombre', selector: (row) => row.nombre, sortable: true }
    ];

    const handleAnioElectivoChange = (event) => {
        setSelectedAnioElectivo(event.target.value);
    };

    const handleHorarioDetalle = async () => {
        // Llama al endpoint para obtener los detalles del horario
        try {
            // Supongamos que necesitas enviar tanto el ID de la asignatura como el año electivo seleccionado
            const response = await axios.get(`listarHorariosAsignaturaPaginado?idAsignatura=${selectedAsignaturaId}&anioLectivo=${selectedAnioElectivo}`);
            console.log(response.data); // Aquí puedes manejar la respuesta del endpoint
        } catch (error) {
            console.error('Error fetching detalles del horario:', error);
        }
    };

    function Loader() {
        return <div className='text-center'><FontAwesomeIcon icon={faSpinner} spin /></div>;
    }

    return (
        <div className="container-xl px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h3 className="fw-light">Asignaturas</h3>
                </div>
                <div className="card-body" style={{ position: 'relative' }}>
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
                    <div>
                        <label htmlFor="listaAniosElectivos">Años Electivos:</label>
                        <select
                            id="listaAniosElectivos"
                            className="form-control"
                            onChange={handleAnioElectivoChange}
                            value={selectedAnioElectivo}
                        >
                            <option value="" disabled>Seleccione un año electivo</option>
                            {listaAniosElectivos.map((anio) => (
                                <option key={anio.id} value={anio.id}>{anio.nombre}</option>
                            ))}
                        </select>
                        <button onClick={handleHorarioDetalle} className="btn btn-primary mt-2">Ver Detalles del Horario</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
