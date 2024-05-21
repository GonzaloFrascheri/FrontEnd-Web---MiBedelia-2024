'use client'

import React, { useEffect, useState } from "react";
import Sidebar from "@/app/componentes/siders/sidebar.jsx";
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx';
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx';
import ActaExamenListCarrera from '@/app/componentes/funcionario/generar/actaExamenListCarrera.jsx'
import AltaAsignatura from '@/app/componentes/coordinador/asignatura/altaAsignatura.jsx';
import axios from "axios";
import { useRouter } from "next/navigation.js";

function CoordinadorAltaAsignatura() {
  const router = useRouter();
  const breadcrumbs = ['privado', 'Coordinador', 'Asignatura', 'Alta'];
  const [data, setData] = useState('');
  const [listaCarrera, setListaCarrera] = useState([]);
  const [selectedCarreraId, setSelectedCarreraId] = useState(null);
  const [estado, setEstado] = useState({
    message: "",
    estado: ""
  });
  const [formData, setFormData] = useState({
    nombre: "",
    carrera: "",
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
      nombre: "",
      carrera: "",
      });
  };
  
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const toggleSidebar = () => {
      setIsSidebarToggled(!isSidebarToggled);
  };

  const handleCarreraChange = (id) => {
    setSelectedCarreraId(id);
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
    document.body.className = isSidebarToggled ? 'nav-fixed' : 'nav-fixed sidenav-toggled';
  }, [isSidebarToggled]);

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
                <AltaAsignatura listaCarrera={listaCarrera} formData={formData} estado={estado} handleChange={handleChange} handleSubmit={handleSubmit} />
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default CoordinadorAltaAsignatura;