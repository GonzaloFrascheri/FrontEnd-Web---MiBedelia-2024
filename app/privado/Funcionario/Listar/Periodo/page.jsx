'use client'

import React, { useEffect, useState } from 'react'
import axios from '@/utils/axios'
import Sidebar from '@/app/componentes/siders/sidebar'
import NavPrivado from '@/app/componentes/navs/nav-privado'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado'
import ListarCarrerasExamenesPeriodo from '@/app/componentes/funcionario/listar/ListarCarrerasExamenPeriodo';
import ListarExamenesPeriodoPasos from '@/app/componentes/funcionario/listar/ListarExamenesPeriodoPasos'
import ListarExamenesPeriodo from '@/app/componentes/funcionario/listar/ListarExamenesPeriodo'
import { useSidebar } from '@/context/AppContext'


export default function FuncionarioListarExamenesPeriodo(){
    const breadcrumbs = ['privado', 'Funcionario', 'Listar', 'Periodo']
    const [listaCarrera, setListaCarrera] = useState([])
    const [selectedCarreraId, setSelectedCarreraId] = useState(null)
    const [listaExamen, setListaExamen] = useState([])
    const [selectedExamenId, setSelectedExamenId] = useState(null)
    const { isSidebarToggled } = useSidebar();

    const handleCarreraChange = id => {
        setSelectedCarreraId(id)
    }

    const handleExamenChange = id => {
        setSelectedExamenId(id)
    }


    const [estado, setEstado] = useState({
        message: '',
        estado: ''
    })

    // Carreras 
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

    // Examenes
    useEffect(() => {
        const fetchListaExamenes = async () => {
            try {
            const response = await axios.get(`Funcionario/listarExamenesPeriodo?idCarrera=${selectedCarreraId}`)
            setListaExamen(response.data)
            } catch (error) {
            console.error('Error fetching listaExamenes:', error)
            }
        }

        fetchListaExamenes()
    }, [selectedCarreraId])

    return(
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
                                <ListarExamenesPeriodoPasos 
                                    selectedCarreraId={selectedCarreraId}
                                    selectedExamenId={selectedExamenId}
                                />
                                {selectedCarreraId === null ? (
                                    <ListarCarrerasExamenesPeriodo 
                                        listaCarrera={listaCarrera}
                                        onCarreraChange={handleCarreraChange}
                                    />
                                ): (
                                    <ListarExamenesPeriodo 
                                        listaExamen={listaExamen}
                                        onExamenChange={handleExamenChange}
                                        selectedExamenId={selectedExamenId}     
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

