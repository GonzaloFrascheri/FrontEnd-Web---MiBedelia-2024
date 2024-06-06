import React, { useState, useEffect } from 'react';

export default function ActaExamenPasos({ selectedCarreraId, selectedExamenId }) {
    const [estado, setEstado] = useState({
        paso1: "step-item active",
        paso2: "step-item",
    });

    useEffect(() => {
        if (selectedCarreraId !== null && selectedExamenId === null) {
            setEstado({
                paso1: "step-item",
                paso2: "step-item active",
            });
        } else if (selectedExamenId !== null) {
            setEstado({
                paso1: "step-item",
                paso2: "step-item",
            });
        } 
    }, [selectedCarreraId, selectedExamenId]);

    return (
        <div className="step step-warning py-4 mt-n15">
            <div className={estado.paso1}>
                <a className="step-item-link" href="/privado/Funcionario/Listar/Periodo">Elegir Carrera</a>
            </div>
            <div className={estado.paso2}>
                <a
                    className={`step-item-link ${!selectedCarreraId ? 'disabled' : ''}`}
                    href="#!" aria-disabled="true"
                >
                    Examenes
                </a>
            </div>
        </div>
    );
}
