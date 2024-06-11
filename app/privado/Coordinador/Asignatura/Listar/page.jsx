'use client'
import React, { useEffect, useState } from 'react'
import axios from '@/utils/axios'
import Sidebar from '@/app/componentes/siders/sidebar'
import NavPrivado from '@/app/componentes/navs/nav-privado'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado'
import AsignaturaListAsignatura from '@/app/componentes/coordinador/asignatura/listar/AsignaturaListAsignatura'
import AsignaturaListCarrera from '@/app/componentes/coordinador/asignatura/listar/AsignaturaListCarrera'
import AsignaturaListarPasos from '@/app/componentes/coordinador/asignatura/listar/AsignaturaPasos'
import { useSidebar } from '@/context/AppContext'

function CoordinadorListarAsignatura () {
  const breadcrumbs = ['privado', 'Coordinador', 'Asignatura', 'Listar']
  const [listaCarrera, setListaCarrera] = useState([])
  const [listaAsignatura, setListaAsignatura] = useState([])
  const [selectedCarreraId, setSelectedCarreraId] = useState(null)
  const [selectedAsignaturaId, setSelectedAsignaturaId] = useState(null)
  const [cargando, setCargando] = useState(true);
  const handleCarreraChange = id => {
    setSelectedCarreraId(id)
    setFormData({
      ...formData
    })
  }
  const { isSidebarToggled } = useSidebar()

  const handleAsignaturaChange = event => {
    const selectedId = event.target.value
    setFormData({
      ...formData,
      idAsignatura: selectedId
    })
    setSelectedAsignaturaId(selectedId)
  }

  const [estado, setEstado] = useState({
    message: '',
    estado: ''
  })

  const [formData, setFormData] = useState({
    idAsignatura: ''
  })
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  useEffect(() => {
    const fetchListaCarreras = async () => {
      try {
        const response = await axios.get('Coordinador/listarCarrera')
        setListaCarrera(response.data)
      } catch (error) {
        console.error('Error fetching listaCarreras:', error)
      }
    }

    fetchListaCarreras()
  }, [])

  useEffect(() => {
    const fetchListaAsignaturas = async () => {
      setCargando(true);
      try {
        const response = await axios.get(
          'Coordinador/listarAsignatura?idCarrera=' + selectedCarreraId
        )
        setCargando(false);
        setListaAsignatura(response.data)
      } catch (error) {
        setCargando(false);
        console.error('Error fetching listaAsignatura:', error)
      }
    }
    fetchListaAsignaturas()
  }, [selectedCarreraId])

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
                <AsignaturaListarPasos
                  selectedCarreraId={selectedCarreraId}
                  selectedAsignaturaId={selectedAsignaturaId}
                />
                {selectedCarreraId === null ? (
                  <AsignaturaListCarrera
                    listaCarrera={listaCarrera}
                    onCarreraChange={handleCarreraChange}
                  />
                ) : (
                  <AsignaturaListAsignatura
                    cargando={cargando}
                    listaAsignaturas={listaAsignatura}
                    handleAsignaturaChange={handleAsignaturaChange}
                    handleChange={handleChange}
                    estado={estado}
                    formData={formData}
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

export default CoordinadorListarAsignatura
