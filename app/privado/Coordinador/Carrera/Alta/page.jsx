'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx'
import AltaCarrera from '@/app/componentes/coordinador/carrera/altaCarrera.jsx'
import axios from '@/utils/axios'
import { useSidebar } from '@/context/AppContext'

function CoordinadorAltaCarrera () {
  const breadcrumbs = ['privado', 'Coordinador', 'Carrera', 'Alta']
  const [estado, setEstado] = useState({
    message: '',
    estado: ''
  })
  const [formData, setFormData] = useState({
    nombre: '',
    duracion: ''
  })
  const { isSidebarToggled } = useSidebar()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('Coordinador/altaCarrera', formData)
      setEstado({
        message: 'Carrera guardada con éxito',
        estado: response.status
      })
    } catch (error) {
      setEstado({
        message: error.response
          ? error.response.data.message
          : 'Error al guardar la carrera',
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
                <AltaCarrera
                  formData={formData}
                  estado={estado}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                />
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default CoordinadorAltaCarrera
