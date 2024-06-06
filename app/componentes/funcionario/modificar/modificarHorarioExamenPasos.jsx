import React, { useState, useEffect } from 'react'

export default function ModificarHorarioExamenPasos ({
  selectedCarreraId,
  selectedExamenId
}) {
  const [estado, setEstado] = useState({
    paso1: 'step-item active',
    paso2: 'step-item',
    paso3: 'step-item'
  })

  useEffect(() => {
    if (selectedCarreraId) {
      setEstado({
        paso1: 'step-item',
        paso2: 'step-item active',
        paso3: 'step-item'
      })
    } else if (selectedExamenId) {
      setEstado({
        paso1: 'step-item',
        paso2: 'step-item',
        paso3: 'step-item active'
      })
    } else {
      setEstado({
        paso1: 'step-item active',
        paso2: 'step-item',
        paso3: 'step-item'
      })
    }
  }, [selectedCarreraId, selectedExamenId])

  return (
    <div className='step step-warning py-4 mt-n15'>
      <div className={estado.paso1}>
        <a
          className='step-item-link'
          href='/privado/Funcionario/Modificar/HorarioExamen'
        >
          Elegir Carrera
        </a>
      </div>
      <div className={estado.paso2}>
        <a
          className={`step-item-link ${!selectedCarreraId ? 'disabled' : ''}`}
          aria-disabled={!selectedCarreraId}
        >
          Elegir Examen
        </a>
      </div>
      <div className={estado.paso3}>
        <a
          className={`step-item-link ${!selectedExamenId ? 'disabled' : ''}`}
          aria-disabled={!selectedExamenId}
        >
          Confirmar
        </a>
      </div>
    </div>
  )
}
