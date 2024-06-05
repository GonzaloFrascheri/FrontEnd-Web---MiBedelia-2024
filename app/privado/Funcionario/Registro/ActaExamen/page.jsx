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
import ExamenRegistrar from '@/app/componentes/funcionario/registro/acta/examenRegistrar.jsx'

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
    const [examenDto, setExamenDto] = useState([])
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
        idExamen: null,
        nombreExamen: '',
        archivoExcel: null
    })

    // Carreras
    const [listaCarrera, setListaCarrera] = useState([])
    const handleCarreraChange = selectedCarrera => {
        setFormData({
            ...formData,
            idCarrera: selectedCarrera.id,
            nombreCarrera: selectedCarrera.nombre,
        })
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
    const handleChangeExamen = (event) => {
        const selectedId = Number(event.target.value);
        const selectedExamen = listaExamen.find(
            examen => examen.id === selectedId
        )
        setFormData({
            ...formData,
            idExamen: selectedExamen.id,
            nombreExamen: selectedExamen.nombreAsignatura,
        });
    }
    // Fetch lista de examenes
    useEffect(() => {
        const fetchListaExamenes = async () => {
            try {
                const response = await axios.get(
                    'Funcionario/listarExamenesPeriodo?idCarrera=' + formData.idCarrera
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
    }, [formData.idCarrera])

    // Fetch examenDto
    useEffect(() => {
        const fetchExamenDto = async () => {
            try {
                const response = await axios.get(
                    'Funcionario/generarActaExamen?idExamen=' + formData.idExamen
                )
                setEstado({
                    ...estado,
                    paso: 3
                })
                setListasInfo({
                    cu: 'Registro de examen',
                    tituloInfo: 'Paso 3: Analizar archivo.',
                    mensajeInfo: 'Seleccione un archivo Excel con los datos de los estudiantes.'
                })
                setExamenDto(response.data)
            } catch (error) {
                console.error('Error fetching examenDto:', error)
            }
        }
        fetchExamenDto()
    }, [formData.idExamen])

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
                                {formData.idCarrera === null ? (
                                    <ListarCarrerasInfo
                                        listaCarrera={listaCarrera}
                                        onCarreraChange={handleCarreraChange}
                                        listasInfo={listasInfo}
                                    />
                                ) : formData.idExamen === null ? (
                                    <ListarExamenesInfo
                                        listaExamen={listaExamen}
                                        handleChangeExamen={handleChangeExamen}
                                        listasInfo={listasInfo}
                                        formData={formData}
                                    />
                                ) : (
                                    <ExamenRegistrar
                                        setFormData={setFormData}
                                        estado={estado}
                                        setEstado={setEstado}
                                        listasInfo={listasInfo}
                                        formData={formData}
                                        examenDto={examenDto}
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