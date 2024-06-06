import React, { useState, useEffect } from 'react'

export default function ModificarHorarioAsignaturaPasos ({
  selectedCarreraId,
  selectedAsignaturaId,
  selectedHorarioId
}) {
  const [estado, setEstado] = useState({
    paso1: 'step-item active',
    paso2: 'step-item',
    paso3: 'step-item',
    paso4: 'step-item'
  })

  useEffect(() => {
    if (selectedCarreraId && !selectedAsignaturaId) {
      setEstado({
        paso1: 'step-item',
        paso2: 'step-item active',
        paso3: 'step-item',
        paso4: 'step-item'
      })
    } else if (selectedAsignaturaId && !selectedHorarioId) {
      setEstado({
        paso1: 'step-item',
        paso2: 'step-item',
        paso3: 'step-item active',
        paso4: 'step-item'
      })
    } else if (selectedHorarioId) {
      setEstado({
        paso1: 'step-item',
        paso2: 'step-item',
        paso3: 'step-item',
        paso4: 'step-item active'
      })
    } else {
      setEstado({
        paso1: 'step-item active',
        paso2: 'step-item',
        paso3: 'step-item',
        paso4: 'step-item'
      })
    }
  }, [selectedCarreraId, selectedAsignaturaId, selectedHorarioId])

  return (
    <div className='step step-warning py-4 mt-n15'>
      <div className={estado.paso1}>
        <a
          className='step-item-link'
          href='/privado/Funcionario/Modificar/HorarioAsignatura'
        >
          Elegir Carrera
        </a>
      </div>
      <div className={estado.paso2}>
        <a
          className={`step-item-link ${!selectedCarreraId ? 'disabled' : ''}`}
          aria-disabled={!selectedCarreraId}
        >
          Elegir Asignatura
        </a>
      </div>
      <div className={estado.paso3}>
        <a
          className={`step-item-link ${
            !selectedAsignaturaId ? 'disabled' : ''
          }`}
          aria-disabled={!selectedAsignaturaId}
        >
          Elegir horario de asignatura
        </a>
      </div>
      <div className={estado.paso4}>
        <a
          className={`step-item-link ${!selectedHorarioId ? 'disabled' : ''}`}
          aria-disabled={!selectedHorarioId}
        >
          Confirmar
        </a>
      </div>
    </div>
  )
}
