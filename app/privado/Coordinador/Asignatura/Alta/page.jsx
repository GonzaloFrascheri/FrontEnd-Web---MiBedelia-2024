'use client'

import React, { useEffect, useState } from "react";
import Sidebar from "../../../../componentes/siders/sidebar.jsx";
import NavPrivado from '../../../../componentes/navs/nav-privado.jsx';
import HeaderPagePrivado from '../../../../componentes/headers/headerPage-privado.jsx';
import AltaAsignatura from '../../../../componentes/coordinador/asignatura/altaAsignatura.jsx';
import storage from "@/utils/storage.js";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation.js";

function CoordinadorAltaAsignatura() {
  const router = useRouter();
  const breadcrumbs = ['privado', 'Coordinador', 'Asignatura', 'Alta'];
  const [data, setData] = useState('');
  const [listaCarrera, setListaCarrera] = useState([]);
  const [estado, setEstado] = useState({
    message: "",
    estado: ""
  });
  const [formData, setFormData] = useState({
    nombre: "",
    carrera: ""
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
        const response = await axios.get('Funcionario/listarCarrera');
        const carrerasConIds = response.data.map(carrera => ({
          id: carrera.id, 
          nombre: carrera.nombre,
        }));
        setListaCarrera(carrerasConIds);
      } catch (error) {
        console.error('Error fetching listaCarreras:', error);
      }
    };

    fetchListaCarreras();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = storage.getToken();

      if (!token) {
        storage.removeToken();  
        router.push("/");
      } else {
        try {
          const { data, status } = await axios.get('Coordinador/altaAsignatura');

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
  }, [router]);

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
                <AltaAsignatura 
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
