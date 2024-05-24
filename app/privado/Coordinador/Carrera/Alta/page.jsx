'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../../componentes/siders/sidebar.jsx";
import NavPrivado from '../../../../componentes/navs/nav-privado.jsx';
import HeaderPagePrivado from '../../../../componentes/headers/headerPage-privado.jsx';
import AltaCarrera from '../../../../componentes/coordinador/carrera/altaCarrera.jsx';
import storage from "@/utils/storage.js";
import axios from "@/utils/axios";

function CoordinadorAltaCarrera() {
  const router = useRouter();
  const breadcrumbs = ['privado', 'Coordinador', 'Carrera', 'Alta'];
  const [data, setData] = useState('');
  const [estado, setEstado] = useState({
    message: "",
    estado: ""
  });
  const [formData, setFormData] = useState({
    nombre: "",
    duracion: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('Coordinador/altaCarrera', formData);
      setEstado({
        message: 'Carrera guardada con éxito',
        estado: response.status
      });
    } catch (error) {
      setEstado({
        message: error.response ? error.response.data.message : 'Error al guardar la carrera',
        estado: error.response ? error.response.status : 500
      });
    }
  };

  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = storage.getToken();

      if (!token) {
        storage.removeToken();  
        router.push("/");
      } else {
        try {
          const { data, status } = await axios.get('/Coordinador/altaCarrera');

          if (status !== 200) {
            if (status === 401) {
              alert(data.message);
              setEstado({
                estado: status,
                message: data.message
              });
            } else {
              console.error("There was a problem with the fetch operation");
            }
          } else {
            setData(data); 
          }
        } catch (error) {
          console.error("There was a problem with the fetch operation", error);
        }
      }
    };

    fetchData();
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
                <HeaderPagePrivado breadcrumbs={breadcrumbs} />
                <AltaCarrera formData={formData} estado={estado} handleChange={handleChange} handleSubmit={handleSubmit} />
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default CoordinadorAltaCarrera;