'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";
import storage from "@/utils/storage";
import Sidebar from "../../../componentes/siders/sidebar.jsx";
import NavPrivado from '../../../componentes/navs/nav-privado.jsx';
import HeaderPagePrivado from '../../../componentes/headers/headerPage-privado.jsx';
import AltaDocente from '../../../componentes/funcionario/alta/altaDocente.jsx';

function AltaDocentePage() {

    const router = useRouter();
    const breadcrumbs = ['privado', 'Funcionario', 'Alta Docente'];
    const [data, setData] = useState('');
    const [estado, setEstado] = useState({
        message: "",
        estado: ""
    });
    const [docenteDto, setDocenteDto] = useState({
        nombre: "",
        apellido: "",
        ci: ""
    });
    const [isSidebarToggled, setIsSidebarToggled] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarToggled(!isSidebarToggled);
    };
    const handleChange = (e) => {
        setDocenteDto({
        ...docenteDto,
        [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Verifying that the form fields are not empty
        const emptyFields = Object.values(docenteDto).some(value => value === "");
        if (emptyFields) {
            alert("Los campos no pueden estar vacios.");
            return;
        }
    
        try {
            // envío datos al bk
            const { respuesta, status } = await axios.post('/docente', docenteDto);
            // si la respuesta es ok - docente fue dado de alta
            if (status === 200) {
                setEstado({
                    message: respuesta.message,
                    estado: respuesta.estado
                });
            }
        } catch (error) {
            const { status, respuesta } = error.response;
            if (status === 409) {
                alert(respuesta.message);
            }
            else {
                throw new Error('Ocurrió un error: ' + respuesta.message);
            }
        }
    }
    
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
                    <AltaDocente estado={estado} docenteDto={docenteDto} handleChange={handleChange} handleSubmit={handleSubmit} />
                </main>
                </div>
            </div>
            </div>
        </div>
        </body>
    );
}

export default AltaDocentePage;