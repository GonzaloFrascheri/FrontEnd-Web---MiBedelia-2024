'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";
import storage from "@/utils/storage";
import Sidebar from "@/app/componentes/siders/sidebar.jsx";
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx';
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx';
import ActaExamenListCarrera from '@/app/componentes/funcionario/generar/actaExamenListCarrera.jsx';
import ActaExamenListExamen from '@/app/componentes/funcionario/generar/actaExamenListExamen.jsx';
import ActaExamenPasos from '@/app/componentes/funcionario/generar/actaExamenPasos.jsx';

export default function Index() {
    const router = useRouter();
    const breadcrumbs = ['privado', 'Funcionario', 'Generar', 'ActaExamen'];
    const [data, setData] = useState('');
    const [isSidebarToggled, setIsSidebarToggled] = useState(false);
    const [listaCarrera, setListaCarrera] = useState([]);
    const [selectedCarreraId, setSelectedCarreraId] = useState(null);
    const [listaExamen, setListaExamen] = useState([]);
    const [selectedExamenId, setSelectedExamenId] = useState(null);
    const [examenDto, setExamenDto] = useState([]);

    const toggleSidebar = () => {
        setIsSidebarToggled(!isSidebarToggled);
    };

    const handleCarreraChange = (id) => {
        setSelectedCarreraId(id);
    };

    const handleChangeExamen = (id) => {
        setSelectedExamenId(id);
    }

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

    // Fetch lista de examenes
    useEffect(() => {
        const fetchListaExamenes = async () => {
            try {
                const response = await axios.get('Funcionario/listarExamenesPeriodo?idCarrera=' + selectedCarreraId);
                setListaExamen(response.data);
            } catch (error) {
                console.error('Error fetching listaExamenes:', error);
            }
        };
        fetchListaExamenes();
    }, [selectedCarreraId]);

    // Fetch examenDto
    useEffect(() => {
        const fetchListaExamenDto = async () => {
            try {
                const response = await axios.get('Funcionario/generarActaExamen?idExamen=' + selectedExamenId);
                setExamenDto(response.data);
            } catch (error) {
                console.error('Error fetching listaAsignatura:', error);
            }
        };
        fetchListaExamenDto();
    }, [selectedExamenId]);

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
                                <ActaExamenPasos selectedCarreraId={selectedCarreraId} selectedExamenId={selectedExamenId} />
                                {selectedCarreraId === null ? (
                                    <ActaExamenListCarrera listaCarrera={listaCarrera} onCarreraChange={handleCarreraChange} />
                                ) : (
                                    <ActaExamenListExamen listaExamen={listaExamen} handleChangeExamen={handleChangeExamen} selectedExamenId={selectedExamenId} ExamenDto={examenDto} />
                                )}
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}
