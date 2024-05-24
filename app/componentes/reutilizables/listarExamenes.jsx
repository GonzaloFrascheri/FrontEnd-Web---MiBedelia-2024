export default function ListarExamenes ({
  examenes,
  seleccionarExamen,
  estanCargandoExamenes
}) {
  return (
    <div className='card-body'>
      <div className='mb-3'>
        <label htmlFor='codigo' className='form-label'>
          Exámenes disponibles para inscribirse
        </label>
        <select
          onChange={seleccionarExamen}
          className='form-control'
          id='listaDeExamenes'
          name='examen'
          required
          disabled={estanCargandoExamenes || examenes.length === 0}
        >
          {estanCargandoExamenes ? (
            <option>Cargando exámenes...</option>
          ) : examenes.length > 0 ? (
            <>
              <option value='' disabled>
                Seleccione un examen
              </option>
              {examenes.map(examen => (
                <option key={examen.id} value={examen.id}>
                  {examen.nombre}
                </option>
              ))}
            </>
          ) : (
            <option disabled>No hay exámenes disponibles.</option>
          )}
        </select>
      </div>
    </div>
  )
}
