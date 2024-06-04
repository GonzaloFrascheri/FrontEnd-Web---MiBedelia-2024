'use client'

import React, { useEffect, useState } from 'react'
import NavPrivado from '@/app/componentes/navs/nav-privado'
import Sidebar from '@/app/componentes/siders/sidebar'
import AsignaturasPendientes from '@/app/componentes/estudiantes/asignatura/pendientes/asignaturasPendientes'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado'
import axios from '@/utils/axios'
import { useAuth } from '@/context/AuthProvider'
import { useSidebar } from '@/context/AppContext'

function EstudianteAignaturasPendientes () {
  const authData = useAuth()
  const breadcrumbs = ['privado', 'Estudiantes', 'Asignatura', 'Pendiente']
  const [estado, setEstado] = useState({
    message: '',
    estado: ''
  })
  const [userData, setUserData] = useState('')
  const [careers, setCareers] = useState([])
  const [careesAreLoading, setCareesAreLoading] = useState(true)
  const [selectedCareer, setSelectedCareer] = useState('')
  const { isSidebarToggled } = useSidebar()

  useEffect(() => {
    if (authData && !userData) {
      setUserData(authData)
    }
  }, [authData, userData])

  useEffect(() => {
    if (userData) {
      const fetchCareers = async () => {
        try {
          const response = await axios.get(
            `/Estudiante/getCarreraInscripto?idEstudiante=${userData.id}`
          )
          const { status, data } = response
          if (status === 200) {
            setCareers([...data])
            setCareesAreLoading(false)
          }
        } catch (error) {
          const { status, data } = error.response
          setEstado({
            estado: status,
            message: data.message
          })
        }
      }
      fetchCareers()
    }
  }, [userData])

  const obtenerAsignaturasPendientes = async () => {
    try {
      const response = await axios.get(
        `/Estudiante/getAsignaturasPendientes?idEstudiante=${userData.id}&idCarrera=${selectedCareer}`
      )
      const { data } = response
      return data
    } catch (error) {
      const { status, data } = error.response
      setEstado({
        estado: status,
        message: data.message
      })
      return []
    }
  }

  // Manejador de cambio de carrera
  const handleCareerChange = e => {
    setSelectedCareer(e.target.value)
  }

  const resetFormStatus = () => {
    setEstado({
      message: '',
      estado: ''
    })
    setSelectedCareer('')
    setCareers(prevState => [...prevState])
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
                <AsignaturasPendientes
                  resetearForm={resetFormStatus}
                  carreraSeleccionada={selectedCareer}
                  estanCargandoCarreras={careesAreLoading}
                  estado={estado}
                  obtenerAsignaturasPendientes={obtenerAsignaturasPendientes}
                />
                {/* Selector de carrera */}
                <select value={selectedCareer} onChange={handleCareerChange}>
                  <option value=''>Selecciona una carrera</option>
                  {careers.map((career, index) => (
                    <option key={index} value={career.id}>
                      {career.nombre}
                    </option>
                  ))}
                </select>
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default EstudianteAignaturasPendientes
