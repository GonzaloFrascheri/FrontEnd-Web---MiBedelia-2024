'use client'

import React, { useState } from "react";
import PeriodoExamen from "@/app/componentes/funcionario/registro/periodoExamen"
import { useRouter } from "next/navigation";
import HeaderPagePrivado from "@/app/componentes/headers/headerPage-privado";
import NavPrivado from "@/app/componentes/navs/nav-privado";
import Sidebar from "@/app/componentes/siders/sidebar";

function FuncionarioPeriodoExamen() {
    
    const router = useRouter();
    const breadcrumbs = ['privado', 'Funcionario', 'Registro', 'PeriodoExamen'];
    const [data, setData] = useState('');
    const [estado, setEstado] = useState({
        message: "",
        estado: ""
    });

    const [formData, setFormData] = useState({
        fechainicio: "",
        fechafin: "",
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
            fechainicio: "",
            fechafin: "",
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
                                <PeriodoExamen formData={formData} estado={estado} handleChange={handleChange} handleSubmit={handleSubmit} />
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default FuncionarioPeriodoExamen;