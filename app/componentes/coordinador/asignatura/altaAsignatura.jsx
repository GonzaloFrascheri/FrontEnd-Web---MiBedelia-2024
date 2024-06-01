import React from 'react'

export default function Index ({
  estado,
  formData,
  handleChange,
  handleSubmit,
  listaCarrera,
  semestresDisponibles
}) {
  const handleCancelar = e => {
    e.preventDefault()
    window.location.href = '/privado'
  }

  return (
    <div className='container-xl px-4 mt-n10'>
      <div className='card'>
        <div className='card shadow-lg border-0 rounded-lg'>
          <div className='card-header justify-content-center'>
            <h3 className='fw-light'>Alta de Asignatura</h3>
          </div>
          {estado.message === '' ? (
            <>
              <form onSubmit={handleSubmit}>
                <div className='card-body'>
                  <div className='mb-3'>
                    <label htmlFor='nombre' className='form-label'>
                      Nombre:
                    </label>
                    <input
                      type='text'
                      id='nombre'
                      name='nombre'
                      value={formData.nombre}
                      onChange={handleChange}
                      className='form-control'
                      required
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='gradoMateria' className='form-label'>
                      Semestre:
                    </label>
                    <select
                      id='gradoMateria'
                      name='gradoMateria'
                      className='form-select'
                      aria-label='Seleccionar semestre'
                      value={formData.gradoMateria}
                      onChange={handleChange}
                      required
                    >
                      <option value='' disabled selected>
                        Seleccione un semestre
                      </option>
                      {semestresDisponibles.map(semestre => {
                        return (
                          <option key={semestre} value={semestre}>
                            {semestre}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='listaDeCarrera'>Lista de carreras</label>
                    <select
                      className='form-control'
                      id='listaDeCarrera'
                      name='idCarrera'
                      value={formData.idCarrera}
                      onChange={handleChange}
                      required
                    >
                      <option value='' disabled selected>
                        Seleccione una carrera
                      </option>
                      {listaCarrera.length > 0 ? (
                        listaCarrera.map(carrera => (
                          <option key={carrera.id} value={carrera.id}>
                            {carrera.nombre}
                          </option>
                        ))
                      ) : (
                        <option>No se recibieron datos aún</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className='card-footer text-center'>
                  <button
                    type='cancel'
                    className='btn btn-secondary'
                    onClick={handleCancelar}
                  >
                    Cancelar
                  </button>
                  <button type='submit' className='btn btn-primary mx-1'>
                    Guardar
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div>
              <div
                className={`alert alert-icon m-2 ${
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
