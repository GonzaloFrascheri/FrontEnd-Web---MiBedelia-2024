import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import { format, parseISO } from "date-fns";

export default function Index({listaAsignaturas, handleAsignaturaChange, handleChange, handleSubmit, formData}) {

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
                name: 'Horario',
                value: date //format(date, 'yyyy-MM-dd')
            }
        });
    };

    return (
        <div className="container-xl px-4">
            <div className="card">
                <div className="card shadow-lg border-0 rounded-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="card-header justify-content-center">
                            <h3 className="fw-light">Registro horario de una asignatura</h3>
                        </div>
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
                                            {listaAsignaturas.length > 0 ? (
                                                listaAsignaturas.map((asignatura) => (
                                                    <option key={asignatura.idCarrera} value={asignatura.idCarrera}>{asignatura.nombre}</option>
                                                ))
                                            ) : (
                                                <option>No se recibieron datos aún</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gradoMateria" className="form-label">Semestre:</label>
                                <input
                                    type="number"
                                    id="gradoMateria"
                                    name="gradoMateria"
                                    value={formData.gradoMateria}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="horainicio" className="form-label">Hora inicio:</label>
                                <input
                                    type="text" 
                                    id="horainicio"
                                    name="horainicio"
                                    value={formData.horainicio}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="horafin" className="form-label">Hora fin:</label>
                                <input
                                    type="text" 
                                    id="horafin"
                                    name="horafin"
                                    value={formData.horafin}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="codigo" className="form-label">Docente:</label>
                                <input
                                type="text"
                                id="idDocente"
                                name="idDocente"
                                value={formData.idDocente}
                                onChange={handleChange}
                                className="form-control"
                                required
                                />
                            </div>
                        </div>
                        <div className="card-footer text-center">
                            <button 
                                type="submit" 
                                className="btn btn-primary">Crear horario</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}