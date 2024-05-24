'use client'
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";
import Sidebar from "@/app/componentes/siders/sidebar";
import NavPrivado from "@/app/componentes/navs/nav-privado";
import HeaderPagePrivado from "@/app/componentes/headers/headerPage-privado";
import ExamenAsignaturaListCarrera from "@/app/componentes/funcionario/registro/examen/examenAsignaturaListCarrera";
import ExamenAsignaturaListAsignatura from "@/app/componentes/funcionario/registro/examen/examenAsignaturaListAsignatura";
import ExamenAsignaturaPasos from "@/app/componentes/funcionario/registro/examen/examenAsignaturaPasos";
import { set } from "date-fns";

function FuncionarioExamenAsignatura() {
    
    const router = useRouter();
    const breadcrumbs = ['privado', 'Funcionario', 'Registro', 'ExamenAsignatura'];
    const [data, setData] = useState('');
    const [listaCarrera, setListaCarrera] = useState([]);
    const [listaAsignatura, setListaAsignatura] = useState([]);
    const [listaDocentes, setListaDocentes] = useState([]);
    const [selectedCarreraId, setSelectedCarreraId] = useState(null);
    const [selectedAsignaturaId, setSelectedAsignaturaId] = useState(null);
    const hoy = new Date();
    const handleCarreraChange = (id) => {
        setSelectedCarreraId(id);
        setFormData({
            ...formData,
            carrera: id
        });
    }
    const handleAsignaturaChange = (event) => {
        const selectedId = event.target.value;
        setFormData({
            ...formData,
            idAsignatura: selectedId
        });
        setSelectedAsignaturaId(selectedId);
        console.info("selectedAsignaturaId", selectedAsignaturaId)
    }
    const [estado, setEstado] = useState({
        message: "",
        estado: ""
    });
    const [periodoActivo, setPeriodoActivo] = useState({
        diaFin: "",
        diaInicio: "",
        idPeriodo: ""
    });
    const [formData, setFormData] = useState({
        carrera: "",
        idAsignatura: "",
        idPeriodo: "",
        idDocente: "",
        anioLectivo: hoy.getFullYear().toString(),
        fechaExamen: "",
        idDocenteDatos: "",
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
        console.info("a enviar", formData);
        // Limpia el formulario después de enviar los datos
        setFormData({
            carrera: "",
            idAsignatura: "",
            idPeriodo: "",
            idDocente: "",
            anioLectivo: "",
            fechaExamen: "",
            idDocenteDatos: "",
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
    }, []);

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
   
    useEffect(() => {
        const fetchListaAsignaturas = async () => {
            try {
                //Funcionario/listarAsignaturaPaginado?idCarrera=1&page=1&pageSize=10
                //const response = await axios.get('Funcionario/listarAsignatura?idCarrera=' + selectedCarreraId);
                const response = await axios.get('Funcionario/listarAsignaturaPaginado?idCarrera=' + selectedCarreraId + '&page=1&pageSize=300');
                setListaAsignatura(response.data.items);
                //console.info("listaAsignatura", response.data.items);
            } catch (error) {
                console.error('Error fetching listaAsignatura:', error);
            }
        };
        fetchListaAsignaturas();
    }, [selectedCarreraId]);

    useEffect(() => {
        const obtenerPeriodoActivo = async () => {
            try {
                const response = await axios.get('Funcionario/getPeriodoActivo?Aniolectivo=' + hoy.getFullYear());
                console.log("response.data", response.data);
                setPeriodoActivo(
                    {
                        diaFin: response.data.diaFin,
                        diaInicio: response.data.diaInicio,
                        idPeriodo: response.data.idPeriodo
                    }
                );
                setFormData({
                    ...formData,
                    idPeriodo: response.data.idPeriodo
                });
            } catch (error) {
                console.error('Error fetching obtenerPeriodoActivo:', error);
            }
        }
        obtenerPeriodoActivo();
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
                                <ExamenAsignaturaPasos selectedCarreraId={selectedCarreraId} selectedAsignaturaId={selectedAsignaturaId} />
                                {selectedCarreraId === null ? (
                                    <ExamenAsignaturaListCarrera 
                                        listaCarrera={listaCarrera}
                                        onCarreraChange={handleCarreraChange}
                                    />
                                ) : (
                                    <ExamenAsignaturaListAsignatura 
                                        listaAsignaturas={listaAsignatura}
                                        handleAsignaturaChange={handleAsignaturaChange}
                                        handleChange={handleChange}
                                        handleSubmit={handleSubmit}
                                        periodoActivo={periodoActivo}
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