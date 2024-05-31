'use client'
import React, { useEffect, useState } from "react";
import axios from "@/utils/axios";
import Sidebar from "@/app/componentes/siders/sidebar";
import NavPrivado from "@/app/componentes/navs/nav-privado";
import HeaderPagePrivado from "@/app/componentes/headers/headerPage-privado";
import HorarioAsignaturaListCarrera from "@/app/componentes/funcionario/registro/horario/horarioAsignaturaListCarrera";
import HorarioAsignaturaListAsignatura from "@/app/componentes/funcionario/registro/horario/horarioAsignaturaListAsignatura";
import HorarioAsignaturaPasos from "@/app/componentes/funcionario/registro/horario/horarioAsignaturaPasos";

function FuncionarioExamenAsignatura() {
    const breadcrumbs = ['privado', 'Funcionario', 'Registro', 'HorarioAsignatura'];
    const [listaCarrera, setListaCarrera] = useState([]);
    const [listaAsignatura, setListaAsignatura] = useState([]);
    const [listaDocentes, setListaDocentes] = useState([]);
    const [selectedCarreraId, setSelectedCarreraId] = useState(null);
    const [selectedAsignaturaId, setSelectedAsignaturaId] = useState(null);
    const handleCarreraChange = (id) => {
        setSelectedCarreraId(id);
        setFormData({
            ...formData,
        });
    }
    // Este es el original
    const handleAsignaturaChange = (event) => {
        const selectedId = event.target.value;
        setFormData({
            ...formData,
            idAsignatura: selectedId
        });
        setSelectedAsignaturaId(selectedId);
    }
    /*const handleAsignaturaChange = (event) => {
        const selectedId = event.target.value;
        const selectedAsignatura = listaAsignatura.find(asignatura => asignatura.id === selectedId);
        if (selectedAsignatura) {
            setFormData(prevState => ({
                ...prevState,
                idAsignatura: selectedId,
                ciDocente: selectedAsignatura.ciDocente // Asumiendo que ciDocente es el atributo que contiene la CI del docente
            }));
            setSelectedAsignaturaId(selectedId);
        }
    }*/

    const [estado, setEstado] = useState({
        message: "",
        estado: ""
    });
   
    const [formData, setFormData] = useState({
        idAsignatura: "",
        ciDocente: "",
        //diasDictados: "",
        horarioInicio: "",
        horarioFin: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    
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
    }, []); // El segundo argumento [] asegura que esto se ejecute solo una vez al montar el componente
    
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

    useEffect(() => {
        const fetchListaDocentes = async () => {
            try {
                const response = await axios.get('Funcionario/listarDocentes');
                setListaDocentes(response.data);
            } catch (error) {
                console.error('Error fetching listaDocentes:', error);
            }
        };
        fetchListaDocentes();
    }, []);

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
                                <HorarioAsignaturaPasos selectedCarreraId={selectedCarreraId} selectedAsignaturaId={selectedAsignaturaId} />
                                {selectedCarreraId === null ? (
                                    <HorarioAsignaturaListCarrera 
                                        listaCarrera={listaCarrera}
                                        onCarreraChange={handleCarreraChange}
                                    />
                                ) : (
                                    <HorarioAsignaturaListAsignatura 
                                        listaAsignaturas={listaAsignatura}
                                        handleAsignaturaChange={handleAsignaturaChange}
                                        handleChange={handleChange}
                                        handleSubmit={handleSubmit}
                                        estado={estado}
                                        listaDocentes={listaDocentes}
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