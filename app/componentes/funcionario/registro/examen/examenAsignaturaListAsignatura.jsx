import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";

export default function Index({listaAsignaturas, handleAsignaturaChange, handleChange, handleSubmit, periodoActivo, formData}) {
    const periodoInicio = formatFecha(periodoActivo.diaInicio);
    const periodoFin = formatFecha(periodoActivo.diaFin);

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

    return (
        <div className="container-xl px-4">
            <div className="card">
                <div className="card shadow-lg border-0 rounded-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="card-header justify-content-center">
                            <h3 className="fw-light">Registro de un exámen relacionado a una asignatura</h3>
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
                                            minDate={periodoInicio}
                                            maxDate={periodoFin}
                                            className="form-control w-100"
                                            required
                                        />
                                    </div>
                                </div>
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
                                className="btn btn-primary">Crear exámen</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}