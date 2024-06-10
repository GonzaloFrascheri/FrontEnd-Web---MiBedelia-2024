'use client'
import React, { useState, useEffect } from 'react'
import axios from '@/utils/axios'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx'
import ActaFinDeCursoPasos from '@/app/componentes/funcionario/generar/actaFinDeCursoPasos.jsx'
import ActaFinDeCursoListCarrera from '@/app/componentes/funcionario/generar/actaFinDeCursoListCarrera.jsx'
import ActaFinDeCursoListAsignatura from '@/app/componentes/funcionario/generar/actaFinDeCursoListAsignatura.jsx'
import { useSidebar } from '@/context/AppContext'

export default function Index () {
  const breadcrumbs = ['privado', 'Funcionario', 'Generar', 'ActaFinDeCurso']
  const [listaCarrera, setListaCarrera] = useState([])
  const [listaAsignatura, setListaAsignatura] = useState([])
  const [selectedCarreraId, setSelectedCarreraId] = useState(null)
  const [selectedAsignaturaId, setSelectedAsignaturaId] = useState(null)
  const [finDeCursoDto, setFinDeCursoDto] = useState([])
  const { isSidebarToggled } = useSidebar()

  const handleCarreraChange = id => {
    setSelectedCarreraId(id)
  }

  const handleChangeAsignatura = id => {
    setSelectedAsignaturaId(id)
  }

  // Fetch lista de carreras
  useEffect(() => {
    const fetchListaCarreras = async () => {
      try {
        const response = await axios.get('Funcionario/listarCarrera')
        setListaCarrera(response.data)
      } catch (error) {
        console.error('Error fetching listaCarreras:', error)
      }
    }

    fetchListaCarreras()
  }, [])

  // Fetch lista de asignaturas
  useEffect(() => {
    const fetchListaAsignatura = async () => {
      try {
        const response = await axios.get(
          'Funcionario/listarAsignatura?idCarrera=' + selectedCarreraId
        )
        setListaAsignatura(response.data)
      } catch (error) {
        console.error('Error fetching listaAsignatura:', error)
      }
    }
    fetchListaAsignatura()
  }, [selectedCarreraId])

  // Fetch FinDeCursoDto
  useEffect(() => {
    const fetchListaFinDeCursoDto = async () => {
      try {
        const response = await axios.get(
          'Funcionario/generarActa?idAsignatura=' + selectedAsignaturaId
        )
        setFinDeCursoDto(response.data)
      } catch (error) {
        console.error('Error fetching listaAsignatura:', error)
      }
    }
    fetchListaFinDeCursoDto()
  }, [selectedAsignaturaId])

  // Obtengo la lista de estudiantes de finDeCursoDto directamente, ya que venia undefined estudiantes
  const estudiantes = finDeCursoDto.estudiantes || [];

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
                <ActaFinDeCursoPasos
                  selectedCarreraId={selectedCarreraId}
                  selectedAsignaturaId={selectedAsignaturaId}
                />
                {selectedCarreraId === null ? (
                  <ActaFinDeCursoListCarrera
                    listaCarrera={listaCarrera}
                    onCarreraChange={handleCarreraChange}
                  />
                ) : (
                  <ActaFinDeCursoListAsignatura
                    listaAsignatura={listaAsignatura}
                    handleChangeAsignatura={handleChangeAsignatura}
                    selectedAsignaturaId={selectedAsignaturaId}
                    FinDeCursoDto={finDeCursoDto}
                  />
                )}
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}
