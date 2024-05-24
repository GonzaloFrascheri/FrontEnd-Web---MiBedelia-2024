export default function ListarAsignaturas ({
  asignaturas,
  seleccionarAsignatura,
  estanCargandoAsignaturas
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
    </div>
  )
}
