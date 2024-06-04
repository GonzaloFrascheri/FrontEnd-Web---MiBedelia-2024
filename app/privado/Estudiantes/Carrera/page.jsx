'use client'
import React, { useEffect, useState } from 'react'
import NavPrivado from '@/app/componentes/navs/nav-privado'
import Sidebar from '@/app/componentes/siders/sidebar'
import InscripcionCarrera from '@/app/componentes/estudiantes/carrera/inscripcionCarrera'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado'
import axios from '@/utils/axios'
import { useAuth } from '@/context/AuthProvider'
import { useSidebar } from '@/context/AppContext'

function EstudianteInscripcionCarrera () {
  const authData = useAuth()
  const breadcrumbs = ['privado', 'Estudiantes', 'Carrera']
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
          const response = await axios.get('/Estudiante/listarCarrera')
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

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const response = await axios.post(
        `/Estudiante/inscripcionCarrera?carreraId=${selectedCareer}&estudianteId=${userData.id}`
      )
      setEstado({
        message: response.data.message,
        estado: response.status
      })
    } catch (error) {
      setEstado({
        message: error.response
          ? error.response.data.message
          : 'Error al inscribirse a la carrera',
        estado: error.response ? error.response.status : 500
      })
    }
  }

  const onCareerChange = e => {
    setSelectedCareer(e.target.value)
  }

  // If failed, reset form status
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
                <InscripcionCarrera
                  resetearForm={resetFormStatus}
                  carreraSeleccionada={selectedCareer}
                  estanCargandoCarreras={careesAreLoading}
                  carreras={careers}
                  seleccionarCarrera={onCareerChange}
                  estado={estado}
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

export default EstudianteInscripcionCarrera
