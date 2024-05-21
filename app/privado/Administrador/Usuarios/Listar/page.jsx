'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderPagePrivado from "@/app/componentes/headers/headerPage-privado";
import NavPrivado from "@/app/componentes/navs/nav-privado";
import Sidebar from "@/app/componentes/siders/sidebar";
import ListarUsuarios from "@/app/componentes/administrador/usuarios/listarUsuario"
import axios from "@/utils/axios";
import storage from "@/utils/storage";

function Page() {
  const router = useRouter();
  const breadcrumbs = ['privado', 'Administrador', 'Usuarios', 'Listar'];
  const [ListUsuarios, setListUsuarios] = useState([]);
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  
  const [estado, setEstado] = useState({
    estado: 0,
    message: "",
  });
  
  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = storage.getToken();

      if (!token) {
        // todo: eliminar localstorage
        router.push("/");
      } else {
        const {data, status } = await axios.get('/Administrador/listarUsuario');
        
          if (status !== 200) {
            if (status === 401) {
              alert(data.message)
              setEstado({
                estado: status,
                message: data.message
              });
            } else {
              console.error("There was a problem with the fetch operation:", error);
            }
          }
          setListUsuarios(data);
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
                <HeaderPagePrivado breadcrumbs={breadcrumbs}/>
                <ListarUsuarios estado={estado} ListUsuarios={ListUsuarios} />
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  );

};

export default Page;
