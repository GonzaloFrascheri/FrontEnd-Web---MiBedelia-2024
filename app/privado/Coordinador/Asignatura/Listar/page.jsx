'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";
import storage from "@/utils/storage.js";
import Sidebar from "@/app/componentes/siders/sidebar";
import NavPrivado from "@/app/componentes/navs/nav-privado";
import HeaderPagePrivado from "@/app/componentes/headers/headerPage-privado";
import AsignaturaListAsignatura from "../../../../componentes/coordinador/asignatura/listar/AsignaturaListAsignatura";
import AsignaturaListCarrera from "../../../../componentes/coordinador/asignatura/listar/AsignaturaListCarrera";
import ExamenAsignaturaPasos from "@/app/componentes/funcionario/registro/examen/examenAsignaturaPasos";

function FuncionarioExamenAsignatura() {
    
    const router = useRouter();
    const breadcrumbs = ['privado', 'Coordinador', 'Asignatura', 'Listar'];
    const [data, setData] = useState('');
    const [listaCarrera, setListaCarrera] = useState([]);
    const [listaAsignatura, setListaAsignatura] = useState([]);
    const [selectedCarreraId, setSelectedCarreraId] = useState(null);
    const [selectedAsignaturaId, setSelectedAsignaturaId] = useState(null);
    const hoy = new Date();
    const handleCarreraChange = (id) => {
        setSelectedCarreraId(id);
        setFormData({
            ...formData,
        });
    }
    
    const handleAsignaturaChange = (event) => {
        const selectedId = event.target.value;
        setFormData({
            ...formData,
            idAsignatura: selectedId
        });
        setSelectedAsignaturaId(selectedId);
    }

    const [estado, setEstado] = useState({
        message: "",
        estado: ""
    });
   
    const [formData, setFormData] = useState({
        idAsignatura: "",

    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    /*
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.warn('formData', formData);
            try {
                // envío datos al bk
                const { data, status } = await axios.post('Funcionario/registroHorarioAsignatura', formData);
                    if (status === 200) {
                        setEstado({
                            message: data.message,
                            estado: data.estado
                        });
                    } else {
                        setEstado({
                            message: data.message,
                            estado: data.status
                        });
                    }
            }catch (error) {
                setEstado({
                    message: error.response ? error.response.data.message : 'Error al registrar el horario',
                    estado: error.response ? error.response.status : 500
                });
            }   
            console.info("a enviar", formData);
            // Limpia el formulario despues de enviar los datos
            setFormData({
                idAsignatura: "",
                ciDocente: "",
                //diasDictados: "",
                horarioInicio: "",
                horarioFin: "",
            });
        };
        */

    
    
    const [isSidebarToggled, setIsSidebarToggled] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarToggled(!isSidebarToggled);
    };

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
        const fetchListaAsignaturas = async () => {
            try {
                //Funcionario/listarAsignaturaPaginado?idCarrera=1&page=1&pageSize=10
                //const response = await axios.get('Funcionario/listarAsignatura?idCarrera=' + selectedCarreraId);
                const response = await axios.get('Funcionario/listarAsignaturaPaginado?idCarrera=' + selectedCarreraId + '&page=1&pageSize=300');
                setListaAsignatura(response.data.items);
                console.info("listaAsignatura", response.data.items);
            } catch (error) {
                console.error('Error fetching listaAsignatura:', error);
            }
        };
        fetchListaAsignaturas();
    }, [selectedCarreraId]);

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
                                    <AsignaturaListCarrera
                                        listaCarrera={listaCarrera}
                                        onCarreraChange={handleCarreraChange}
                                    />
                                ) : (
                                    <AsignaturaListAsignatura 
                                        listaAsignaturas={listaAsignatura}
                                        handleAsignaturaChange={handleAsignaturaChange}
                                        handleChange={handleChange}
                                        estado={estado}
                                        formData={formData}
                                    />
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