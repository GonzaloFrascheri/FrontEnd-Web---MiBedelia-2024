'use client'
import React, { useState, useEffect } from 'react'
import axios from '@/utils/axios'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx'
import { useSidebar } from '@/context/AppContext'
import ModificarHorarioExamenPasos from '@/app/componentes/funcionario/modificar/modificarHorarioExamenPasos'
import ModificarHorarioExamenForm from '@/app/componentes/funcionario/modificar/modificarHorarioExamen'

export default function ModificarHorarioExamen () {
  const breadcrumbs = ['privado', 'Funcionario', 'Modificar', 'HorarioExamen']
  const [estado, setEstado] = useState({ estado: '', message: '' })
  // Carreras
  const [listaCarrera, setListaCarrera] = useState([])
  const [selectedCarreraId, setSelectedCarreraId] = useState('')
  const [estanCargandoCarreras, setEstanCargandoCarreras] = useState(true)
  // Examenes
  const [listaExamen, setListaExamen] = useState([])
  const [selectedExamen, setSelectedExamen] = useState('')
  const [estanCargandoExamenes, setEstanCargandoExamenes] = useState(true)
  // Horarios

  const { isSidebarToggled } = useSidebar()

  const handleCarreraChange = e => {
    e.preventDefault()
    setSelectedCarreraId(e.target.value)
  }

  const handleExamenChange = examen => {
    setSelectedExamen(examen)
  }

  // Fetch lista de carreras
  useEffect(() => {
    const fetchListaCarreras = async () => {
      try {
        setEstanCargandoCarreras(true)
        const response = await axios.get('Funcionario/listarCarrera')
        setListaCarrera(response.data)
        setEstanCargandoCarreras(false)
      } catch (error) {
        console.error('Error fetching listaCarreras:', error)
      }
    }

    fetchListaCarreras()
  }, [])

  // Fetch lista de asignaturas
  useEffect(() => {
    if (selectedCarreraId) {
      const fetchListaExamenes = async () => {
        try {
          setEstanCargandoExamenes(true)
          const response = await axios.get(
            `/Funcionario/listarExamenesPeriodo?idCarrera=${selectedCarreraId}`
          )
          setListaExamen(response.data)
          setEstanCargandoExamenes(false)
        } catch (error) {
          console.error('Error fetching listaAsignatura:', error)
        }
      }
      fetchListaExamenes()
    }
  }, [selectedCarreraId])

  const handleSubmit = async formData => {
    // try {
    //   const { data, status } = await axios.put(
    //     '/Funcionario/modificarHorarioAsignatura',
    //     formData
    //   )
    //   setEstado({
    //     message: data.message,
    //     estado: status
    //   })
    // } catch (error) {
    //   setEstado({
    //     message: error.response
    //       ? error.response.data.message
    //       : 'Error al registrar el horario',
    //     estado: error.response ? error.response.status : 500
    //   })
    // }
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

                <ModificarHorarioExamenPasos
                  selectedCarreraId={selectedCarreraId}
                  selectedExamenId={selectedExamen}
                />

                <ModificarHorarioExamenForm
                  estado={estado}
                  handleSubmit={handleSubmit}
                  carreras={listaCarrera}
                  seleccionarCarrera={handleCarreraChange}
                  estanCargandoCarreras={estanCargandoCarreras}
                  carreraSeleccionada={selectedCarreraId}
                  examenes={listaExamen}
                  seleccionarExamen={handleExamenChange}
                  estanCargandoExamenes={estanCargandoExamenes}
                  examenSeleccionado={selectedExamen}
                />
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}
