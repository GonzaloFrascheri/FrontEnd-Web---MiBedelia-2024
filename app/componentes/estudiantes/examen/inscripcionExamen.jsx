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
                                <h3 className="fw-light">Inscripción a Exámen</h3>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Año Electivo:</label>
                                    <input
                                    type="number"
                                    id="año"
                                    name="año"
                                    value={formData.año}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                    min="2000"
                                    max="2024"
                                    
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Fecha Inscripción:</label>
                                    <input
                                    type="Date"
                                    id="inscripcion"
                                    name="inscripcion"
                                    value={formData.inscripcion}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Resultado:</label>
                                    <input
                                    type="text"
                                    id="resultado"
                                    name="resultado"
                                    value={formData.resultado}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="codigo" className="form-label">Finalizado:</label>
                                    <input
                                    type="text"
                                    id="finalizado"
                                    name="finalizado"
                                    value={formData.finalizado}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                    />
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary">Guardar</button>
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