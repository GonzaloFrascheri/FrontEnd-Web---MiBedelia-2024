'use client'
import React, { useState, useEffect } from 'react'
import axios from '@/utils/axios'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx'
import InscripcionAsignatura from '@/app/componentes/estudiantes/asignatura/inscripcionAsignatura'
import { useAuth } from '@/context/AuthProvider'

export default function EstudianteInscripcionAsignatura () {
  const authData = useAuth()
  const breadcrumbs = ['privado', 'Estudiante', 'Asignatura']
  const [isSidebarToggled, setIsSidebarToggled] = useState(false)
  // Carreras
  const [carreers, setCareers] = useState([])
  const [careersAreLoading, setcareersAreLoading] = useState(true)
  const [selectedCareerId, setSelectedCareerId] = useState('')
  // Asignaturas
  const [subjects, setSubjects] = useState([])
  const [subjectsAreLoading, setSubjectsAreLoading] = useState(true)
  const [selectedSubjectId, setSelectedSubjectId] = useState('')
  const [userData, setUserData] = useState(null)
  // Estado
  const [estado, setEstado] = useState({
    message: '',
    estado: ''
  })

  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled)
  }

  const handleCareerChange = e => {
    setSelectedCareerId(e.target.value)
  }

  const handleSubjectChange = e => {
    setSelectedSubjectId(e.target.value)
  }

  useEffect(() => {
    if (authData && !userData) {
      setUserData(authData)
    }
  }, [authData, userData])

  useEffect(() => {
    if (userData) {
      const fetchCareers = async () => {
        try {
          setcareersAreLoading(true)
          const response = await axios.get(
            `/Estudiante/getCarreraInscripto?idEstudiante=${userData.id}`
          )
          const { status, data } = response
          if (status === 200) {
            setCareers([...data])
            setcareersAreLoading(false)
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

  useEffect(() => {
    if (selectedCareerId) {
      const fetchSubjects = async () => {
        try {
          setSubjectsAreLoading(true)
          const response = await axios.get(
            `/Estudiante/getAsignaturasAbiertas?idCarrera=${selectedCareerId}`
          )
          const { data } = response

          setSubjects([...data])
          setSubjectsAreLoading(false)

          if (!data.length) {
            setEstado({
              message: 'No hay asignaturas para esta carrera',
              estado: 404
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

      fetchSubjects()
    }
  }, [selectedCareerId])

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const response = await axios.post(
        `/Estudiante/inscripcionAsignatura?estudianteId=${userData.id}&asignaturaId=${selectedSubjectId}&carreraId=${selectedCareerId}`
      )
      const { status, data } = response

      setEstado({
        message: data.message,
        estado: status
      })
    } catch (error) {
      setEstado({
        message: error.response
          ? error.response.data.message
          : 'Error al inscribirse a la asignatura',
        estado: error.response ? error.response.status : 500
      })
    }
  }

  const resetFormStatus = () => {
    setEstado({
      message: '',
      estado: ''
    })
    // Reset careers
    setSelectedCareerId('')
    setCareers(prevState => [...prevState])
    // Reset subjects
    setSelectedSubjectId('')
    setSubjects(prevState => [...prevState])
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
                <InscripcionAsignatura
                  estado={estado}
                  handleSubmit={handleSubmit}
                  carreras={carreers}
                  carreraSeleccionada={selectedCareerId}
                  seleccionarCarrera={handleCareerChange}
                  estanCargandoCarreras={careersAreLoading}
                  asignaturas={subjects}
                  asignaturaSeleccionada={selectedSubjectId}
                  seleccionarAsignatura={handleSubjectChange}
                  estanCargandoAsignaturas={subjectsAreLoading}
                  resetearForm={resetFormStatus}
                />
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}
