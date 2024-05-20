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

export default function Index() {
    const router = useRouter();
    const breadcrumbs = ['privado', 'Funcionario', 'Generar Acta de Examen'];
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
        fetchListaAsignaturas();
    }

    const fetchListaAsignaturas = async () => {
        try {
            const response = await axios.get('/listaAsignaturas', {
                params: {
                    carreraId: selectedCarreraId
                }
            });
            setListaAsignatura(response.data);
        } catch (error) {
            console.error('Error fetching listaAsignaturas:', error);
        }
    };

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
                                <ActaExamenListCarrera listaCarrera={listaCarrera} onCarreraChange={handleCarreraChange} />
                                {selectedCarreraId && <ActaExamenListExamen listaAsignatura={listaAsignatura} handleChangeAsignatura={handleChangeAsignatura} />}
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}
