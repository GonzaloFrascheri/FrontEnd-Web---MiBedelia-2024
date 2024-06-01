'use client'
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/componentes/siders/sidebar.jsx";
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx';
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx';
import AltaAsignatura from '@/app/componentes/coordinador/asignatura/altaAsignatura.jsx'
import axios from "@/utils/axios";
import { crearSecuencia } from "@/utils/utils";

function CoordinadorAltaAsignatura() {
  const breadcrumbs = ['privado', 'Coordinador', 'Asignatura', 'Alta'];
  const [listaCarrera, setListaCarrera] = useState([]);
  const [estado, setEstado] = useState({
    message: "",
    estado: ""
  });
  const [formData, setFormData] = useState({
    nombre: "",
    idCarrera: "",
    gradoMateria: "",
  });
  const [opcionesSemestre, setOpcionesSemestre] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    // Cambiar la cantidad de semestres dependiendo de la carrera seleccionada
    if (name === "idCarrera") {
      const carrera = listaCarrera.find(carrera => carrera.id === Number(value));
      const semestres = crearSecuencia(carrera.duracion)
      setOpcionesSemestre(semestres);
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        // envío datos al bk
        const { data, status } = await axios.post('Coordinador/altaAsignatura', formData);
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
            message: error.response ? error.response.data.message : 'Error al guardar el usuario',
            estado: error.response ? error.response.status : 500
        });
      }    
  };

  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const toggleSidebar = () => {
      setIsSidebarToggled(!isSidebarToggled);
  };

  useEffect(() => {
    const fetchListaCarreras = async () => {
      try {
        const response = await axios.get('/Coordinador/listarCarrera');
        setListaCarrera(response.data);
      } catch (error) {
        console.error('Error fetching listaCarreras:', error);
      }
    };

    fetchListaCarreras();
  }, []);

  useEffect(() => {
    document.body.className = isSidebarToggled ? 'nav-fixed' : 'nav-fixed sidenav-toggled';
  }, [isSidebarToggled]);

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
                <AltaAsignatura 
                  semestresDisponibles={opcionesSemestre} 
                  listaCarrera={listaCarrera} 
                  formData={formData} 
                  estado={estado} 
                  handleChange={handleChange} 
                  handleSubmit={handleSubmit} 
                />
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default CoordinadorAltaAsignatura;
