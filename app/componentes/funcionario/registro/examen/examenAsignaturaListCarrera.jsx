// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {  } from '@fortawesome/free-solid-svg-icons';

export default function Index({estado, formData, handleChange, handleSubmit, listaCarrera, listaAsignaturas}) {

    return (
        <div className="container-xl px-4">
            <div className="card">
                <div className="card shadow-lg border-0 rounded-lg">
                    {estado.message === '' ? (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="card-header justify-content-center">
                                <h3 className="fw-light">Registro de un exámen relacionado a una asignatura</h3>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="listaDeCarrera">Lista de carreras</label>
                                    <select 
                                        className="form-control" 
                                        id="listaDeCarrera"
                                        onChange={handleChange}
                                    >
                                        {listaCarrera.length > 0 ? (
                                            listaCarrera.map((carrera) => (
                                                <option key={carrera.id} value={carrera.id}>{carrera.nombre}</option>
                                            ))
                                        ) : (
                                            <option>No se recibieron datos aún</option>
                                        )}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="listaDeCarrera">Lista de asignaturas</label>
                                    <select 
                                        className="form-control" 
                                        id="listaDeCarrera"
                                        onChange={handleChange}
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
                                    id="fechaexamen"
                                    name="fechaexamen"
                                    value={formData.fechaexamen}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="codigo" className="form-label">Docente:</label>
                                    <input
                                    type="text"
                                    id="docente"
                                    name="docente"
                                    value={formData.docente}
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
                        </>
                    ) : (
                        <div>
                            <div className={'alert alert-icon ${estado.estado === 200 ? "alert-primary" : "alert-secondary"}'} role="alert">
                                <button className="btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
                                <div className="alert-icon-aside">
                                    <i className="far fa-flag"></i>
                                </div>
                                <div className="alert-icon-content">
                                    <h6 className="alert-heading">Resultado</h6>
                                    {estado.message}!
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <div className="small"><a href="/privado">Volver al inicio</a></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

}