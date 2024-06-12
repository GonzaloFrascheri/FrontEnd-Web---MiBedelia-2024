import React from 'react'

export default function ListarAsignaturas ({
  asignaturas,
  seleccionarAsignatura,
  estanCargandoAsignaturas,
  asignaturaSeleccionada
}) {
  return (
    <div className='card-body'>
      <div className='mb-3'>
        <label htmlFor='codigo' className='form-label'>
          Asignaturas
        </label>
        <select
          onChange={seleccionarAsignatura}
          className='form-control'
          id='listaDeAsignaturas'
          name='asignatura'
          required
          value={asignaturaSeleccionada ? asignaturaSeleccionada.id : ''}
          disabled={estanCargandoAsignaturas || asignaturas.length === 0}
        >
          {estanCargandoAsignaturas ? (
            <option>Cargando asignaturas...</option>
          ) : asignaturas.length > 0 ? (
            <>
              <option value='' disabled>
                Seleccione una asignatura
              </option>
              {asignaturas.map(asignatura => (
                <option key={asignatura.id} value={asignatura.id}>
                  {asignatura.nombre}
                </option>
              ))}
            </>
          ) : (
            <option disabled>No hay asignaturas disponibles.</option>
          )}
        </select>
      </div>
      {asignaturaSeleccionada && (
        <div className='mt-3'>
          <p>
            <strong>Hora de inicio:</strong> {asignaturaSeleccionada.horaInicio}
          </p>
          <p>
            <strong>Hora de fin:</strong> {asignaturaSeleccionada.horaFin}
          </p>
          <p>
            <strong>Días dictados:</strong>{' '}
            {asignaturaSeleccionada.diasDictados
              ? asignaturaSeleccionada.diasDictados.join(', ')
              : 'No disponible'}
          </p>
        </div>
      )}
    </div>
  )
}
