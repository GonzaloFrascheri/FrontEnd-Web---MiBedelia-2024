"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/componentes/siders/sidebar.jsx";
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx';
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado.jsx';
import AltaUsuario from '@/app/componentes/administrador/usuarios/altaUsuario.jsx';
import axios from "@/utils/axios";
import storage from "@/utils/storage";

function RegistrarPage() {

  const router = useRouter();
  const breadcrumbs = ['privado', 'Administrador', 'Usuarios', 'Alta'];
  const [data, setData] = useState('');
  const [estado, setEstado] = useState({
    message: "",
    estado: ""
  });
  const [credentials, setCredentials] = useState({
    nombre: "",
    apellido: "",
    username: "",
    email: "",
    password: "",
    telefono: "",
    rol: ""
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
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });

    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const { data, status } = await axios.post('Administrador/altaUsuario', formData);
      if(status === 200){
        console.log(data)
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

  /*
    // Verifying that the form fields are not empty
    const emptyFields = Object.values(credentials).some(value => value === "");
    if (emptyFields) {
      alert("Los campos no pueden estar vacios.");
      return;
    }

    fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(credentials)
    })
    .then(res => {
      if (res.status !== 200) {
        throw new Error('Error en la conexión.');
      }
      return res.json();
    })
    .then(data => {
      if (data.message === "Usuario registrado con exito") {
        setEstado({
          message: data.message,
          estado: 200
        });
      } else {
        setEstado({
          message: data.message,
          estado: 401
        });
      }      
      router.push("/registrar");
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
        
  };

  */
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
                <AltaUsuario formData={formData} estado={estado} credentials={credentials} handleChange={handleChange} handleSubmit={handleSubmit} />
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default RegistrarPage;
