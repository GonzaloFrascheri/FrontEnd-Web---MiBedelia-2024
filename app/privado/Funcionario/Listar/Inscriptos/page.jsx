'use client'
import React, { useEffect, useState } from 'react'
import axios from '@/utils/axios'
import Sidebar from '@/app/componentes/siders/sidebar'
import NavPrivado from '@/app/componentes/navs/nav-privado'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado'
import ListarInscriptosAsignaturas from '@/app/componentes/funcionario/listar/ListarInscriptosAsignaturas'
import ListarInscriptosCarreras from '@/app/componentes/funcionario/listar/ListarInscriptosCarreras'
import ListarInscriptosPasos from '@/app/componentes/funcionario/listar/ListarInscriptosPasos'
import { useSidebar } from '@/context/AppContext'

function FuncionarioListarInscriptos () {
  const breadcrumbs = ['privado', 'Funcionario', 'Listar', 'Inscriptos']
  const [listaCarrera, setListaCarrera] = useState([])
  const [listaAsignatura, setListaAsignatura] = useState([])
  const [selectedCarreraId, setSelectedCarreraId] = useState(null)
  const [selectedAsignaturaId, setSelectedAsignaturaId] = useState(null)
  const [estado, setEstado] = useState({ message: '', estado: '' })
  const [formData, setFormData] = useState({ idAsignatura: '' })
  const { isSidebarToggled } = useSidebar()

  const handleCarreraChange = id => {
    setSelectedCarreraId(id)
    setFormData({
      ...formData
    })
  }

  const handleAsignaturaChange = event => {
    const selectedId = event.target.value
    setFormData({
      ...formData,
      idAsignatura: selectedId
    })
    setSelectedAsignaturaId(selectedId)
  }

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
        const response = await axios.get('Funcionario/listarCarrera')
        setListaCarrera(response.data)
      } catch (error) {
        console.error('Error fetching listaCarreras:', error)
      }
    }

    fetchListaCarreras()
  }, [])

  useEffect(() => {
    const fetchListaAsignaturas = async () => {
      try {
        const response = await axios.get(`/Funcionario/listarAsignatura?idCarrera=${selectedCarreraId}`)
        setListaAsignatura(response.data);
      } catch (error) {
        console.error('Error fetching listaAsignatura:', error)
      }
    }
    fetchListaAsignaturas();
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
                <ListarInscriptosPasos
                  selectedCarreraId={selectedCarreraId}
                  selectedAsignaturaId={selectedAsignaturaId}
                />
                {selectedCarreraId === null ? (
                  <ListarInscriptosCarreras
                    listaCarrera={listaCarrera}
                    onCarreraChange={handleCarreraChange}
                  />
                ) : (
                  <ListarInscriptosAsignaturas
                    listaAsignaturas={listaAsignatura}
                    handleAsignaturaChange={handleCarreraChange}
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

export default FuncionarioListarInscriptos
