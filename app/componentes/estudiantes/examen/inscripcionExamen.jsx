import ListarExamenes from '@/app/componentes/reutilizables/listarExamenes'

export default function Index ({
  estado,
  handleSubmit,
  examenes,
  estanCargandoExamenes,
  seleccionarExamen,
  examenSeleccionado,
  resetearForm
}) {
  return (
    <div className='container-xl px-4 mt-n10'>
      <div className='card'>
        <div className='card shadow-lg border-0 rounded-lg'>
          <div className='card-header justify-content-center'>
            <h3 className='fw-light'>Inscripción a Exámen</h3>
          </div>
          {estado.message === '' ? (
            <>
              <form onSubmit={handleSubmit}>
                <ListarExamenes
                  examenSeleccionado={examenSeleccionado}
                  seleccionarExamen={seleccionarExamen}
                  estanCargandoExamenes={estanCargandoExamenes}
                  examenes={examenes}
                />
                <div className='card-footer text-center'>
                  <button
                    disabled={!examenSeleccionado}
                    type='submit'
                    className='btn btn-primary'
                  >
                    Inscribirse
                  </button>
                </div>
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
                    Reintentar
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
