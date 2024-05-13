"use client";
import NavPrivado from '../../componentes/navs/nav-privado.jsx';
import Sidebar from "../../componentes/siders/sidebar.jsx";
import TablaConContenido from "../../componentes/tablas/tablas-lista-cursos.jsx";
import React, { useEffect, useState } from "react";
import { decodeJwt} from "jose";

const ListarCursos = () => {

    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [estado, setEstado] = useState(false);

    const [controlError, setControlError] = useState("Cargando...");
    const [data, setData] = useState('');
    useEffect(() => {
      const token = sessionStorage.getItem("tokenFront");
      if (!token) {
        router.push("/");
      } else {
        setData(decodeJwt (token));
      }
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/metadata/getDataGrafo?idCarrera=1')
            .then((response) => {
                console.log("Respuesta: ", response.status);
                if (response.status !== 200) {
                    setControlError("Error al cargar los datos");
                    return 'true';
                }
                return response.json();
            })
            .then((result) => {
                console.log("Resultado: ", result);
                
                const hayDatos = (result === 'true') ? result : false;
                //const cursosArray = Array.isArray(result) ? result : [result];
                setCursos(result);
                setLoading(hayDatos);
            });
    }, []);

    return (
        <>
            <NavPrivado data={data} />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
                            <div className="container-xl px-4">
                                <div className="page-header-content pt-4">
                                    <div className="row align-items-center justify-content-between">
                                        <div className="col-auto mt-4">
                                            <div className="page-header-subtitle">Listado de cursos</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <div className="container-xl px-4 mt-n10">
                            {
                                (loading) 
                                ? (
                                    <div className="card mb-4">
                                        <div className="card-header">Extended DataTables</div>
                                        <div className="card-body">
                                            <p>{controlError}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <TablaConContenido jsonData={cursos} />
                                )
                            }
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default ListarCursos;