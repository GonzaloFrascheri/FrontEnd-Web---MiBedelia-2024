'use client'
import React, { useState } from "react";
import HeaderPagePrivado from "@/app/componentes/headers/headerPage-privado";
import NavPrivado from "@/app/componentes/navs/nav-privado";
import Sidebar from "@/app/componentes/siders/sidebar";
import ListarUsuarios from "../../../../componentes/administrador/usuarios/listarUsuario"
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const breadcrumbs = ['privado', 'Administrador', 'Usuarios', 'Listar'];
  const [estado, setEstado] = useState({
    message: "",
    estado: ""
  });
  const [usuarios, setUsuarios] = useState([]);
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enviando solicitud a la API...');

    
    const token = localStorage.getItem('authToken');
    console.log(token);

    fetch('https://mibedelia-backend-production.up.railway.app/Administrador/listarUsuario', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      mode: 'cors'
    })
    .then(res => {
      console.log('Respuesta del servidor:', res);
      if (res.status !== 200) {
        throw new Error('Error en la conexión.');
      }
      return res.json();
    })
    .then(data => {
      console.log('Datos recibidos:', data);
      if (data.message === "Usuarios listados con éxito") {
        setEstado({
          message: data.message,
          estado: 200
        });
        setUsuarios(data.usuarios); // Asegúrate de que la respuesta contiene `usuarios`
      } else {
        setEstado({
          message: data.message,
          estado: 401
        });
      }
    })
    .catch(error => {
      console.error('Hubo un problema con la operación fetch:', error);
      setEstado({
        message: 'Hubo un problema con la conexión.',
        estado: 500
      });
    });
  };

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
                <ListarUsuarios estado={estado} handleSubmit={handleSubmit} usuarios={usuarios} />
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Page;
