'use client'
import React, { useState, useEffect } from 'react'
import axios from '@/utils/axios'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx'
import FinDeCursoPasos from '@/app/componentes/funcionario/registro/acta/findecursoPasos.jsx'
import FinDeCursoListCarrera from '@/app/componentes/funcionario/registro/acta/findecursoListCarrera.jsx'
import FinDeCursoListAsignatura from '@/app/componentes/funcionario/registro/acta/findecursoListAsignatura.jsx'
import FinDeCursoRegistrar from '@/app/componentes/funcionario/registro/acta/findecursoRegistrar.jsx'
import { useAuth } from '@/context/AuthProvider'
import { useSidebar } from '@/context/AppContext'

export default function FuncionarioActaFinDeCurso () {
  // Breadcrumbs
  const breadcrumbs = ['privado', 'Funcionario', 'Registro', 'ActaFinDeCurso']
  const [finDeCursoDto, setFinDeCursoDto] = useState([])
  // Estado
  const [userData, setUserData] = useState(null)
  const [estado, setEstado] = useState({
    message: '',
    estado: '',
    paso: 1,
    paso1: 'step-item active',
    paso2: 'step-item',
    paso3: 'step-item',
    paso4: 'step-item'
  })
  // formData
  const [formData, setFormData] = useState({
    idCarrera: null,
    nombreCarrera: '',
    idAsignatura: null,
    nombreAsignatura: '',
    archivoExcel: null
  })

  // Global state
  const authData = useAuth()
  const { isSidebarToggled } = useSidebar()

  // Carreras
  const [listaCarrera, setListaCarrera] = useState([])
  const [selectedCarreraId, setSelectedCarreraId] = useState(null)
  const [selectedCarreraNombre, setSelectedCarreraNombre] = useState('')

  const handleCarreraChange = selectedCarrera => {
    setSelectedCarreraId(selectedCarrera.id)
    setSelectedCarreraNombre(selectedCarrera.nombre)
  }

  useEffect(() => {
    if (authData && !userData) {
      setUserData(authData)
    }
  }, [authData, userData])

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

  // Asignaturas
  const [listaAsignatura, setListaAsignatura] = useState([])
  const [selectedAsignaturaId, setSelectedAsignaturaId] = useState(null)
  const [selectedAsignaturaNombre, setSelectedAsignaturaNombre] = useState('')

  const handleAsignaturaChange = event => {
    const selectedId = Number(event.target.value)
    const selectedAsignatura = listaAsignatura.find(
      asignatura => asignatura.id === selectedId
    )
    setSelectedAsignaturaId(selectedAsignatura.id)
    setSelectedAsignaturaNombre(selectedAsignatura.nombre)
    setFormData({
      ...formData,
      idCarrera: selectedCarreraId,
      nombreCarrera: selectedCarreraNombre,
      idAsignatura: selectedAsignatura.id,
      nombreAsignatura: selectedAsignatura.nombre
    })
  }
  // Fetch lista de asignaturas
  useEffect(() => {
    const fetchListaAsignaturas = async () => {
      try {
        const response = await axios.get(
          'Funcionario/listarAsignatura?idCarrera=' + selectedCarreraId
        )
        setEstado({
          ...estado,
          paso: 2
        })
        setListaAsignatura(response.data)
      } catch (error) {
        console.error('Error fetching listaAsignatura:', error)
      }
    }
    fetchListaAsignaturas()
  }, [selectedCarreraId])

  // Fetch FinDeCursoDto
  useEffect(() => {
    const fetchListaFinDeCursoDto = async () => {
      try {
        const response = await axios.get(
          'Funcionario/generarActa?idAsignatura=' + selectedAsignaturaId
        )
        setEstado({
          ...estado,
          paso: 3
        })
        setFinDeCursoDto(response.data)
      } catch (error) {
        console.error('Error fetching listaAsignatura:', error)
      }
    }
    fetchListaFinDeCursoDto()
  }, [selectedAsignaturaId])

  const isFormValid = () =>
    Object.values(formData).every(value => value !== null)

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
                <FinDeCursoPasos estado={estado} setEstado={setEstado} />
                {selectedCarreraId === null ? (
                  <FinDeCursoListCarrera
                    listaCarrera={listaCarrera}
                    onCarreraChange={handleCarreraChange}
                  />
                ) : selectedAsignaturaId === null ? (
                  <FinDeCursoListAsignatura
                    selectedCarreraNombre={selectedCarreraNombre}
                    listaAsignaturas={listaAsignatura}
                    handleAsignaturaChange={handleAsignaturaChange}
                    formData={formData}
                    estado={estado}
                    isFormValid={isFormValid}
                  />
                ) : (
                  <FinDeCursoRegistrar
                    setFormData={setFormData}
                    estado={estado}
                    setEstado={setEstado}
                    formData={formData}
                    isFormValid={isFormValid}
                    FinDeCursoDto={finDeCursoDto}
                  />
                )}
                ;
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}
