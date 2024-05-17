'use client'

import React, { useState } from "react";
import NavPrivado from "../../../componentes/navs/nav-privado";
import Sidebar from "../../../componentes/siders/sidebar";
import InscripcionExamen from "../../../componentes/estudiantes/examen/inscripcionExamen"
import { useRouter } from "next/navigation";
import HeaderPagePrivado from "../../../componentes/headers/headerPage-privado";

function EstudianteInscripcionExamen() {
    
    const router = useRouter();
    const breadcrumbs = ['privado', 'Estudiantes', 'Exámen'];
    const [data, setData] = useState('');
    const [estado, setEstado] = useState({
        message: "",
        estado: ""
    });

    const [formData, setFormData] = useState({
        año: "",
        inscripcion: "",
        resultado: "",
        finalizado: "",
      });
    
    const handleShow = () => setShow(true); // Esto es una alerta de boostrap pero no me esta funcionando

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name == "año"){
            // Solamente dejaremos ingresar números en el campo año
            if(!/^\d*$/.test(value)){
                handleShow(); // Idem mas arriba linea 27
                return;
            }
        }

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
            año: "",
            inscripcion: "",
            resultado: "",
            finalizado: "",
        });
      };
    
    
    const [isSidebarToggled, setIsSidebarToggled] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarToggled(!isSidebarToggled);
    };

    
    
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
                                <InscripcionExamen formData={formData} estado={estado} handleChange={handleChange} handleSubmit={handleSubmit} />
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default EstudianteInscripcionExamen;

function setShow(arg0: boolean) {
    throw new Error("Function not implemented.");
}
