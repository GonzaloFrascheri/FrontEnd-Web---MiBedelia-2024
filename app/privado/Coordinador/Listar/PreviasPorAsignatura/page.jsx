'use client'
import React, { useState, useEffect } from 'react'
import axios from '@/utils/axios'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx'
import { useAuth } from '@/context/AuthProvider'
import { useSidebar } from '@/context/AppContext'
import ListarPreviasPorAsignaturaPasos from '@/app/componentes/coordinador/listar/previasporasignatura/previasPorAsignaturaPasos.jsx'
import ListarCarrerasInfo from '@/app/componentes/reutilizables/listarCarrerasInfo.jsx'
import ListAsignaturaInfo from '@/app/componentes/reutilizables/listarAsignaturasInfo.jsx'
import ListPreviaInfo from '@/app/componentes/reutilizables/listarPreviasInfo.jsx'

export default function CoordinadorRegistrarPreviatura () {
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
    const breadcrumbs = ['privado', 'Coordinador', 'Listar', 'PreviasPorAsignatura']
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
        cu: 'Listar previas por asignatura',
        tituloInfo: 'Paso 1: Seleccionar una carrera.',
        mensajeInfo: 'Utilice el selector: "Lista de carreras", despliéguelo y seleccione la carrera.',
    })
    // formData
    const [formData, setFormData] = useState({
        idCarrera: null,
        nombreCarrera: '',
        idAsignatura: null,
        nombreAsignatura: '',
        idSemestre: null
    })

    // Carreras
    const [listaCarrera, setListaCarrera] = useState([])
    const handleCarreraChange = selectedCarrera => {
        setFormData({
            ...formData,
            idCarrera: selectedCarrera.id,
            nombreCarrera: selectedCarrera.nombre
        })
    }
    // Fetch lista de carreras
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

    // Asignaturas
    const [listaAsignatura, setListaAsignatura] = useState([])
    const handleAsignaturaChange = event => {
        const selectedId = Number(event.target.value)
        const selectedAsignatura = listaAsignatura.find(
            asignatura => asignatura.id === selectedId
        )
        setFormData({
            ...formData,
            idAsignatura: selectedAsignatura.id,
            nombreAsignatura: selectedAsignatura.nombre,
            idSemestre: selectedAsignatura.gradoSemestre
        })
    }
    // Fetch lista de asignaturas
    useEffect(() => {
        const fetchListaAsignaturas = async () => {
            try {
                const response = await axios.get('Coordinador/listarAsignatura?idCarrera=' + formData.idCarrera)
                setEstado({
                    ...estado,
                    paso: 2
                })
                setListasInfo({
                    ...listasInfo,
                    tituloInfo: 'Paso 2: Seleccionar una Asignatura.',
                    mensajeInfo: 'Utilice el selector: "Lista de asignaturas", despliéguelo y seleccione la asignatura.'
                })
                setListaAsignatura(response.data)
            } catch (error) {
                console.error('Error fetching listaAsignatura:', error)
            }
        }
        if (formData.idCarrera !== null) {
            fetchListaAsignaturas()
        }
    }, [formData.idCarrera])

    // cargar previas
    const [listAsignaturaPaginado, setListAsignaturaPaginado] = useState([]);
    useEffect(() => {
        const fetchListaPrevia = async () => {
            try {
                const response = await axios.get('Coordinador/listAsignaturasPorG?idCarrera='+ formData.idCarrera +'&gradoAsignatura=' + formData.idSemestre)
                setEstado({
                    ...estado,
                    paso: 3
                })
                setListasInfo({
                    ...listasInfo,
                    tituloInfo: 'Paso 3: Detalle de previas.',
                    mensajeInfo: 'En este paso se muestra lalista de previas que tenga la Asignatura seleccionado, en caso de ya tener previas caragadas anteriormente.'
                })
                setListAsignaturaPaginado(response.data);
            } catch (error) {
                console.error('Error fetching listaPrevia:', error)
            }
        }
        if (formData.idAsignatura !== null) {
            fetchListaPrevia()
        }
    }, [formData.idAsignatura])

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
                                <ListarPreviasPorAsignaturaPasos estado={estado} setEstado={setEstado} />
                                {formData.idCarrera === null ? (
                                    <ListarCarrerasInfo
                                        listaCarrera={listaCarrera}
                                        onCarreraChange={handleCarreraChange}
                                        listasInfo={listasInfo}
                                    />
                                ) : formData.idAsignatura === null ? (
                                    <ListAsignaturaInfo
                                        listaAsignatura={listaAsignatura}
                                        handleAsignaturaChange={handleAsignaturaChange}
                                        listasInfo={listasInfo}
                                        formData={formData}
                                    />
                                ) : (
                                    <ListPreviaInfo
                                        listaAsignatura={listaAsignatura}
                                        handleAsignaturaChange={handleAsignaturaChange}
                                        listAsignatura={listAsignaturaPaginado}
                                        listasInfo={listasInfo}
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