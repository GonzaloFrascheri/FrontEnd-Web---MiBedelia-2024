import React, { useEffect, useState } from 'react'

export default function InscripcionAsignaturaPasos ({
  selectedCareerId,
  selectedSubjectId
}) {
  const [estado, setEstado] = useState({
    paso1: 'step-item active',
    paso2: 'step-item',
    paso3: 'step-item'
  })

  useEffect(() => {
    if (selectedCareerId && !selectedSubjectId) {
      setEstado({
        paso1: 'step-item',
        paso2: 'step-item active',
        paso3: 'step-item'
      })
    } else if (selectedSubjectId) {
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
  }, [selectedCareerId, selectedSubjectId])

  return (
    <div className='step step-warning py-4 mt-n15'>
      <div className={estado.paso1}>
        <a className='step-item-link' href='/privado/Estudiantes/Asignatura'>
          Elegir Carrera
        </a>
      </div>
      <div className={estado.paso2}>
        <a
          className={`step-item-link ${!selectedCareerId ? 'disabled' : ''}`}
          href='#!'
          aria-disabled={!selectedCareerId}
        >
          Elegir Asignatura
        </a>
      </div>
      <div className={estado.paso3}>
        <a
          className={`step-item-link ${!selectedSubjectId ? 'disabled' : ''}`}
          href='#!'
          aria-disabled={!selectedSubjectId}
        >
          Confirmar
        </a>
      </div>
    </div>
  )
}
