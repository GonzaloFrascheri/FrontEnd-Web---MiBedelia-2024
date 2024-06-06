import { extractYearFromISODate } from '@/utils/utils'

export default function ListarHorarios ({
  horarios,
  seleccionarHorario,
  estanCargandoHorarios,
  horarioSeleccionado
}) {
  const currentYear = new Date().getFullYear()

  return (
    <div className='card-body'>
      <div className='mb-3'>
        {estanCargandoHorarios ? (
          <div className='alert alert-info text-center' role='alert'>
            Cargando horarios...
          </div>
        ) : horarios.length > 0 ? (
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Docente</th>
                <th>Horario Inicio</th>
                <th>Horario Fin</th>
                <th>Semestre</th>
                <th>Año</th>
                <th>Días Dictados</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {horarios.map(horario => {
                const year = extractYearFromISODate(horario.inicioSemestre)
                return (
                  <tr
                    key={horario.id}
                    className={
                      horarioSeleccionado === horario.id ? 'table-active' : ''
                    }
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{horario.nombreDocente}</td>
                    <td>{horario.horarioInicio}</td>
                    <td>{horario.horarioFin}</td>
                    <td>{horario.tipoSemestre}</td>
                    <td>{year}</td>
                    <td>
                      {horario.diasDictados &&
                        horario.diasDictados.map(dia => (
                          <span key={dia} className='badge bg-secondary me-1'>
                            {dia}
                          </span>
                        ))}
                    </td>
                    <td>
                      <button
                        style={{ height: '30px' }}
                        className='btn btn-primary'
                        disabled={year !== currentYear}
                        onClick={() => seleccionarHorario(horario.id)}
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
            No hay horarios para elegir.
          </div>
        )}
      </div>
    </div>
  )
}
