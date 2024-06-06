import React, { useEffect, useState } from "react";

export default function Index({ listaExamen, handleChangeExamen}) {

    const [error, setError] = useState(false);

    const handleChange = (event) => {
        const selectedId = event.target.value;
        handleChangeExamen(selectedId);
    };

    const formatearFecha = (fecha) => {
        const fechaObj = new Date(fecha);
        const dia = fechaObj.getDate();
        const mes = fechaObj.getMonth() + 1;
        const anio = fechaObj.getFullYear();
        return `${dia}/${mes}/${anio}`;
    };

    return (
        <div className="container-xl px-4">
            <div className="card">
                <div className="card shadow-lg border-0 rounded-lg">
                        <div className="card-header d-flex align-items-center justify-content-between">
                            <h3 className="fw-light">Lista de Exámenes</h3>
                            <div className="small">
                                <a href="/privado/Funcionario/Listar/Periodo">Volver</a>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Nombre Asignatura</th>
                                        <th>CI Docente</th>
                                        <th>Nombre Docente</th>
                                        <th>Fecha Examen</th>
                                        <th>Horario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaExamen.length > 0 ? (
                                        listaExamen.map((examen) => (
                                            <tr key={examen.id}>
                                                <td>{examen.nombreAsignatura}</td>
                                                <td>{examen.ciDocente}</td>
                                                <td>{examen.nombreDocente}</td>
                                                <td>{formatearFecha(examen.fechaExamen)}</td>
                                                <td>{examen.horario}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No se recibieron datos aún</td>
                                        </tr>
                                    )}
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}