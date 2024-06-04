'use client'
import React, { useState } from 'react'
import axios from '@/utils/axios'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx'
import AltaDocente from '@/app/componentes/funcionario/alta/altaDocente.jsx'
import { useSidebar } from '@/context/AppContext'

function AltaDocentePage () {
  const breadcrumbs = ['privado', 'Funcionario', 'AltaDocente']
  const [estado, setEstado] = useState({
    message: '',
    estado: ''
  })
  const [docenteDto, setDocenteDto] = useState({
    nombre: '',
    apellido: '',
    ci: ''
  })

  const { isSidebarToggled } = useSidebar()

  const handleChange = e => {
    setDocenteDto({
      ...docenteDto,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async e => {
    e.preventDefault()

    // Verifying that the form fields are not empty
    const emptyFields = Object.values(docenteDto).some(value => value === '')
    if (emptyFields) {
      alert('Los campos no pueden estar vacios.')
      return
    }

    try {
      // envío datos al bk
      const { data, status } = await axios.post(
        'Funcionario/altaDocente',
        docenteDto
      )
      // si la data es ok - docente fue dado de alta
      if (status === 200) {
        setEstado({
          message: data.message,
          estado: data.estado
        })
      } else {
        setEstado({
          message: data.message,
          estado: data.status
        })
      }
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
                <AltaDocente
                  estado={estado}
                  docenteDto={docenteDto}
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

export default AltaDocentePage
