'use client'
import React, { useState } from 'react'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx'
import AltaUsuario from '@/app/componentes/administrador/usuarios/altaUsuario.jsx'
import axios from '@/utils/axios'
import { hashPassword } from '@/utils/utils'
import validators from '@/utils/validators'

function RegistrarPage () {
  const breadcrumbs = ['privado', 'Administrador', 'Usuarios', 'Alta']
  const [estado, setEstado] = useState({ message: '', estado: '' })
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    ci: '',
    email: '',
    password: '',
    telefono: '',
    rol: ''
  })
  const [errors, setErrors] = useState({
    nombre: null,
    apellido: null,
    ci: null,
    email: null,
    password: null,
    telefono: null,
    rol: null
  })
  const [isSidebarToggled, setIsSidebarToggled] = useState(false)
  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled)
  }

  const isFormValid = () => {
    return (
      Object.values(errors).every(error => error === '') &&
      Object.values(formData).every(value => value !== '')
    )
  }

  const handleValidation = (name, value) => {
    let error = ''

    if (name === 'ci') {
      error = validators.validateRequired(value)
      if (!error) {
        error = validators.validateCi(value)
      }
    } else if (name === 'password') {
      error = validators.validateRequired(value)
      if (!error) {
        error = validators.validatePassword(value)
      }
    } else if (name === 'email') {
      error = validators.validateRequired(value)
      if (!error) {
        error = validators.validateEmail(value)
      }
    } else {
      error = validators.validateRequired(value)
    }

    setErrors(prevState => ({
      ...prevState,
      [name]: error
    }))
  }

  const handleChange = e => {
    const { name, value } = e.target

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))

    handleValidation(name, value)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!isFormValid()) {
      return
    }

    try {
      const hashedPassword = await hashPassword(formData.password)
      const updatedFormData = {
        ...formData,
        password: hashedPassword
      }
      const { data, status } = await axios.post(
        'Administrador/altaUsuario',
        updatedFormData
      )
      setEstado({
        message: data.message,
        estado: status === 200 ? 'success' : 'error'
      })
    } catch (error) {
      setEstado({
        message: error.response
          ? error.response.data.message
          : 'Error al guardar el usuario',
        estado: error.response ? error.response.status : 500
      })
    }
  }

  return (
    <body
      className={isSidebarToggled ? 'nav-fixed' : 'nav-fixed sidenav-toggled'}
    >
      <NavPrivado
        isSidebarToggled={isSidebarToggled}
        toggleSidebar={toggleSidebar}
      />
      <div id='layoutSidenav'>
        <div id='layoutSidenav_nav'>
          <Sidebar isSidebarToggled={isSidebarToggled} />
        </div>
        <div id='layoutSidenav_content'>
          <div id='layoutAuthentication'>
            <div id='layoutAuthentication_content'>
              <main>
                <HeaderPagePrivado breadcrumbs={breadcrumbs} />
                <AltaUsuario
                  formData={formData}
                  estado={estado}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  errors={errors}
                  isFormValid={isFormValid}
                />
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default RegistrarPage
