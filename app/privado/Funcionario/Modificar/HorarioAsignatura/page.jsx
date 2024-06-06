'use client'
import React, { useState, useEffect } from 'react'
import axios from '@/utils/axios'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx'
import { useSidebar } from '@/context/AppContext'
import ModificarHorarioForm from '@/app/componentes/funcionario/modificar/modificarHorarioAsignatura'
import ModificarHorarioAsignaturaPasos from '@/app/componentes/funcionario/modificar/modificarHorarioAsignaturaPasos'

export default function ModificarHorarioAsignatura () {
  const breadcrumbs = [
    'privado',
    'Funcionario',
    'Modificar',
    'HorarioAsignatura'
  ]
  const [estado, setEstado] = useState({ estado: '', message: '' })
  // Carreras
  const [listaCarrera, setListaCarrera] = useState([])
  const [selectedCarreraId, setSelectedCarreraId] = useState('')
  const [estanCargandoCarreras, setEstanCargandoCarreras] = useState(true)
  // Asignaturas
  const [listaAsignatura, setListaAsignatura] = useState([])
  const [selectedAsignaturaId, setSelectedAsignaturaId] = useState('')
  const [estanCargandoAsignaturas, setEstanCargandoAsignaturas] = useState(true)
  // Horarios
  const [listaHorarios, setListaHorarios] = useState([])
  const [selectedHorarioId, setSelectedHorarioId] = useState('')
  const [estanCargandoHorarios, setEstanCargandoHorarios] = useState(true)
  const { isSidebarToggled } = useSidebar()

  const handleCarreraChange = e => {
    e.preventDefault()
    setSelectedCarreraId(e.target.value)
  }

  const handleChangeAsignatura = e => {
    e.preventDefault()
    setSelectedAsignaturaId(e.target.value)
  }

  const handleHorarioChange = id => {
    const horario = listaHorarios.find(horario => horario.id === id)
    setSelectedHorarioId(horario)
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
      const fetchListaAsignatura = async () => {
        try {
          setEstanCargandoAsignaturas(true)
          const response = await axios.get(
            `Funcionario/listarAsignatura?idCarrera=${selectedCarreraId}`
          )
          setListaAsignatura(response.data)
          setEstanCargandoAsignaturas(false)
        } catch (error) {
          console.error('Error fetching listaAsignatura:', error)
        }
      }
      fetchListaAsignatura()
    }
  }, [selectedCarreraId])

  // Fetch lista de horarios de asignatura
  useEffect(() => {
    if (selectedAsignaturaId) {
      const fetchHorariosAsignatura = async () => {
        try {
          setEstanCargandoHorarios(true)
          const { data } = await axios.get(
            `/Funcionario/getAsignatura?idAsignatura=${selectedAsignaturaId}`
          )
          setListaHorarios(data.horarios)
          setEstanCargandoHorarios(false)
        } catch (error) {
          console.error('Error fetching subject schedules:', error)
        }
      }

      fetchHorariosAsignatura()
    }
  }, [selectedAsignaturaId])

  const handleSubmit = async formData => {
    try {
      const { data, status } = await axios.put(
        '/Funcionario/modificarHorarioAsignatura',
        formData
      )
      setEstado({
        message: data.message,
        estado: status
      })
    } catch (error) {
      setEstado({
        message: error.response
          ? error.response.data.message
          : 'Error al registrar el horario',
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

                <ModificarHorarioAsignaturaPasos
                  selectedCarreraId={selectedCarreraId}
                  selectedAsignaturaId={selectedAsignaturaId}
                  selectedHorarioId={selectedHorarioId}
                />

                <ModificarHorarioForm
                  estado={estado}
                  handleSubmit={handleSubmit}
                  carreras={listaCarrera}
                  seleccionarCarrera={handleCarreraChange}
                  estanCargandoCarreras={estanCargandoCarreras}
                  carreraSeleccionada={selectedCarreraId}
                  asignaturas={listaAsignatura}
                  seleccionarAsignatura={handleChangeAsignatura}
                  estanCargandoAsignaturas={estanCargandoAsignaturas}
                  asignaturaSeleccionada={selectedAsignaturaId}
                  horarios={listaHorarios}
                  horarioSeleccionado={selectedHorarioId}
                  seleccionarHorario={handleHorarioChange}
                  estanCargandoHorarios={estanCargandoHorarios}
                />
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}
