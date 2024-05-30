import React, { useState, useEffect } from 'react';

export default function ActaExamenPasos({ selectedCarreraId, selectedAsignaturaId }) {
    const [estado, setEstado] = useState({
        paso1: "step-item active",
        paso2: "step-item"
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
        }
    }, [selectedCarreraId, selectedAsignaturaId]);

    return (
        <div className="step step-warning py-4 mt-n15">
            <div className={estado.paso1}>
                <a className="step-item-link" href="/privado/Funcionario/Registro/HorarioAsignatura">Elegir Carrera</a>
            </div>
            <div className={estado.paso2}>
                <a
                    className={`step-item-link ${!selectedCarreraId ? 'disabled' : ''}`}
                    href="#!" aria-disabled="true"
                >
                    Finalizar
                </a>
            </div>
        </div>
    );
}
