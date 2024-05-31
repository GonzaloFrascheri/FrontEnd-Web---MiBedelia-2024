'use client'
import React, { useState, useEffect } from 'react'
import axios from '@/utils/axios'

export default function Index ({
  estado,
  formData,
  handleChange,
  handleSubmit,
  errors,
  isFormValid
}) {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Obtener los tipos de rol desde el endpoint
    axios
      .get('/Administrador/getTiposRol')
      .then(response => {
        setRoles(response.data)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }, [])

  return (
    <div className='conatiner-xl px-4 mt-n10'>
      <div className='card'>
        <div className='card shadow-lg border-0 rounded-lg'>
          <div className='card-header justify-content-center'>
            <h3 className='fw-light'>Alta de Usuario</h3>
          </div>
          {estado.message === '' ? (
            <>
              <form onSubmit={handleSubmit}>
                <div className='card-body'>
                  <div className='row gx-3'>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='small mb-1'>Nombre</label>
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
                        <label className='small mb-1'>Apellido</label>
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
                        <label className='small mb-1'>
                          Cédula de identidad
                        </label>
                        <input
                          maxLength={8}
                          className='form-control'
                          name='ci'
                          type='text'
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
                        <label className='small mb-1'>Rol</label>
                        {loading ? (
                          <p>Cargando roles...</p>
                        ) : error ? (
                          <p>Error cargando roles: {error.message}</p>
                        ) : (
                          <select
                            className='form-control'
                            name='rol'
                            id='rol'
                            onChange={handleChange}
                            value={formData.rol}
                          >
                            <option value=''>Seleccione un rol</option>
                            {roles.map((role, index) => (
                              <option key={index} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        )}
                        {errors.rol && errors.rol !== '' && (
                          <span className='text-danger text-xs'>
                            {errors.rol}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='row gx-3'>
                    <div className='col-md-12'>
                      <div className='mb-3'>
                        <label className='small mb-1'>Correo</label>
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
                        <label className='small mb-1'>Password</label>
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
                        <label className='small mb-1'>Telefono</label>
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
                </div>
                <div className='card-footer text-center'>
                  <button
                    disabled={!isFormValid()}
                    className='btn btn-primary'
                    type='submit'
                  >
                    Alta Usuario
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div>
              <div className='card-body'>
                <div
                  className={`alert alert-icon ${
                    estado.estado === 200 ? 'alert-primary' : 'alert-secondary'
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
