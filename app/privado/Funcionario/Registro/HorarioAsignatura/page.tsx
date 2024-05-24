'use client'
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";
import storage from "@/utils/storage.js";
import Sidebar from "@/app/componentes/siders/sidebar";
import NavPrivado from "@/app/componentes/navs/nav-privado";
import HeaderPagePrivado from "@/app/componentes/headers/headerPage-privado";
import HorarioAsignaturaListCarrera from "@/app/componentes/funcionario/registro/horario/horarioAsignaturaListCarrera";
import HorarioAsignaturaListAsignatura from "@/app/componentes/funcionario/registro/horario/horarioAsignaturaListAsignatura";
import ExamenAsignaturaPasos from "@/app/componentes/funcionario/registro/examen/examenAsignaturaPasos";

function FuncionarioExamenAsignatura() {
    
    const router = useRouter();
    const token = storage.getToken();
    const breadcrumbs = ['privado', 'Funcionario', 'Registro', 'ExamenAsignatura'];
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
            //carrera: id
        });
    }
    const handleAsignaturaChange = (event) => {
        const selectedId = event.target.value;
        setSelectedAsignaturaId(selectedId);
        setFormData({
            ...formData,
            idAsignatura: selectedId
        });
    }
    const [estado, setEstado] = useState({
        message: "",
        estado: ""
    });
   
    const [formData, setFormData] = useState({
        //carrera: "",
        gradoMateria: "",
        idAsignatura: "",
        idDocente: "",
        horainicio: "",
        horafin: "",
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

        if (!token) {
            storage.removeToken();  
            router.push("/");
          } else {
            console.info(formData);

            try {
                // envío datos al bk
                const { data, status } = await axios.post('Funcionario/registroHorarioAsignatura', formData);
                // si la data es ok - docente fue dado de alta
                if (status === 200) {
                    setEstado({
                        message: data.message,
                        estado: data.estado
                    });
                }else{
                    setEstado({
                      message: data.message,
                      estado: data.status
                    });
                  }
              } catch (error) {
                    setEstado({
                        message: error.response ? error.response.data.message : 'Error al regristrar el horario',
                        estado: error.response ? error.response.status : 500
                });

                }   // Aquí puedes enviar los datos del formulario a tu backend o realizar cualquier otra acción necesaria
                console.info("a enviar", formData);
            };
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