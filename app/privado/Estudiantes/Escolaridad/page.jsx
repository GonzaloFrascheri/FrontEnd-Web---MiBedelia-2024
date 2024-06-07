'use client'

import React, { useState, useEffect } from 'react'
import axios from '@/utils/axios'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx'
import GenerarPdfEscolaridad from '@/app/componentes/estudiantes/escolaridad/generarEscolaridad' 
import ListarCarrera from '@/app/componentes/reutilizables/listarCarrerasInfo'
import { useSidebar } from '@/context/AppContext'
import { useAuth } from '@/context/AuthProvider'

export default function Index() {

    const breadcrumbs = ['privado', 'Estudiantes', 'Escolaridad']
    const [listaCarrera, setListaCarrera] = useState([])
    
    const [selectedCarreraId, setSelectedCarreraId] = useState(null)
    const [listasInfo, setListasInfo] = useState({
        cu: "Generar Escolaridad",
        tituloInfo: "Paso 1: Seleccionar Carrera",
        mensajeInfo: 'Utilice el selector: "Lista de carreras", despliéguelo y seleccione la carrera.'
    })
    const { isSidebarToggled, toggleSidebar } = useSidebar()
    const authData = useAuth()
    
    const {GenerarPdfEscolaridad} = GenerarPdfEscolaridad();
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (authData && !user) {
        setUser(authData)
        }
    }, [authData, user])

    const handleCarreraChange = id => {
        setSelectedCarreraId(id)
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

    const [EscolaridadDto, setEscolaridadDto] = useState([]);

    // Fetch generar escolaridad
    useEffect(() => {
        const fetchGenerarEscolaridad = async () => {
            try {
                const response = await axios.get(`Estudiante/generarEscolaridad?carreraId=${selectedCarreraId}`)
                setEscolaridadDto(response.data)
            } catch (error) {
                console.error('Error fetching listaGenerarEscolaridad:', error)
            }
        }

        fetchGenerarEscolaridad()
    }, [])

    useEffect(() => {
        // Ruta relativa a la carpeta pública del proyecto
        const logoUrl = `/img/logo.png`;
        loadImageAsBase64(logoUrl, (base64) => {
          setLogoBase64(base64);
        });
      }, []);

    const [logoBase64, setLogoBase64] = useState(null);
    
    const GenerarPDF = () => {
        if (logoBase64) {
            if (!EscolaridadDto) {
                console.error('EscolaridadDto es null');
                setError(true);
            } else {
                const fecha = new Date(EscolaridadDto.fechaEmision);
                const datosPrueba = {
                    nombreEstudiante: EscolaridadDto.nombreEstudiante,
                    cedula: EscolaridadDto.cedula,
                    fecha: fecha.toISOString().split('T')[0],
                    carrera: EscolaridadDto.carrera,
                    inscripcionesAsignaturas: EscolaridadDto.inscripcionesAsignaturas,
                    inscripcionesExamenes: EscolaridadDto.inscripcionesExamenes,
                    logo: logoBase64 // Imagen en base64
                };
                console.info('estudiante', EscolaridadDto.estudiantes);
                GenerarPdfEscolaridad(datosPrueba);
            }
        }
    }


    /*
    {
        "nombreEstudiante": "string",
        "cedula": "string",
        "carrera": "string",
        "fechaEmision": "2024-06-07T13:35:39.412Z",
        "inscripcionesAsignaturas": [
          {
            "id": 0,
            "finalizado": true,
            "fechaInscripcion": "2024-06-07T13:35:39.412Z",
            "resultado": "string",
            "nombreAsignatura": "string",
            "gradoAsignatura": 0,
            "nombreSemestre": "string"
          }
        ],
        "inscripcionesExamenes": [
          {
            "id": 0,
            "finalizado": true,
            "fechaInscripcion": "2024-06-07T13:35:39.412Z",
            "anioLectivo": 0,
            "resultado": "string",
            "nombreExamen": "string",
            "fechaExamen": "2024-06-07T13:35:39.412Z",
            "gradoAsignatura": 0,
            "nombreSemestre": "string"
          }
        ]
    }*/

    // Función para cargar la imagen y convertirla a base64
    const loadImageAsBase64 = (url, callback) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
        const reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    };

    return (
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
                                {selectedCarreraId === null ? (
                                    <ListarCarrera 
                                        listaCarrera={listaCarrera}
                                        onCarreraChange={handleCarreraChange}
                                        listasInfo={listasInfo}
                                        
                                    />
                                ) : (
                                    <>
                                        <button 
                                            className='btn btn-primary'
                                            disabled={!selectedCarreraId}
                                            onClick={GenerarPDF}
                                        >
                                                Generar PDF de Escolaridad
                                        </button>
                                    </>
                                )}
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}
