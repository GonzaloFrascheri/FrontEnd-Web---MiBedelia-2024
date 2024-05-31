'use client'
import React, { useState, useEffect } from 'react'
import axios from '@/utils/axios'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx'
import FinDeCursoPasos from '@/app/componentes/funcionario/registro/acta/findecursoPasos.jsx'
import FinDeCursoListCarrera from '@/app/componentes/funcionario/registro/acta/findecursoListCarrera.jsx'
import FinDeCursoListAsignatura from '@/app/componentes/funcionario/registro/acta/findecursoListAsignatura.jsx'
import { useAuth } from '@/context/AuthProvider'

export default function FuncionarioActaFinDeCurso () {

    const authData = useAuth()
    const breadcrumbs = ['privado', 'Funcionario', 'Registro', 'ActaFinDeCurso']
    const [isSidebarToggled, setIsSidebarToggled] = useState(false)
    const [userData, setUserData] = useState(null)
    // Carreras
    const [listaCarrera, setListaCarrera] = useState([]);
    const handleCarreraChange = (id) => {
        setSelectedCarreraId(id);
    };
    // Fetch lista de carreras
    useEffect(() => {
        const fetchListaCarreras = async () => {
            try {
                const response = await axios.get('Funcionario/listarCarrera');
                setListaCarrera(response.data);
            } catch (error) {
                console.error('Error fetching listaCarreras:', error);
            }
        };

        fetchListaCarreras();
    }, []);

    // Estado
    const [estado, setEstado] = useState({
        message: '',
        estado: ''
    })
    
    const toggleSidebar = () => {
        setIsSidebarToggled(!isSidebarToggled)
    }
    
    useEffect(() => {
        if (authData && !userData) {
        setUserData(authData)
        }
    }, [authData, userData])
    

    return (
        <body className={isSidebarToggled ? 'nav-fixed' : 'nav-fixed sidenav-toggled'}>
            <NavPrivado isSidebarToggled={isSidebarToggled} toggleSidebar={toggleSidebar} />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Sidebar isSidebarToggled={isSidebarToggled} />
                </div>
                <div id="layoutSidenav_content">
                    <div id="layoutAuthentication">
                        <div id="layoutAuthentication_content">
                            <main>
                                <HeaderPagePrivado breadcrumbs={breadcrumbs}/>
                                <FinDeCursoPasos selectedCarreraId={selectedCarreraId} selectedAsignaturaId={selectedAsignaturaId} />
                                {selectedCarreraId === null ? (
                                    <FinDeCursoListCarrera listaCarrera={listaCarrera} onCarreraChange={handleCarreraChange} />
                                ) : (
                                    <FinDeCursoListAsignatura listaAsignatura={listaAsignatura} handleChangeAsignatura={handleChangeAsignatura} selectedAsignaturaId={selectedAsignaturaId} FinDeCursoDto={finDeCursoDto} />
                                )}
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}