import React from 'react'
import CustomAlert from '@/app/componentes/reutilizables/alert'

export default function VerPerfil ({
  credentials,
  handleChange,
  errors,
  isFormValid,
  handleSubmit,
  estado,
  isPasswordEditable,
  handleCheckboxChange,
  userData
}) {
  return (
    <>
      <nav className='nav nav-borders'>
        <a className='nav-link active ms-0' href='#'>
          Perfil
        </a>
        {(userData && userData.role === 'ESTUDIANTE') && (
          <a className='nav-link' href='/privado/Estudiantes/VerNotificaciones'>
            Notificaciones
          </a>
        )}
      </nav>
      <hr className='mt-0 mb-4' />
      <div className='row'>
        <div className='col-xl-4'>
          <div className='card mb-4 mb-xl-0'>
            <div className='card-header'>Imagen de perfil</div>
            <div className='card-body text-center'>
              <img
                alt='...'
                src='../img/perfil.png'
                className='shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px'
              />
            </div>
          </div>
        </div>
        <div className='col-xl-8'>
          <div className='card mb-4'>
            <div className='card-header'>Detalle de la cuenta</div>
            <div className='card-body'>
              <form>
                <div className='row gx-3 mb-3'>
                  <div className='col-md-6'>
                    <label className='small mb-1'>Nombre</label>
                    <input
                      onChange={handleChange}
                      className='form-control'
                      type='text'
                      id='nombre'
                      name='nombre'
                      value={credentials.nombre}
                    />
                    {errors.nombre && errors.nombre !== '' && (
                      <span className='text-danger text-xs'>
                        {errors.nombre}
                      </span>
                    )}
                  </div>
                  <div className='col-md-6'>
                    <label className='small mb-1'>Apellido</label>
                    <input
                      onChange={handleChange}
                      className='form-control'
                      type='text'
                      id='apellido'
                      name='apellido'
                      value={credentials.apellido}
                    />
                    {errors.apellido && errors.apellido !== '' && (
                      <span className='text-danger text-xs'>
                        {errors.apellido}
                      </span>
                    )}
                  </div>
                </div>
                <div className='row gx-3 mb-3'>
                  {' '}
                  <div className='col-md-6'>
                    <label className='small mb-1'>Correo</label>
                    <input
                      onChange={handleChange}
                      className='form-control'
                      type='email'
                      id='email'
                      name='email'
                      value={credentials.email}
                    />
                    {errors.email && errors.email !== '' && (
                      <span className='text-danger text-xs'>
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div className='col-md-6'>
                    <label className='small mb-1'>Cédula</label>
                    <input
                      onChange={handleChange}
                      className='form-control'
                      type='text'
                      id='ci'
                      name='ci'
                      value={credentials.ci}
                      readOnly
                    />
                  </div>
                </div>

                <div className='row gx-3 mb-3'>
                  <div className='col-md-6'>
                    <label className='small mb-1'>Rol</label>
                    <input
                      className='form-control'
                      type='text'
                      id='rol'
                      name='rol'
                      value={credentials.rol}
                      readOnly
                    />
                  </div>
                  <div className='col-md-6'>
                    <label className='small mb-1'>Telefono</label>
                    <input
                      onChange={handleChange}
                      className='form-control'
                      type='text'
                      id='telefono'
                      name='telefono'
                      value={credentials.telefono}
                    />
                    {errors.telefono && errors.telefono !== '' && (
                      <span className='text-danger text-xs'>
                        {errors.telefono}
                      </span>
                    )}
                  </div>
                </div>
                <div className='form-check mb-3'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='editPassword'
                    checked={isPasswordEditable}
                    onChange={handleCheckboxChange}
                  />
                  <label className='form-check-label' htmlFor='editPassword'>
                    Editar Contraseña
                  </label>
                </div>
                <div className='row gx-3 mb-3'>
                  <div className='col-md-6'>
                    <label className='small mb-1'>Contraseña</label>
                    <input
                      onChange={handleChange}
                      className='form-control'
                      type='password'
                      id='password'
                      name='password'
                      value={credentials.password}
                      disabled={!isPasswordEditable}
                    />
                    {isPasswordEditable &&
                      errors.password &&
                      errors.password !== '' && (
                        <span className='text-danger text-xs'>
                          {errors.password}
                        </span>
                      )}
                  </div>
                  <div className='col-md-6'>
                    <label className='small mb-1'>Confirmar contraseña</label>
                    <input
                      onChange={handleChange}
                      className='form-control'
                      type='password'
                      id='confirmPassword'
                      name='confirmPassword'
                      value={credentials.confirmPassword}
                      disabled={!isPasswordEditable}
                    />
                    {isPasswordEditable &&
                      errors.confirmPassword &&
                      errors.confirmPassword !== '' && (
                        <span className='text-danger text-xs'>
                          {errors.confirmPassword}
                        </span>
                      )}
                  </div>
                </div>
              </form>
            </div>
            <div className='card-footer text-center'>
              <button
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className='btn btn-primary'
                type='submit'
              >
                Guardar Cambios
              </button>

              <CustomAlert estado={estado} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
