export default function Index ({
  estado,
  handleSubmit,
  carreras,
  seleccionarCarrera,
  estanCargandoCarreras
}) {
  return (
    <div className='container-xl px-4 mt-n10'>
      <div className='card'>
        <div className='card shadow-lg border-0 rounded-lg'>
          {estado.message === '' ? (
            <form onSubmit={handleSubmit}>
              <div className='card-header justify-content-center'>
                <h3 className='fw-light'>Inscripción a Carrera</h3>
              </div>
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
                    disabled={estanCargandoCarreras}
                  >
                    {estanCargandoCarreras ? (
                      <option>Cargando carreras...</option>
                    ) : (
                      <>
                        <option value='' disabled>
                          Seleccione una carrera
                        </option>
                        {carreras.length > 0 ? (
                          carreras.map(carrera => (
                            <option key={carrera.id} value={carrera.id}>
                              {carrera.nombre}
                            </option>
                          ))
                        ) : (
                          <option>No hay carreras.</option>
                        )}
                      </>
                    )}
                  </select>
                </div>
              </div>
              <div className='card-footer text-center'>
                <button type='submit' className='btn btn-primary'>
                  Guardar
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div
                className={`alert alert-icon ${
                  estado.estado === 200 ? 'alert-primary' : 'alert-secondary'
                }`}
                role='alert'
              >
                <button
                  className='btn-close'
                  type='button'
                  data-bs-dismiss='alert'
                  aria-label='Close'
                ></button>
                <div className='alert-icon-aside'>
                  <i className='far fa-flag'></i>
                </div>
                <div className='alert-icon-content'>
                  <h6 className='alert-heading'>Resultado</h6>
                  {estado.message}!
                </div>
              </div>
              <div className='card-footer text-center'>
                <div className='small'>
                  <a href='/privado'>Volver al inicio</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
