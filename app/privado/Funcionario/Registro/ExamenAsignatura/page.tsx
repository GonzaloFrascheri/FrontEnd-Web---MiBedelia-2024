'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "@/app/componentes/siders/sidebar";
import NavPrivado from "@/app/componentes/navs/nav-privado";
import HeaderPagePrivado from "@/app/componentes/headers/headerPage-privado";
import ExamenAsignaturaListCarrera from "@/app/componentes/funcionario/registro/examen/examenAsignaturaListCarrera";
import ExamenAsignaturaListAsignatura from "@/app/componentes/funcionario/registro/examen/examenAsignaturaListAsignatura";
import ExamenAsignaturaPasos from "@/app/componentes/funcionario/registro/examen/examenAsignaturaPasos";

function FuncionarioExamenAsignatura() {
    
    const router = useRouter();
    const breadcrumbs = ['privado', 'Funcionario', 'Registro', 'ExamenAsignatura'];
    const [data, setData] = useState('');
    const [listaCarrera, setListaCarrera] = useState([]);
    const [listaAsignatura, setListaAsignatura] = useState([]);
    const [selectedCarreraId, setSelectedCarreraId] = useState(null);
    const [selectedAsignaturaId, setSelectedAsignaturaId] = useState(null);

    const handleCarreraChange = (id) => {
        setSelectedCarreraId(id);
    }
    const handleAsignaturaChange = (id) => {
        setSelectedAsignaturaId(id);
    }

    const [estado, setEstado] = useState({
        message: "",
        estado: ""
    });

    const [formData, setFormData] = useState({
        carrera: "",
        asignatura: "",
        fechaexamen: "",
        docente: "",
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos del formulario a tu backend o realizar cualquier otra acción necesaria
        console.log(formData);
        // Limpia el formulario después de enviar los datos
        setFormData({
            carrera: "",
            asignatura: "",
            fechaexamen: "",
            docente: "",
        });
    };
    
    
    const [isSidebarToggled, setIsSidebarToggled] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarToggled(!isSidebarToggled);
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
   
    useEffect(() => {
        const fetchListaAsignaturas = async () => {
            try {
                const response = await axios.get('/listaAsignatura');
                setListaAsignatura(response.data);
            } catch (error) {
                // Simulando la respuesta del servidor con una lista de carreras
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
    
        fetchListaAsignaturas();
    }, []); // El segundo argumento [] asegura que esto se ejecute solo una vez al montar el componente

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
                                <ExamenAsignaturaPasos selectedCarreraId={selectedCarreraId} selectedAsignaturaId={selectedAsignaturaId} />
                                {selectedCarreraId === null ? (
                                    <ExamenAsignaturaListCarrera listaCarrera={listaCarrera} onCarreraChange={handleCarreraChange} />
                                ) : (
                                    <ExamenAsignaturaListAsignatura ListaAsignatura={listaAsignatura} handleAsignaturaChange={handleAsignaturaChange} selectedAsignaturaId={selectedAsignaturaId} />
                                )}
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default FuncionarioExamenAsignatura;