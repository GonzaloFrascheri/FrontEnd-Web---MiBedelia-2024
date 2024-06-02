import React, { useState, useEffect } from 'react';

export default function FinDeCursoPasos({estado, setEstado}) {
    useEffect(() => {
        if (estado.paso === 2) {
            setEstado({
                ...estado,
                paso1: "step-item",
                paso2: "step-item active",
                paso3: "step-item",
                paso4: "step-item"
            });
        } else if (estado.paso === 3) {
            setEstado({
                ...estado,
                paso1: "step-item",
                paso2: "step-item",
                paso3: "step-item active",
                paso4: "step-item"
            });
        } else if (estado.paso === 4) {
            setEstado({
                ...estado,
                paso1: "step-item",
                paso2: "step-item",
                paso3: "step-item",
                paso4: "step-item  active"
            });
        } else {
            setEstado({
                ...estado,
                paso1: "step-item active",
                paso2: "step-item",
                paso3: "step-item",
                paso4: "step-item"
            });
        }
    }, [estado.paso]);

    return (
        <div className="step step-warning py-4 mt-n15">
            <div className={estado.paso1}>
                <a className="step-item-link" href="/privado/Funcionario/Registro/ActaFinDeCurso">Elegir Carrera</a>
            </div>
            <div className={estado.paso2}>
                <a
                    className={`step-item-link ${!estado.paso === 2 ? 'disabled' : ''}`}
                    href="#!" aria-disabled="true"
                >
                    Elegir Asignatura
                </a>
            </div>
            <div className={estado.paso3}>
                <a
                    className={`step-item-link ${!estado.paso === 3 ? 'disabled' : ''}`}
                    href="#!" aria-disabled="true"
                >
                    Analizar archivo
                </a>
            </div>
            <div className={estado.paso3}>
                <a
                    className={`step-item-link ${!estado.paso === 4 ? 'disabled' : ''}`}
                    href="#!" aria-disabled="true"
                >
                    Confirmar
                </a>
            </div>
        </div>
    );
}