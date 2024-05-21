import React, { useState, useEffect } from 'react';

export default function ActaExamenPasos({ selectedCarreraId, selectedAsignaturaId }) {
    const [estado, setEstado] = useState({
        paso1: "step-item active",
        paso2: "step-item",
        paso3: "step-item"
    });

    useEffect(() => {
        if (selectedCarreraId !== null && selectedAsignaturaId === null) {
            setEstado({
                paso1: "step-item",
                paso2: "step-item active",
                paso3: "step-item"
            });
        } else if (selectedAsignaturaId !== null) {
            setEstado({
                paso1: "step-item",
                paso2: "step-item",
                paso3: "step-item active"
            });
        } else {
            setEstado({
                paso1: "step-item active",
                paso2: "step-item",
                paso3: "step-item"
            });
        }
    }, [selectedCarreraId, selectedAsignaturaId]);

    return (
        <div className="step step-warning py-4 mt-n15">
            <div className={estado.paso1}>
                <a className="step-item-link" href="/privado/Funcionario/Generar/ActaExamen">Elegir Carrera</a>
            </div>
            <div className={estado.paso2}>
                <a
                    className={`step-item-link ${!selectedCarreraId ? 'disabled' : ''}`}
                    href="#!" aria-disabled="true"
                >
                    Elegir Asignatura
                </a>
            </div>
            <div className={estado.paso3}>
                <a
                    className={`step-item-link ${!selectedAsignaturaId ? 'disabled' : ''}`}
                    href="#!" aria-disabled="true"
                >
                    Confirmar
                </a>
            </div>
        </div>
    );
}
