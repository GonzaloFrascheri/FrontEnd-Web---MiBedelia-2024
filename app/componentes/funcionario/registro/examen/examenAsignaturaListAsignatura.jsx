// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {  } from '@fortawesome/free-solid-svg-icons';

export default function Index({listaAsignaturas, handleAsignaturaChange, handleChange, handleSubmit, formData}) {

    return (
        <div className="container-xl px-4">
            <div className="card">
                <div className="card shadow-lg border-0 rounded-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="card-header justify-content-center">
                            <h3 className="fw-light">Registro de un exámen relacionado a una asignatura</h3>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="listaAsignatura">Lista de asignaturas</label>
                                <select 
                                    className="form-control" 
                                    id="listaAsignatura"
                                    onChange={handleAsignaturaChange}
                                >
                                    {listaAsignaturas.length > 0 ? (
                                        listaAsignaturas.map((asignatura) => (
                                            <option key={asignatura.id} value={asignatura.id}>{asignatura.nombre}</option>
                                        ))
                                    ) : (
                                        <option>No se recibieron datos aún</option>
                                    )}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="codigo" className="form-label">Fecha exámen:</label>
                                <input
                                type="date"
                                id="fechaExamen"
                                name="fechaExamen"
                                value={formData.fechaExamen}
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
                                className="btn btn-primary">Crear exámen</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}