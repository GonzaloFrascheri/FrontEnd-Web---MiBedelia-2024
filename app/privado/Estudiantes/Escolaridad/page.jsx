'use client'

import React, { useState, useEffect } from 'react'
import axios from '@/utils/axios'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx'
import { IGenerarPdfEscolaridad } from '@/app/componentes/generadorPDF/generarEscolaridad'
import ListarCarrera from '@/app/componentes/estudiantes/escolaridad/listarCarrera.jsx'
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
    
    const {GenerarPdfEscolaridad} = IGenerarPdfEscolaridad();
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
                const response = await axios.get('Estudiante/listarCarrera')
                setListaCarrera(response.data)
            } catch (error) {
                console.error('Error fetching listaCarreras:', error)
            }
        }

        fetchListaCarreras()
    }, [])

    const [EscolaridadDto, setEscolaridadDto] = useState([]);

    // Fetch generar escolaridad
    const fetchGenerarEscolaridad = async () => {
        try {
            const response = await axios.get(`Estudiante/generarEscolaridad?carreraId=` + selectedCarreraId.id)
            setEscolaridadDto(response.data)
            } catch (error) {
                console.error('Error fetching listaGenerarEscolaridad:', error)
            }
        }
                
    useEffect(() => {
        fetchGenerarEscolaridad()
    }, [selectedCarreraId])

    useEffect(() => {
        // Ruta relativa a la carpeta pública del proyecto
        const logoUrl = `/img/logo.png`;
        loadImageAsBase64(logoUrl, (base64) => {
          setLogoBase64(base64);
        });
      }, []);

    const [logoBase64, setLogoBase64] = useState(null);
    const formatearFecha = (fecha) => {
        const date = new Date(fecha);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const GenerarPDF = () => {
        if (logoBase64) {
            console.info('datos', EscolaridadDto);
            if (!EscolaridadDto) {
                console.error('EscolaridadDto es null');
                setError(true);
            } else {
                let fecha = formatearFecha(EscolaridadDto.fechaEmision);
                console.info('fecha', fecha);
                const datosPrueba = {
                    nombreEstudiante: EscolaridadDto.nombreEstudiante,
                    cedula: EscolaridadDto.cedula,
                    fecha: fecha,
                    carrera: EscolaridadDto.carrera,
                    inscripcionesAsignaturas: EscolaridadDto.inscripcionesAsignaturas,
                    inscripcionesExamenes: EscolaridadDto.inscripcionesExamenes,
                    logo: logoBase64 // Imagen en base64
                };
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
                                    <ListarCarrera 
                                        listaCarrera={listaCarrera}
                                        onCarreraChange={handleCarreraChange}
                                        listasInfo={listasInfo}
                                        selectedCarreraId={selectedCarreraId}
                                        GenerarPDF={GenerarPDF}
                                    />
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}
