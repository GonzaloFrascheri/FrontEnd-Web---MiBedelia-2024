import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default function Index({estado, handleChange, handleSubmit, docenteDto}) {

    return (
        <div className="conatiner-xl px-4 mt-n10">
            <div className="card">
                <div className="card shadow-lg border-0 rounded-lg">
                    <div className="card-header justify-content-center">
                        <h3 className="fw-light">Alta Docente</h3>
                    </div>
                    {estado.message === '' ? (
                            <form onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className="row gx-3">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="text-gray-600 small">Cedula</label>
                                                <input
                                                    className="form-control form-control-solid"
                                                    name="ci"
                                                    type="number"
                                                    placeholder="Cedula"
                                                    maxLength="8"
                                                    value={docenteDto.ci}
                                                    onChange={handleChange} required
                                                />
                                                {docenteDto.ci === "" && (
                                                    <span className="text-danger text-xs">Este campo es requerido</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row gx-3">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="small mb-1">Nombre</label>
                                                <input 
                                                    className="form-control" 
                                                    name="nombre" 
                                                    type="text" 
                                                    id="nombre" 
                                                    onChange={handleChange} required
                                                />
                                                {docenteDto.nombre === "" && (
                                                    <span className="text-danger text-xs">Este campo es requerido</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="small mb-1" >Apellido</label>
                                                <input 
                                                    className="form-control"
                                                    name="apellido"
                                                    type="text"
                                                    id="apellido"
                                                    onChange={handleChange} required
                                                />
                                                {docenteDto.apellido === "" && (
                                                    <span className="text-danger text-xs">Este campo es requerido</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer text-center">
                                    <button 
                                        className="btn btn-primary"
                                        type="submit">Alta Docente</button>
                                </div>
                            </form>
                    ) : (
                        <div>
                        <div className={`alert alert-icon m-2 ${estado.estado === 200 ? "alert-primary" : "alert-secondary"}`} role="alert">
                            <div className="alert-icon-aside">
                                <i className="far fa-flag"></i>
                            </div>
                            <div className="alert-icon-content">
                                <h6 className="alert-heading">Resultado</h6>
                                {estado.message}
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