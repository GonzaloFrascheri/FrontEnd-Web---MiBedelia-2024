'use client'
import React, { useEffect, useState } from "react";
import axios from "@/utils/axios";
import Sidebar from "@/app/componentes/siders/sidebar";
import NavPrivado from "@/app/componentes/navs/nav-privado";
import HeaderPagePrivado from "@/app/componentes/headers/headerPage-privado";
import ListarInscriptosAsignaturas from "@/app/componentes/funcionario/listar/ListarInscriptosAsignaturas";
import ListarInscriptosCarreras from "@/app/componentes/funcionario/listar/ListarInscriptosCarreras";
import ListarInscriptosPasos from "@/app/componentes/funcionario/listar/ListarInscriptosPasos";

function FuncionarioListarInscriptos() {
    const breadcrumbs = ['privado', 'Coordinador', 'Asignatura', 'Listar'];
    const [data, setData] = useState('');
    const [listaCarrera, setListaCarrera] = useState([]);
    const [listaAsignatura, setListaAsignatura] = useState([]);
    const [selectedCarreraId, setSelectedCarreraId] = useState(null);
    const [selectedAsignaturaId, setSelectedAsignaturaId] = useState(null);
    const [listaAniosElectivos, setListaAniosElectivos] = useState([]); 
    const [estado, setEstado] = useState({message: "", estado: ""});
    const [formData, setFormData] = useState({idAsignatura: ""});
    const [isSidebarToggled, setIsSidebarToggled] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarToggled(!isSidebarToggled);
    };
    
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
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
                const response = await axios.get('Funcionario/listarAsignaturaPaginado?idCarrera=' + selectedCarreraId + '&page=1&pageSize=300');
                setListaAsignatura(response.data.items);
                console.info("listaAsignatura", response.data.items);
            } catch (error) {
                console.error('Error fetching listaAsignatura:', error);
            }
        };
        if(selectedCarreraId){
            fetchListaAsignaturas();
        }
    }, [selectedCarreraId]);

    useEffect(() => {
        const fetchListaAniosElectivos = async () => {
            if (selectedAsignaturaId) {
                try {
                    const {data, status} = await axios.get(`listarHorariosAsignaturaPaginado?idAsignatura=${selectedAsignaturaId}`);
                    const horarios = response.data.items;
    
                    // Extraer años lectivos únicos de los horarios
                    const aniosElectivos = Array.from(new Set(horarios.map(horario => horario.anioLectivo)));
    
                    // Formatear los años lectivos para que coincidan con el formato de opciones de selección
                    const listaAniosElectivos = aniosElectivos.map(anio => ({ id: anio, nombre: anio }));
    
                    setListaAniosElectivos(listaAniosElectivos);
                } catch (error) {
                    console.error('Error fetching listaAniosElectivos:', error);
                }
            }
        };
        fetchListaAniosElectivos();
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
                                <ListarInscriptosPasos 
                                    selectedCarreraId={selectedCarreraId} 
                                    selectedAsignaturaId={selectedAsignaturaId}
                                />
                                {selectedCarreraId === null ? (
                                    <ListarInscriptosCarreras
                                        listaCarrera={listaCarrera}
                                        onCarreraChange={handleCarreraChange}
                                    />
                                ) : (
                                    <ListarInscriptosAsignaturas 
                                        listaAsignaturas={listaAsignatura}
                                        handleAsignaturaChange={handleAsignaturaChange}
                                        handleChange={handleChange}
                                        estado={estado}
                                        formData={formData}
                                        listaAniosElectivos={listaAniosElectivos}
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

export default FuncionarioListarInscriptos;