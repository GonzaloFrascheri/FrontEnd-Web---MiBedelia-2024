'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";
import storage from "@/utils/storage";
import Sidebar from "../../../../componentes/siders/sidebar.jsx";
import NavPrivado from '../../../../componentes/navs/nav-privado.jsx';
import HeaderPagePrivado from '../../../../componentes/headers/headerPage-privado.jsx';
import ActaExamenListCarrera from '../../../../componentes/funcionario/generar/actaExamenListCarrera.jsx';
import ActaExamenListExamen from '../../../../componentes/funcionario/generar/actaExamenListExamen.jsx';
import ActaExamenPasos from '../../../../componentes/funcionario/generar/actaExamenPasos.jsx';

export default function Index() {
    const router = useRouter();
    const breadcrumbs = ['privado', 'Funcionario', 'Generar', 'ActaExamen'];
    const [data, setData] = useState('');
    const [isSidebarToggled, setIsSidebarToggled] = useState(false);
    const [listaCarrera, setListaCarrera] = useState([]);
    const [selectedCarreraId, setSelectedCarreraId] = useState(null);
    const [listaExamen, setListaExamen] = useState([]);
    const [selectedExamenId, setSelectedExamenId] = useState(null);

    const toggleSidebar = () => {
        setIsSidebarToggled(!isSidebarToggled);
    };

    const handleCarreraChange = (id) => {
        setSelectedCarreraId(id);
    };

    const handleChangeExamen = (id) => {
        setSelectedExamenId(id);
    }

    useEffect(() => {
        const fetchListaExamenes = async () => {
            try {
                const response = await axios.get('/listaExamenes', {
                    params: {
                        carreraId: selectedCarreraId
                    }
                });
                setListaExamen(response.data);
            } catch (error) {
                // Simulando la respuesta del servidor con una lista de Examenes
                const simulatedResponse = [
                    { id: 0, nombre: 'Elegir una' },
                    { id: 1, nombre: 'Examen #1' },
                    { id: 2, nombre: 'Examen #2' },
                    { id: 3, nombre: 'Examen #3' },
                    { id: 4, nombre: 'Examen #4' },
                    { id: 5, nombre: 'Examen #5' },
                ];
                setListaExamen(simulatedResponse);
                console.error('Error fetching listaExamenes:', error);
            }
        };
        fetchListaExamenes();
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
                                <ActaExamenPasos selectedCarreraId={selectedCarreraId} selectedExamenId={selectedExamenId} />
                                {selectedCarreraId === null ? (
                                    <ActaExamenListCarrera listaCarrera={listaCarrera} onCarreraChange={handleCarreraChange} />
                                ) : (
                                    <ActaExamenListExamen listaExamen={listaExamen} handleChangeExamen={handleChangeExamen} selectedExamenId={selectedExamenId} />
                                )}
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}
