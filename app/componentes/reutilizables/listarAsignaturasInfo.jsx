import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

export default function ListAsignaturaInfo({
    listaAsignatura,
    handleAsignaturaChange,
    listasInfo,
    formData
}) {
    //console.info('listaAsignatura:', listaAsignatura)
    return (
    <div className="container-xl px-4">
        <div className="card">
            <div className="card shadow-lg border-0 rounded-lg">
                <div className="card-header justify-content-center">
                    <h3 className="fw-light">
                        {listasInfo.cu} | Elegir Asignatura <span className="badge bg-primary text-white ms-5">carrera seleccionada: <b>{formData.nombreCarrera}</b></span>
                    </h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label htmlFor="listaAsignatura">
                                    Lista de asignaturas
                                </label>
                                <select
                                    className="form-control"
                                    id="listaAsignatura"
                                    selected={formData?.idAsignatura || ""}
                                    onChange={handleAsignaturaChange}
                                    >
                                    <option value="" disabled selected>
                                        Seleccione una asignatura
                                    </option>
                                    {listaAsignatura.length > 0 ? (
                                        listaAsignatura.map((asignatura) => (
                                            <option
                                                key={asignatura.id}
                                                value={asignatura.id}>
                                                [ {asignatura.gradoSemestre} ] {asignatura.nombre}
                                            </option>
                                        ))
                                    ) : (
                                        <option>No se recibieron datos aún</option>
                                    )}
                                </select>
                            </div>
                        </div>
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
