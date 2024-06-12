import ListarCarreras from '@/app/componentes/reutilizables/listarCarreras'
import ListarAsignaturas from '@/app/componentes/reutilizables/listarAsignaturas'
import InscripcionAsignaturaPasos from './inscripcionAsignaturaPasos'

export default function Index ({
  estado,
  handleSubmit,
  carreras,
  seleccionarCarrera,
  estanCargandoCarreras,
  carreraSeleccionada,
  asignaturas,
  seleccionarAsignatura,
  estanCargandoAsignaturas,
  asignaturaSeleccionada,
  resetearForm
}) {

  return (
    <div className='container-xl px-4 mt-n10'>
      <InscripcionAsignaturaPasos
        selectedCareerId={carreraSeleccionada}
        selectedSubjectId={asignaturaSeleccionada}
      />
      <div className='card'>
        <div className='card shadow-lg border-0 rounded-lg'>
          {estado.message === '' ? (
            <>
              <form onSubmit={handleSubmit}>
                  {!carreraSeleccionada ? (
                    <>
                      <div className='card-header justify-content-center'>
                        <h3 className='fw-light'>Seleccionar carrera</h3>
                      </div>
                      <ListarCarreras
                        carreraSeleccionada={carreraSeleccionada}
                        carreras={carreras}
                        estanCargandoCarreras={estanCargandoCarreras}
                        seleccionarCarrera={seleccionarCarrera}
                      />
                    </>
                  ) : (
                    <>
                      <div className='card-header justify-content-center'>
                        <h3 className='fw-light'>Seleccionar asignatura</h3>
                      </div>
                      <ListarAsignaturas
                        asignaturaSeleccionada={asignaturaSeleccionada}
                        asignaturas={asignaturas}
                        estanCargandoAsignaturas={estanCargandoAsignaturas}
                        seleccionarAsignatura={seleccionarAsignatura}
                      />
                      <div className='card-footer text-center'>
                        {asignaturas.length > 0 && (
                          <button
                            type='submit'
                            disabled={
                              !carreraSeleccionada || !asignaturaSeleccionada
                            }
                            className='btn btn-primary'
                          >
                            Inscribirse
                          </button>
                        )}
                      </div>
                    </>
                  )}
              </form>
            </>
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
                    {estado.message}
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
