'use client'
import React, { useEffect, useState } from 'react'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import VerPerfil from '@/app/componentes/perfil/verPerfil.jsx'
import { useAuth } from '@/context/AuthProvider'
import { useSidebar } from '@/context/AppContext'
import axios from '@/utils/axios'
import {
  handleProfileFormValidation,
  updatePasswordErrors
} from '@/utils/validators'
import { hashPassword } from '@/utils/utils'

function VerPerfilPage () {
  const authData = useAuth()
  const [credentials, setCredentials] = useState({
    ci: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    rol: '',
    password: '',
    confirmPassword: ''
  })
  const [userData, setUserData] = useState(null)
  const [errors, setErrors] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: ''
  })
  const [estado, setEstado] = useState({ estado: '', message: '' })
  const [isPasswordEditable, setIsPasswordEditable] = useState(false)
  const [formIsDirty, setFormIsDirty] = useState(false)
  const { isSidebarToggled } = useSidebar()

  // Check session
  useEffect(() => {
    if (authData && !userData) {
      setUserData(authData)
    }
  }, [authData, userData])

  // Request credentials
  useEffect(() => {
    if (userData) {
      const fetchCredentials = async () => {
        try {
          const response = await axios.get(`/Usuario/getUsuario`)
          const { status, data } = response
          if (status === 200) {
            setCredentials({
              ci: data.ci,
              nombre: data.nombre,
              apellido: data.apellido,
              email: data.email,
              telefono: data.telefono,
              rol: data.rol,
              password: '',
              confirmPassword: ''
            })
          }
        } catch (error) {
          const { status, data } = error.response
          setEstado({
            estado: status,
            message: data.message
          })
        }
      }
      fetchCredentials()
    }
  }, [userData])

  const handleChange = e => {
    if (!formIsDirty) setFormIsDirty(true)

    const { name, value } = e.target

    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }))

    if (
      isPasswordEditable ||
      (name !== 'password' && name !== 'confirmPassword')
    ) {
      handleValidation(name, value)
    }
  }

  const handleFormValidation = () => {
    const { password, confirmPassword, ...rest } = credentials

    const formDataValid =
      Object.values(rest).every(value => value !== '') &&
      (!isPasswordEditable || (password !== '' && confirmPassword !== ''))

    const errorsValid =
      Object.values(errors).every(error => error === '') &&
      (!isPasswordEditable ||
        (errors.password === '' && errors.confirmPassword === ''))

    return formDataValid && errorsValid && formIsDirty
  }

  const handleValidation = (name, value) => {
    const params = {
      name,
      value,
      secondValue:
        name === 'password' ? credentials.confirmPassword : credentials.password
    }
    const error = handleProfileFormValidation(params)

    setErrors(prevState => {
      let newErrors = { ...prevState, [name]: error }

      if (
        isPasswordEditable &&
        (name === 'password' || name === 'confirmPassword')
      ) {
        newErrors = updatePasswordErrors(
          newErrors,
          name,
          value,
          credentials.password,
          credentials.confirmPassword
        )
      }

      return newErrors
    })
  }

  const handleCheckboxChange = () => {
    const newState = !isPasswordEditable
    setIsPasswordEditable(newState)
    if (newState === false) {
      setCredentials(prevState => ({
        ...prevState,
        password: '',
        confirmPassword: ''
      }))
      setErrors(prevState => ({
        ...prevState,
        password: '',
        confirmPassword: ''
      }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const formData = {
        nombre: credentials.nombre,
        apellido: credentials.apellido,
        email: credentials.email,
        telefono: credentials.telefono,
        password: isPasswordEditable
          ? await hashPassword(credentials.password)
          : ''
      }

      const response = await axios.put(`/Usuario/editarUsuario`, formData)
      const { status, data } = response

      setEstado({
        message: data.message,
        estado: status
      })
    } catch (error) {
      setEstado({
        message: error.response
          ? error.response.data.message
          : 'Error al editar perfil',
        estado: error.response ? error.response.status : 500
      })
    }
  }

  return (
    <body
      className={isSidebarToggled ? 'nav-fixed' : 'nav-fixed sidenav-toggled'}
    >
      <NavPrivado />
      <div id='layoutSidenav'>
        <div id='layoutSidenav_nav'>
          <Sidebar />
        </div>
        <div id='layoutSidenav_content'>
          <main>
            <header className='page-header page-header-compact page-header-light border-bottom bg-white mb-4'>
              <div className='container-xl px-4'>
                <div className='page-header-content'>
                  <div className='row align-items-center justify-content-between pt-3'>
                    <div className='col-auto mb-3'>
                      <h1 className='page-header-title'>
                        <div className='page-header-icon'>
                          <i data-feather='user'></i>
                        </div>
                        Configuracion de cuenta - Perfil
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <div className='container-xl px-4 mt-4'>
              <VerPerfil
                estado={estado}
                handleSubmit={handleSubmit}
                isFormValid={handleFormValidation}
                errors={errors}
                handleChange={handleChange}
                credentials={credentials}
                isPasswordEditable={isPasswordEditable}
                handleCheckboxChange={handleCheckboxChange}
              />
            </div>
          </main>
        </div>
      </div>
    </body>
  )
}

export default VerPerfilPage
