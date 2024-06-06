import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function ListarPreviasInfo({
    listaAsignatura,
    detalleAsignatura,
    listasInfo,
    formData
}) {
    console.info("ListarPreviasInfo", detalleAsignatura);
    return (
        <div className="container-xl">
            <div className="card shadow-lg border-0 rounded-lg">
                <div className="card-header justify-content-center">
                    <h3 className="fw-light">
                        {listasInfo.cu} | Lista de Previas para: <span className="badge bg-primary text-white ms-5">{formData.nombreAsignatura}</span>
                    </h3>
                </div>
                <div className="card-body">
                    <div className="container-fluid px-4">
                        <div className="card bg-gradient-primary-to-secondary mb-4">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    {detalleAsignatura.horarios && detalleAsignatura.horarios.length >= 0 ? (
                                        detalleAsignatura.horarios.map((horario, index) => (
                                            <>
                                                <div key={index} className="mb-3">
                                                    <div className="small text-white-50">
                                                        <strong>Horario:</strong> {horario.horarioInicio} - {horario.horarioFin}
                                                    </div>
                                                    <div className="h1 text-white">
                                                        <strong>Docente:</strong> {horario.nombreDocente} ({horario.ciDocente})
                                                    </div>
                                                </div>
                                                <div className="text-white">
                                                    <p><strong>Días Dictados:</strong> {horario.diasDictados !== null ? (
                                                        horario.diasDictados.join(", ")
                                                    ) : (
                                                        "No especificado"
                                                    )}</p>
                                                    <strong>Semestre:</strong> {horario.tipoSemestre} ({new Date(horario.inicioSemestre).toLocaleDateString()} - {new Date(horario.finSemestre).toLocaleDateString()})
                                                </div>
                                            </>
                                        ))
                                    ) : (
                                        <div className="me-3">
                                            <div className="h1 text-white">No hay horarios asignados.</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid mb-4">
                        <div className="row gx-4">
                            <div className="col-lg-7">
                                <div className="card mb-4">
                                    <div className="card-header">Detalles de previas</div>
                                    <div className="card-body">
                                        {detalleAsignatura.previaturas && detalleAsignatura.previaturas.length > 0 ? (
                                            <div>
                                                <h4>Lista de Previaturas</h4>
                                                <ul className="list-group">
                                                    {detalleAsignatura.previaturas.map((previatura, index) => (
                                                        <li key={index} className="list-group-item">
                                                            <p>
                                                                <strong>Nombre:</strong> {previatura.nombrePrev}
                                                                <strong>Requisito:</strong> {previatura.requisito}
                                                            </p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <p>No hay previaturas asignadas.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="card card-header-actions">
                                    <div className="card-header">
                                        Agregar previas
                                    </div>
                                    <div className="card-body p-0">
                                        <ul className="list-group list-group-flush">
                                            {listaAsignatura.length > 0 ? (
                                                listaAsignatura.map((asignatura) => (
                                                    <li
                                                        key={asignatura.id}
                                                        className="list-group-item"
                                                    >
                                                        {asignatura.id === formData.idAsignatura ? (
                                                            <FontAwesomeIcon icon={faCheckCircle} className="text-danger text-xs me-2" />
                                                        ) : (
                                                            <FontAwesomeIcon icon={faCheckCircle} className="text-primary text-xs me-2" />
                                                        )}
                                                        {asignatura.nombre}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="list-group-item">No se recibieron datos aún</li>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <button className="fw-500 btn btn-primary-soft text-primary">Agregar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card card-icon mb-4">
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
    );
}
