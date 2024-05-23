'use client'
import React, { useState, useEffect } from 'react'
import axios from '@/utils/axios'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx'
import InscripcionAsignaturaPasos from '@/app/componentes/estudiantes/asignatura/inscripcionAsignaturaPasos'
import ListarCarreras from '@/app/componentes/reutilizables/listarCarreras'
import ListarAsignaturas from '@/app/componentes/reutilizables/listarAsignaturas'

export default function InscripcionAsignatura () {
  const breadcrumbs = ['privado', 'Estudiante', 'Asignatura']
  const [isSidebarToggled, setIsSidebarToggled] = useState(false)
  // Carreras
  const [carreers, setCareers] = useState([])
  const [careesAreLoading, setCareesAreLoading] = useState(true)
  const [selectedCareerId, setselectedCareerId] = useState(null)
  // Asignaturas
  const [subjects, setSubjects] = useState([])
  const [subjectsAreLoading, setSubjectsAreLoading] = useState(true)
  const [selectedSubjectId, setselectedSubjectId] = useState(null)
  // Estado
  const [estado, setEstado] = useState({
    message: '',
    estado: ''
  })

  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled)
  }

  const handleCareerChange = e => {
    setselectedCareerId(e.target.value)
  }

  const handleSubjectChange = e => {
    setselectedSubjectId(e.target.value)
  }

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await axios.get('/Funcionario/listarCarrera')
        const { status, data } = response
        if (status === 200) {
          setCareers([...data.items])
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
  }, [])

  useEffect(() => {
    if (selectedCareerId) {
      const fetchSubjects = async () => {
        try {
          const response = await axios.get(
            `/Funcionario/listarAsignatura?idCarrera=${selectedCareerId}`
          )
          const { status, data } = response
          if (status === 200) {
            setSubjects([...data.items])
            setSubjectsAreLoading(false)
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
                <InscripcionAsignaturaPasos
                  selectedCareerId={selectedCareerId}
                  selectedSubjectId={selectedSubjectId}
                />
                <div className='container-xl px-4'>
                  <div className='card'>
                    <div className='card shadow-lg border-0 rounded-lg'>
                      {selectedCareerId === null ? (
                        <>
                          <div className='card-header justify-content-center'>
                            <h3 className='fw-light'>Seleccionar carrera</h3>
                          </div>{' '}
                          <ListarCarreras
                            carreras={carreers}
                            estanCargandoCarreras={careesAreLoading}
                            seleccionarCarrera={handleCareerChange}
                          />
                          <div className='card-footer text-center'></div>
                        </>
                      ) : (
                        <>
                          <div className='card-header justify-content-center'>
                            <h3 className='fw-light'>Seleccionar asignatura</h3>
                          </div>{' '}
                          <ListarAsignaturas
                            asignaturas={subjects}
                            estanCargandoAsignaturas={subjectsAreLoading}
                            seleccionarAsignatura={handleSubjectChange}
                          />
                          <div className='card-footer text-center'>
                            <button className='btn btn-primary'>
                              Guardar
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}
