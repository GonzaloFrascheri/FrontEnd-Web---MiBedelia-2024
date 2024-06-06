import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faSearch } from "@fortawesome/free-solid-svg-icons";
import DataTable from 'react-data-table-component';
import "react-datepicker/dist/react-datepicker.css";
import axios from '@/utils/axios';

export default function ListarInscriptosAsignaturas({ listaAsignaturas, handleAsignaturaChange, handleChange, estado, formData }) {
    
    const [selectedAsignaturaId, setSelectedAsignaturaId] = useState('');
    const [horarios, setHorarios] = useState([]); // Para almacenar los horarios
    const [selectedHorario, setSelectedHorario] = useState(null);
    const [estudiantesInscriptos, setEstudiantesInscriptos] = useState([]);

    const columnas = [
        { name: 'ID', selector: (row) => row.id, sortable: true, width: '80px' },
        { name: 'Nombre', selector: (row) => row.nombre, sortable: true }
    ];

    useEffect(() => {
        if(selectedAsignaturaId){
            fetchHorariosAsignatura(selectedAsignaturaId);
        }else{
            setHorarios([]);
        }
    }, [selectedAsignaturaId]);

    const fetchHorariosAsignatura = async (asignaturaId) => {
        try{
            const response = await axios.get(`/Funcionario/listarHorariosAsignatura?idAsignatura=${asignaturaId}`)
            setHorarios(response.data);
        }catch(error){
            console.error('Error en el fetching detalles del horario', error);
            setHorarios([]);
        }
    };

    const handleHorarioSeleccionado = async (horario) => {
        setSelectedHorario(horario);
        try {
            const response = await axios.get(`/Funcionario/listarAlumnosHorario?idHorario=${idHorario}`);
            setEstudiantesInscriptos(response.data);
        } catch (error) {
            console.error('Error fetching estudiantes inscriptos:', error);
            setEstudiantesInscriptos([]);
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
                            onChange={(e) => {
                                setSelectedAsignaturaId(e.target.value); // Actualiza el estado selectedAsignaturaId
                                handleAsignaturaChange(e);
                                setSelectedHorario(null);
                                setEstudiantesInscriptos();
                            }}
                        >
                            <option value="" disabled defaultValue>Seleccione una asignatura</option>
                            {listaAsignaturas.length > 0 ? (
                                listaAsignaturas.map((asignatura) => (
                                    <option key={asignatura.id} value={asignatura.id}>{asignatura.nombre}</option>
                                ))
                            ) : (
                                <option disabled>No se recibieron datos aún</option>
                            )}
                        </select>
                    </div>
                </div>
            </div>
            {horarios.length > 0 ? (
                <div className="card mt-4">
                    <div className="card-header">
                        <h3 className="fw-light">Horarios de la Asignatura</h3>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Días Dictados</th>
                                    <th>Nombre Docente</th>
                                    <th>Inicio Semestre</th>
                                    <th>Fin Semestre</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {horarios.map((horario, index) => (
                                    <tr key={index}>
                                        <td>{horario.diasDictados.join(', ')}</td>
                                        <td>{horario.nombreDocente}</td>
                                        <td>{horario.inicioSemestre}</td>
                                        <td>{horario.finSemestre}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => handleHorarioSeleccionado(horario)}>Seleccionar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : selectedAsignaturaId && (
                <div className="alert alert-warning mt-4" role="alert">
                    No se encontraron horarios para la asignatura seleccionada.
                </div>
            )}
            {selectedHorario && (
                <div className="card mt-4">
                    <div className="card-header">
                        <h3 className="fw-light">Estudiantes Inscriptos</h3>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    <th>Telefono</th>
                                    <th>CI</th>
                                    <th>Inicio Semestre</th>
                                    <th>Fin Semestre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {estudiantesInscriptos.map((estudiante, index) => (
                                    <tr key={index}>
                                        <td>{estudiante.nombre}</td>
                                        <td>{estudiante.apellido}</td>
                                        <td>{estudiante.email}</td>
                                        <td>{estudiante.telefono}</td>
                                        <td>{estudiante.ci}</td>
                                        <td>{estudiante.inicioSemestre}</td>
                                        <td>{estudiante.finSemestre}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
