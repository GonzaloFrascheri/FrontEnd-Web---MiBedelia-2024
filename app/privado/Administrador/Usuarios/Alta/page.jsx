'use client'
import React, { useState } from 'react'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx'
import AltaUsuario from '@/app/componentes/administrador/usuarios/altaUsuario.jsx'
import axios from '@/utils/axios'
import {
  hashPassword,
  isFormValid
} from '@/utils/utils'
import { handleRegisterFormValidation } from '@/utils/validators'
import { useSidebar } from '@/context/AppContext'

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
  const { isSidebarToggled } = useSidebar()

  const handleFormValidation = () => {
    return isFormValid(errors, formData)
  }

  const handleValidation = (name, value) => {
    const error = handleRegisterFormValidation(name, value)

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

    if (!handleFormValidation(errors, formData)) {
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
      <NavPrivado />
      <div id='layoutSidenav'>
        <div id='layoutSidenav_nav'>
          <Sidebar />
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
                  isFormValid={handleFormValidation}
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
