"use client"
import React, { useState, useEffect } from 'react';
import Sidebar from "../../componentes/siders/sidebar.jsx";
import NavPrivado from '../../componentes/navs/nav-privado.jsx';
import { useRouter } from 'next/navigation.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { decodeJwt} from "jose";

const Formulario = () => {
    const router = useRouter();
    const [nombre, setNombre] = useState('');
    const [duracion, setDuracion] = useState(0);
    const [asignaturas, setAsignaturas] = useState([]);
    const [data, setData] = useState('');
    useEffect(() => {
      const token = sessionStorage.getItem("tokenFront");
      if (!token) {
        router.push("/");
      } else {
        setData(decodeJwt (token));
      }
    }, []);

    const [estado, setEstado] = useState({
        message: "",
        estado: ""
      });

    const handleNombreChange = (e) => {
        setNombre(e.target.value);
    };

    const handleDuracionChange = (e) => {
        setDuracion(e.target.value);
    };

    const handleAsignaturaChange = (e, index) => {
        const newAsignaturas = [...asignaturas];
        newAsignaturas[index] = { nombre: e.target.value };
        setAsignaturas(newAsignaturas);
    };

    const handleAgregarAsignatura = () => {
        setAsignaturas([...asignaturas, { nombre: '' }]);
    };

    const handleEnviarFormulario = () => {
        const data = {
            nombre: nombre,
            duracion: duracion,
            asignaturas: asignaturas,
        };

        fetch('http://localhost:8080/curso/alta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.evento === "success") {
                    setEstado({
                        message: result.message,
                        estado: "success"
                    });
                } else {
                    setEstado({
                        message: result.message,
                        estado: "error"
                    });
                }
                router.push('/privado/altacursos');
            })
            .catch((error) => {
                // Manejar errores
                console.error(error);
            });
    };

    return (
        <body className={isSidebarToggled ? 'nav-fixed' : 'nav-fixed sidenav-toggled'}>
            <NavPrivado data={data} isSidebarToggled={isSidebarToggled} toggleSidebar={toggleSidebar} />
            <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <Sidebar />
            </div>
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-xl px-4">
                            <div className="row justify-content-center">
                                <div className="col-lg-7">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">

                                        {estado.message === '' ? (
                                            <>
                                                <div className="card-header justify-content-center">
                                                    <h3 className="fw-light my-4">Carrera</h3>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row gx-3">
                                                        <div className="col-md-8">
                                                            <div className="mb-3">
                                                                <label className="small mb-1">Nombre:</label>
                                                                <input 
                                                                    className="form-control" name='nombre' type="text" id="nombre" 
                                                                    value={nombre} onChange={handleNombreChange} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="mb-3">
                                                                <label className="smal mb-1">Duración:</label>
                                                                <input 
                                                                    className="form-control" name='duracion' min="0" type="number" id="duracion" 
                                                                    value={duracion} onChange={handleDuracionChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className='m-2' />
                                                    <div className="row gx-3">
                                                        <div className="col-md-12">
                                                            <div className="mb-6">
                                                                <label className="small mb-1">Lista de Asignaturas:</label>
                                                                
                                                            </div>
                                                        </div>
                                                        
                                                        {asignaturas.map((asignatura, index) => (
                                                            <div className="col-md-3 m-1">
                                                                <div key={index}>
                                                                    <input
                                                                        className="form-control bg-light border-bottom-0 border-top-0 border-end-0 border-lg rounded border-primary"
                                                                        type="text"
                                                                        value={asignatura.nombre}
                                                                        onChange={(e) => handleAsignaturaChange(e, index)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}

                                                        <div className="col-md-2">
                                                            <button 
                                                                className="btn btn-secondary"
                                                                onClick={handleAgregarAsignatura}>+</button>
                                                        </div>
                                                    </div>
                                                    <hr className='m-2' />
                                                    <div className="w-full lg:w-12/12 px-4">
                                                        <div className="mb-6">
                                                            <button 
                                                                className="btn btn-primary w-full lg:w-1/1"
                                                                onClick={handleEnviarFormulario}>Enviar</button>
                                                        </div>
                                                    </div>
                                                
                                                </div>
                                            </>
                                        ) : (
                                            <div>
                                                <div className={`alert alert-icon ${estado.estado === "success" ? "bg-green-500" : "bg-red-500"}`} role="alert">
                                                    <button className="btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    <div className="alert-icon-aside">
                                                        <i className="far fa-flag"></i>
                                                    </div>
                                                    <div className="alert-icon-content">
                                                        <h6 className="alert-heading">Aviso del sistema</h6>
                                                        {estado.message}!
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>    
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </body>
    );
};

export default Formulario;