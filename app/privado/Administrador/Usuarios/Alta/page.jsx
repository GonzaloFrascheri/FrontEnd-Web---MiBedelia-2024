"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/componentes/siders/sidebar.jsx";
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx';
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx';
import AltaUsuario from '@/app/componentes/administrador/usuarios/altaUsuario.jsx';
import axios from "@/utils/axios";
import { hashPassword } from "@/utils/utils"

function RegistrarPage() {

  const router = useRouter();
  const breadcrumbs = ['privado', 'Administrador', 'Usuarios', 'Alta'];
  const [data, setData] = useState('');
  const [estado, setEstado] = useState({
    message: "",
    estado: ""
  });
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    ci: "",
    email: "",
    password: "",
    telefono: "",
    rol: ""
  });
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const toggleSidebar = () => {
      setIsSidebarToggled(!isSidebarToggled);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const hashedPassword = await hashPassword(formData.password);
      const updatedFormData = {
        ...formData,
        password: hashedPassword,
      };
      const { data, status } = await axios.post('Administrador/altaUsuario', updatedFormData);
      if(status === 200){
        setEstado({
          message: data.message,
          estado: data.status
        });
      }else{
        setEstado({
          message: data.message,
          estado: data.status
        });
      }
    } catch( error ){
      setEstado({
        message: error.response ? error.response.data.message : 'Error al guardar el usuario',
        estado: error.response ? error.response.status : 500
      });
    }
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
                <AltaUsuario formData={formData} estado={estado} handleChange={handleChange} handleSubmit={handleSubmit} />
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default RegistrarPage;
