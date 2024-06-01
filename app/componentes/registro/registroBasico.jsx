import Footer from '@/app/componentes/main/footer'

export default function Index ({
  estado,
  formData,
  handleChange,
  handleSubmit,
  errors,
  isFormValid
}) {
  return (
    <div id='layoutAuthentication'>
      <div id='layoutAuthentication_content'>
        <main>
          <div className='container-xl px-4 py-2'>
            <div className='row justify-content-center'>
              <div className='col-lg-7'>
                <div className='card shadow-lg border-0 rounded-lg mt-5'>
                  {estado.message === '' ? (
                    <>
                      <div className='card-header justify-content-center'>
                        <h3 className='fw-light my-4'>Registrar usuario</h3>
                      </div>
                      <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                          <div className='row gx-3'>
                            <div className='col-md-6'>
                              <div className='mb-3'>
                                <label htmlFor='nombre' className='small mb-1'>
                                  Nombre
                                </label>
                                <input
                                  className='form-control'
                                  name='nombre'
                                  type='text'
                                  id='nombre'
                                  onChange={handleChange}
                                  value={formData.nombre}
                                />
                                {errors.nombre && errors.nombre !== '' && (
                                  <span className='text-danger text-xs'>
                                    {errors.nombre}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className='col-md-6'>
                              <div className='mb-3'>
                                <label
                                  htmlFor='apellido'
                                  className='small mb-1'
                                >
                                  Apellido
                                </label>
                                <input
                                  className='form-control'
                                  name='apellido'
                                  type='text'
                                  id='apellido'
                                  onChange={handleChange}
                                  value={formData.apellido}
                                />
                                {errors.apellido && errors.apellido !== '' && (
                                  <span className='text-danger text-xs'>
                                    {errors.apellido}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className='row gx-3'>
                            <div className='col-md-6'>
                              <div className='mb-3'>
                                <label htmlFor='ci' className='small mb-1'>
                                  Cédula de identidad
                                </label>
                                <input
                                  className='form-control'
                                  name='ci'
                                  type='text'
                                  maxLength='8'
                                  minLength='7'
                                  id='ci'
                                  onChange={handleChange}
                                  value={formData.ci}
                                />
                                {errors.ci && errors.ci !== '' && (
                                  <span className='text-danger text-xs'>
                                    {errors.ci}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className='col-md-6'>
                              <div className='mb-3'>
                                <label htmlFor='email' className='small mb-1'>
                                  Correo
                                </label>
                                <input
                                  className='form-control'
                                  name='email'
                                  type='email'
                                  id='email'
                                  onChange={handleChange}
                                  value={formData.email}
                                />
                                {errors.email && errors.email !== '' && (
                                  <span className='text-danger text-xs'>
                                    {errors.email}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className='row gx-3'>
                            <div className='col-md-6'>
                              <div className='mb-3'>
                                <label
                                  htmlFor='password'
                                  className='small mb-1'
                                >
                                  Password
                                </label>
                                <input
                                  className='form-control'
                                  name='password'
                                  type='password'
                                  id='password'
                                  onChange={handleChange}
                                  value={formData.password}
                                />
                                {errors.password && errors.password !== '' && (
                                  <span className='text-danger text-xs'>
                                    {errors.password}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className='col-md-6'>
                              <div className='mb-3'>
                                <label
                                  htmlFor='telefono'
                                  className='small mb-1'
                                >
                                  Teléfono
                                </label>
                                <input
                                  className='form-control'
                                  name='telefono'
                                  type='text'
                                  id='telefono'
                                  onChange={handleChange}
                                  value={formData.telefono}
                                />
                                {errors.telefono && errors.telefono !== '' && (
                                  <span className='text-danger text-xs'>
                                    {errors.telefono}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className='w-full lg:w-12/12 px-4 d-flex justify-content-center'>
                            <button
                              className='btn btn-primary btn-block content-center'
                              type='submit'
                              disabled={!isFormValid()}
                            >
                              Registrar Usuario
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className='card-footer text-center'>
                        <div className='small'>
                          <a href='/'>Volver al inicio</a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>
                      <div
                        className={`alert alert-icon ${
                          estado.estado === 200
                            ? 'alert-primary'
                            : 'alert-secondary'
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
                      <div className='card-footer content-center'>
                        <div className='small'>
                          <a href='/'>Volver al inicio</a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
