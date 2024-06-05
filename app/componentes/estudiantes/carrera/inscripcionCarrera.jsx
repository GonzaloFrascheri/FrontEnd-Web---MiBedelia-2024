import ListarCarreras from '@/app/componentes/reutilizables/listarCarreras'

export default function Index ({
  estado,
  handleSubmit,
  carreras,
  seleccionarCarrera,
  estanCargandoCarreras,
  carreraSeleccionada,
  resetearForm
}) {
  return (
    <div className='container-xl px-4 mt-n10'>
      <div className='card'>
        <div className='card shadow-lg border-0 rounded-lg'>
          <div className='card-header justify-content-center'>
            <h3 className='fw-light'>Inscripción a Carrera</h3>
          </div>
            {estado.message === '' ? (
              <form onSubmit={handleSubmit}>
                <ListarCarreras
                  carreraSeleccionada={carreraSeleccionada}
                  carreras={carreras}
                  seleccionarCarrera={seleccionarCarrera}
                  estanCargandoCarreras={estanCargandoCarreras}
                />
                <div className='card-footer text-center'>
                  <button
                    disabled={!carreraSeleccionada}
                    type='submit'
                    className='btn btn-primary'
                  >
                    Inscribirse
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className='card-body'>
                  <div
                    className={`alert alert-icon ${
                      estado.estado === 200 ? 'alert-success' : 'alert-danger'
                    }`}
                    role='alert'
                  >
                    <div className='alert-icon-aside'>
                      <i className='far fa-flag'></i>
                    </div>
                    <div className='alert-icon-content'>
                      <h6 className='alert-heading'>Resultado</h6>
                      {estado.message}!
                    </div>
                  </div>
                </div>
                <div className='card-footer text-center'>
                  <div className='small'>
                    <a
                      style={{ cursor: 'pointer' }}
                      className='link-primary'
                      onClick={resetearForm}
                    >
                      Volver
                    </a>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
