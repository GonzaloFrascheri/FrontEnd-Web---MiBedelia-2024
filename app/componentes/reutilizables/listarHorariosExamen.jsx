import React from 'react'

export default function ListarHorarioExamen ({
  examenes,
  seleccionarExamen,
  estanCargandoExamenes,
  examenSeleccionado
}) {
  return (
    <div className='card-body'>
      <div className='mb-3'>
        {estanCargandoExamenes ? (
          <div className='alert alert-info text-center' role='alert'>
            Cargando exámenes...
          </div>
        ) : examenes.length > 0 ? (
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Año Lectivo</th>
                <th>Docente</th>
                <th>Asignatura</th>
                <th>Fecha de Examen</th>
                <th>Horario</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {examenes.map(examen => {
                const currentYear = new Date().getFullYear()
                return (
                  <tr
                    key={examen.id}
                    className={
                      examenSeleccionado === examen.id ? 'table-active' : ''
                    }
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{examen.anioLectivo}</td>
                    <td>{examen.nombreDocente}</td>
                    <td>{examen.nombreAsignatura}</td>
                    <td>{new Date(examen.fechaExamen).toLocaleDateString()}</td>
                    <td>{examen.horario ? examen.horario : 'No asignado'}</td>
                    <td>
                      <button
                        style={{ height: '30px' }}
                        className='btn btn-primary'
                        disabled={examen.anioLectivo !== currentYear}
                        onClick={() => seleccionarExamen(examen.id)}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div className='alert alert-danger text-center' role='alert'>
            No hay exámenes para elegir.
          </div>
        )}
      </div>
    </div>
  )
}
