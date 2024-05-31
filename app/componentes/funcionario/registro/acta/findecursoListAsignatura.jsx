import React, { useState, useEffect } from 'react';

export default function FinDeCursoListAsignatura ({listarAsignatura, hanldeChangeAsignatura, selectedAsignaturaId}) {
    return (
        <div className="card mb-4">
            <div className="card-header">
                <h5 className="card-title">Seleccionar Asignatura</h5>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="asignatura">Asignatura</label>
                    <select
                        id="asignatura"
                        className="form-control"
                        value={selectedAsignaturaId}
                        onChange={(e) => hanldeChangeAsignatura(e.target.value)}
                    >
                        <option value="">Seleccionar Asignatura</option>
                        {listarAsignatura.map((asignatura) => (
                            <option key={asignatura.id} value={asignatura.id}>
                                {asignatura.nombre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}