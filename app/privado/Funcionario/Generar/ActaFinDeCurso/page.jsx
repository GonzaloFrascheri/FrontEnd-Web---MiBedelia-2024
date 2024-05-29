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
    const [listaAsignatura, setListaAsignatura] = useState([]);
    const [selectedCarreraId, setSelectedCarreraId] = useState(null);
    const [selectedAsignaturaId, setSelectedAsignaturaId] = useState(null);
    const [examenDto, setExamenDto] = useState([]);

    const toggleSidebar = () => {
        setIsSidebarToggled(!isSidebarToggled);
    };

    const handleCarreraChange = (id) => {
        setSelectedCarreraId(id);
    };

    const handleChangeAsignatura = (id) => {
        console.info('handleChangeAsignatura', id);
        setSelectedAsignaturaId(id);
    }

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

    useEffect(() => {
        const fetchListaAsignatura = async () => {
            try {
                const response = await axios.get('Funcionario/listarAsignatura?idCarrera=' + selectedCarreraId);
                setListaAsignatura(response.data);
            } catch (error) {
                console.error('Error fetching listaAsignatura:', error);
            }
        };
        fetchListaAsignatura();
    }, [selectedCarreraId]);

    useEffect(() => {
        const fetchListaAsignatura = async () => {
            try {
                console.info('selectedAsignaturaId', selectedAsignaturaId)
                const response = await axios.get('Funcionario/generarActaExamen?idExamen=' + selectedAsignaturaId);
                examenDto(response.data);
            } catch (error) {
                console.error('Error fetching listaAsignatura:', error);
            }
        };
        fetchListaAsignatura();
    }, [selectedAsignaturaId]);

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
                                <ActaFinDeCursoPasos selectedCarreraId={selectedCarreraId} selectedAsignaturaId={selectedAsignaturaId} />
                                {selectedCarreraId === null ? (
                                    <ActaFinDeCursoListCarrera listaCarrera={listaCarrera} onCarreraChange={handleCarreraChange} />
                                ) : (
                                    <ActaFinDeCursoListAsignatura listaAsignatura={listaAsignatura} handleChangeAsignatura={handleChangeAsignatura} selectedAsignaturaId={selectedAsignaturaId} examenDto={examenDto} />
                                )}
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}
