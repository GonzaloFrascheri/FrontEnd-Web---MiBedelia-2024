import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

export default function ListarExamenesInfo ({
    listaExamen,
    handleChangeExamen,
    listasInfo,
    formData
}) {
    return (
        <div className="container-xl px-4">
            <div className="card">
                <div className="card shadow-lg border-0 rounded-lg">
                    <div className="card-header d-flex align-items-center justify-content-between">
                        <h3 className="fw-light">
                            {listasInfo.cu} | Elegir un Examen
                            <span className="badge bg-primary text-white ms-5">carrera seleccionada: <b>{formData.nombreCarrera}</b></span>
                        </h3>
                        <div className="small">
                            <a href="/privado/Funcionario/Generar/ActaExamen">Volver</a>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="listaDeExamenes">Lista de Examenes</label>
                            <select 
                                className="form-control" 
                                id="listaDeExamenes"
                                onChange={handleChangeExamen}
                            >
                                <option value="" disabled selected>Seleccione un examen...</option>
                                {listaExamen.length > 0 ? (
                                    listaExamen.map((examen) => (
                                        <option key={examen.id} value={examen.id}>{examen.nombreAsignatura} - {examen.nombreDocente}</option>
                                    ))
                                ) : (
                                    <option>No se recibieron datos aún</option>
                                )}
                            </select>
                        </div>
                        <div className="card card-icon">
                            <div className="row no-gutters">
                                <div className="col-auto card-icon-aside bg-primary text-white">
                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                </div>
                                <div className="col">
                                    <div className="card-body py-5">
                                        <h5 className="card-title">{listasInfo.tituloInfo}</h5>
                                        <p className="card-text">{listasInfo.mensajeInfo}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}