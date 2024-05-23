export default function ListarCarreras ({
  carreras,
  seleccionarCarrera,
  estanCargandoCarreras
}) {
  return (
    <div className='card-body'>
      <div className='mb-3'>
        <label htmlFor='codigo' className='form-label'>
          Carreras
        </label>
        <select
          onChange={seleccionarCarrera}
          className='form-control'
          id='listaDeCarreras'
          name='carrera'
          required
          disabled={estanCargandoCarreras || carreras.length === 0}
        >
          {estanCargandoCarreras ? (
            <option>Cargando carreras...</option>
          ) : carreras.length > 0 ? (
            <>
              <option value='' disabled>
                Seleccione una carrera
              </option>
              {carreras.map(carrera => (
                <option key={carrera.id} value={carrera.id}>
                  {carrera.nombre}
                </option>
              ))}
            </>
          ) : (
            <option disabled>No hay carreras disponibles.</option>
          )}
        </select>
      </div>
    </div>
  )
}
