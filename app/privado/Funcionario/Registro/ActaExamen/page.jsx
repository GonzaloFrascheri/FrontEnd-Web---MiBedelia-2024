'use client'
import React, { useState, useEffect } from 'react'
import axios from '@/utils/axios'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx'
import { useAuth } from '@/context/AuthProvider'
import { useSidebar } from '@/context/AppContext'
import ExamenPasos from '@/app/componentes/funcionario/registro/acta/examenPasos.jsx'
import ListarCarrerasInfo from '@/app/componentes/reutilizables/listarCarrerasInfo.jsx'
import ListarExamenesInfo from '@/app/componentes/reutilizables/listarExamenesInfo.jsx'

export default function FuncionarioRegistroActaExamen () {
    // Global state
    const authData = useAuth()
    const [userData, setUserData] = useState(null)
    useEffect(() => {
      if (authData && !userData) {
        setUserData(authData)
      }
    }, [authData, userData])
    const { isSidebarToggled } = useSidebar()
    // Breadcrumbs
    const breadcrumbs = ['privado', 'Funcionario', 'Registro', 'ActaExamen']
    // estado
    const [estado, setEstado] = useState({
        message: '',
        estado: '',
        paso: 1,
        paso1: 'step-item active',
        paso2: 'step-item',
        paso3: 'step-item',
        paso4: 'step-item'
    })
    const [listasInfo, setListasInfo] = useState({
        cu: 'Registro de examen',
        tituloInfo: 'Paso 1: Seleccionar una carrera.',
        mensajeInfo: 'Utilice el selector: "Lista de carreras", despliéguelo y seleccione la carrera.',
    })
    // formData
    const [formData, setFormData] = useState({
        idCarrera: null,
        nombreCarrera: '',
        idAsignatura: null,
        nombreAsignatura: '',
        archivoExcel: null
    })

    // Carreras
    const [listaCarrera, setListaCarrera] = useState([])
    const [selectedCarreraId, setSelectedCarreraId] = useState(null)
    const [selectedCarreraNombre, setSelectedCarreraNombre] = useState('')
    const handleCarreraChange = selectedCarrera => {
        setSelectedCarreraId(selectedCarrera.id)
        setSelectedCarreraNombre(selectedCarrera.nombre)
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

    // Examen
    const [listaExamen, setListaExamen] = useState([])
    const [selectedExamenId, setSelectedExamenId] = useState(null)
    const [examenDto, setExamenDto] = useState([])
    const handleChangeExamen = id => {
        setSelectedExamenId(id)
    }
    // Fetch lista de examenes
    useEffect(() => {
        const fetchListaExamenes = async () => {
            try {
            const response = await axios.get(
                'Funcionario/listarExamenesPeriodo?idCarrera=' + selectedCarreraId
            )
            setEstado({
                ...estado,
                paso: 2
            })
            setListasInfo({
                cu: 'Registro de examen',
                tituloInfo: 'Paso 2: Seleccionar un examen.',
                mensajeInfo: 'Utilice el selector: "Lista de examenes", despliéguelo y seleccione el examen.'
            })
            setListaExamen(response.data)
            } catch (error) {
            console.error('Error fetching listaExamenes:', error)
            }
        }
        fetchListaExamenes()
    }, [selectedCarreraId])

    return (
        <body className={isSidebarToggled ? 'nav-fixed' : 'nav-fixed sidenav-toggled'} >
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
                                <ExamenPasos estado={estado} setEstado={setEstado} />
                                {selectedCarreraId === null ? (
                                <ListarCarrerasInfo
                                    listaCarrera={listaCarrera}
                                    onCarreraChange={handleCarreraChange}
                                    listasInfo={listasInfo}
                                />
                                ) : selectedExamenId === null ? (
                                    <ListarExamenesInfo
                                        listaExamen={listaExamen}
                                        handleChangeExamen={handleChangeExamen}
                                        selectedExamenId={selectedExamenId}
                                        listasInfo={listasInfo}
                                        ExamenDto={examenDto}
                                    />
                                  ) : (
                                    <>  hola</>
                                )}
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}