import React, { useState, useEffect } from "react";

export default function FinDeCursoListAsignatura({
    listaAsignaturas,
    handleAsignaturaChange,
    handleSubmit,
    formData,
    estado,
    isFormValid,
}) {
    return (
    <div className="container-xl px-4">
        <div className="card">
            <div className="card shadow-lg border-0 rounded-lg">
                <div className="card-header justify-content-center">
                    <h3 className="fw-light">
                        Registro de un exámen relacionado a una asignatura
                    </h3>
                </div>
                {estado.message === "" || estado.continuar === false ? (
                    <form onSubmit={handleSubmit} enctype="multipart/form-data">
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
                                            {listaAsignaturas.length > 0 ? (
                                                listaAsignaturas.map((asignatura) => (
                                                    <option
                                                        key={asignatura.id}
                                                        value={asignatura.id}>
                                                        {asignatura.nombre}
                                                    </option>
                                                ))
                                            ) : (
                                                <option>No se recibieron datos aún</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label htmlFor="subirExcell">
                                                Cargar Archivo Excell
                                            </label>
                                        </div>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="subirExcell"
                                            name="subirExcell"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer  d-flex align-items-center justify-content-between">
                            <button
                                type="button"
                                className="btn btn-secondary"
                            >
                                Descargar Planilla en Excell
                            </button>
                            <button
                                disabled={!isFormValid()}
                                type="submit"
                                className="btn btn-primary"
                            >
                                Crear exámen
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="card-body">
                            <div
                                className="alert alert-icon m-2 alert-primary"
                                role="alert"
                            >
                                <div className="alert-icon-aside">
                                    <i className="far fa-flag"></i>
                                </div>
                                <div className="alert-icon-content">
                                    <h6 className="alert-heading">Resultado</h6>
                                    {estado.message}!
                                </div>
                            </div>
                        </div>
                        <div className="card-footer text-center">
                            <div className="small">
                                <a
                                    style={{ cursor: "pointer" }}
                                    className="link-primary"
                                    href="/privado/Funcionario/Registro/ExamenAsignatura"
                                >
                                    Reintentar
                                </a>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>
    );
}
