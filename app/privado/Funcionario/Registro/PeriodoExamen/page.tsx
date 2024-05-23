'use client'

import React, { useState } from "react";
import PeriodoExamen from "@/app/componentes/funcionario/registro/periodoExamen"
import { useRouter } from "next/navigation";
import HeaderPagePrivado from "@/app/componentes/headers/headerPage-privado";
import NavPrivado from "@/app/componentes/navs/nav-privado";
import Sidebar from "@/app/componentes/siders/sidebar";
import axios from "@/utils/axios";

function FuncionarioPeriodoExamen() {
    
    const router = useRouter();
    const breadcrumbs = ['privado', 'Funcionario', 'Registro', 'PeriodoExamen'];
    const [isSidebarToggled, setIsSidebarToggled] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarToggled(!isSidebarToggled);
    };
    const [data, setData] = useState('');
    const [estado, setEstado] = useState({
        message: "",
        estado: ""
    });

    const [formData, setFormData] = useState({
        diaInicio: '',
        diaFin: '',
        anioLectivo: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'diaInicio') {
            const diaInicio = new Date(value);
            const anioLectivo = diaInicio.getFullYear();

            setFormData({
                ...formData,
                diaInicio: value,
                anioLectivo: anioLectivo.toString()
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const diaInicio = new Date(formData.diaInicio);
        const diaFin = new Date(formData.diaFin);
        const hoy = new Date();

        // Validar que diaInicio sea mayor a la fecha actual
        if (diaInicio <= hoy) {
            setError('La fecha de inicio debe ser mayor a la fecha actual.');
            return;
        }

        // Validar que diaInicio sea menor a diaFin
        if (diaInicio >= diaFin) {
            setError('La fecha de inicio debe ser menor a la fecha de fin.');
            return;
        }

        // Validar que entre diaInicio y diaFin no hayan más de 21 días
        const diferenciaDias = (diaFin - diaInicio) / (1000 * 60 * 60 * 24);
        if (diferenciaDias > 21) {
            setError('Entre la fecha de inicio y la fecha de fin no deben haber más de 21 días.');
            return;
        }

        // Si pasa todas las validaciones, puedes proceder a enviar el formulario
        setError('');
        // Aquí puedes agregar el código para enviar el formulario
        try {
            // envío datos al bk
            const { data, status } = await axios.post('Funcionario/registroPeriodoExamen', formData);
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
                message: error.response ? error.response.data.message : 'Error al guardar periodo de examen',
                estado: error.response ? error.response.status : 500
            });
        }
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
                                <PeriodoExamen formData={formData} estado={estado} handleChange={handleChange} handleSubmit={handleSubmit} error={error} />
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default FuncionarioPeriodoExamen;