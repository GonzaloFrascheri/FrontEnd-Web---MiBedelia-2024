// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {  } from '@fortawesome/free-solid-svg-icons';

export default function Index({estado, formData, handleChange, handleSubmit}) {

    return (
        <div className="container-xl px-4 mt-n10">
            <div className="card">
                <div className="card shadow-lg border-0 rounded-lg">
                    {estado.message === '' ? (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="card-header justify-content-center">
                                <h3 className="fw-light">Registar horario en asignatura</h3>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="codigo" className="form-label">Asignatura:</label>
                                    <input
                                    type="text"
                                    id="asignatura"
                                    name="asignatura"
                                    value={formData.asignatura}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="codigo" className="form-label">Horario de inicio:</label>
                                    <input
                                    type="date"
                                    id="horainicio"
                                    name="horainicio"
                                    value={formData.horainicio}
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
                                    className="btn btn-primary">Registrar</button>
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