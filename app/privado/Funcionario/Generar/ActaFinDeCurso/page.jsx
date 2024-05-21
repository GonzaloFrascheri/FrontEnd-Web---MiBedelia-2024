'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";
import storage from "@/utils/storage";
import Sidebar from "@/app/componentes/siders/sidebar.jsx";
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx';
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx';
import ActaFinDeCursoPasos from "@/app/componentes/funcionario/generar/actaFinDeCursoPasos.jsx";
import ActaFinDeCursoListCarrera from "@/app/componentes/funcionario/generar/actaFinDeCursoListCarrera.jsx";
import ActaFinDeCursoListAsignatura from "@/app/componentes/funcionario/generar/actaFinDeCursoListAsignatura.jsx";

export default function Index() {
    const router = useRouter();
    const breadcrumbs = ['privado', 'Funcionario', 'Generar', 'ActaFinDeCurso'];
    const [data, setData] = useState('');
    const [isSidebarToggled, setIsSidebarToggled] = useState(false);
    const [listaCarrera, setListaCarrera] = useState([]);
    const [selectedCarreraId, setSelectedCarreraId] = useState(null);
    const [listaAsignatura, setListaAsignatura] = useState([]);
    const [selectedAsignaturaId, setSelectedAsignaturaId] = useState(null);

    const toggleSidebar = () => {
        setIsSidebarToggled(!isSidebarToggled);
    };

    const handleCarreraChange = (id) => {
        setSelectedCarreraId(id);
    };

    const handleChangeAsignatura = (id) => {
        setSelectedAsignaturaId(id);
    }

    useEffect(() => {
        const fetchListaAsignatura = async () => {
            try {
                const response = await axios.get('/listaAsignatura', {
                    params: {
                        carreraId: selectedCarreraId
                    }
                });
                setListaAsignatura(response.data);
            } catch (error) {
                // Simulando la respuesta del servidor con una lista de Asignatura
                const simulatedResponse = [
                    { id: 0, nombre: 'Elegir una' },
                    { id: 1, nombre: 'Asignatura #1' },
                    { id: 2, nombre: 'Asignatura #2' },
                    { id: 3, nombre: 'Asignatura #3' },
                    { id: 4, nombre: 'Asignatura #4' },
                    { id: 5, nombre: 'Asignatura #5' },
                ];
                setListaAsignatura(simulatedResponse);
                console.error('Error fetching listaAsignatura:', error);
            }
        };
        fetchListaAsignatura();
    }, []);

    useEffect(() => {
        const fetchListaCarreras = async () => {
            try {
                const response = await axios.get('/listaCarreras');
                setListaCarrera(response.data);
            } catch (error) {
                // Simulando la respuesta del servidor con una lista de carreras
                const simulatedResponse = [
                    { id: 0, nombre: 'Elegir una' },
                    { id: 1, nombre: 'Carrera #1' },
                    { id: 2, nombre: 'Carrera #2' },
                    { id: 3, nombre: 'Carrera #3' },
                    { id: 4, nombre: 'Carrera #4' },
                    { id: 5, nombre: 'Carrera #5' },
                ];
                setListaCarrera(simulatedResponse);
                console.error('Error fetching listaCarreras:', error);
            }
        };

        fetchListaCarreras();
    }, []); // El segundo argumento [] asegura que esto se ejecute solo una vez al montar el componente

    return (
        <body className={isSidebarToggled ? 'nav-fixed' : 'nav-fixed sidenav-toggled'}>
            <NavPrivado data={data} isSidebarToggled={isSidebarToggled} toggleSidebar={toggleSidebar} />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Sidebar isSidebarToggled={isSidebarToggled} />
                </div>
                <div id="layoutSidenav_content">
                    <div id="layoutAuthentication">
                        <div id="layoutAuthentication_content">
                            <main>
                                <HeaderPagePrivado breadcrumbs={breadcrumbs}/>
                                <ActaFinDeCursoPasos selectedCarreraId={selectedCarreraId} selectedAsignaturaId={selectedAsignaturaId} />
                                {selectedCarreraId === null ? (
                                    <ActaFinDeCursoListCarrera listaCarrera={listaCarrera} onCarreraChange={handleCarreraChange} />
                                ) : (
                                    <ActaFinDeCursoListAsignatura listaAsignatura={listaAsignatura} handleChangeAsignatura={handleChangeAsignatura} selectedAsignaturaId={selectedAsignaturaId} />
                                )}
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}
