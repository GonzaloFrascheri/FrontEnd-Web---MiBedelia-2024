'use client'
import React, { useEffect, useState } from "react";
import axios from '@/utils/axios'
import { DataSet } from "vis-data/esnext";
import { Network } from "vis-network/esnext";
import NavPublico from '@/app/componentes/navs/nav-publico.jsx';
import Footer from '@/app/componentes/main/footer';

const Previas = () => {

    const [id] = useState("nodos")
    const [nodes, setNodes] = useState([])
    const [edges, setEdges] = useState([])

    // carrera
    const [carreraId, setCarreraId] = useState(null);
    const [carreraNombre, setCarreraNombre] = useState(null);
    const [listaCarrera, setListaCarrera] = useState([])
    const handleCarreraChange = (event) => {
        const selected = Number(event.target.value);
        const selectedCarrera = listaCarrera.find(
            (carrera) => carrera.id === selected
        );
        setCarreraId(selectedCarrera.id)
        setCarreraNombre(selectedCarrera.nombre)
    }
    // Fetch lista carrera
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, status } = await axios.get('public/listarCarrera')
                if (status === 200) {
                    setListaCarrera(data)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    // grafos
    useEffect(() => {
        const fetchData = async () => {
            if (carreraId !== null) {
                try {
                    const { data, status } = await axios.get('metadata/getDataGrafo?idCarrera=' + carreraId)

                    if (status === 200) {
                        setNodes(data.dataAsignatura)
                        setEdges(data.dataPuntero)
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        }
    
        fetchData()
    }, [ carreraId ])

    useEffect(() => {
        if (nodes.length === 0) return;
        console.info('entro en nodes')
        // create a network
        const container = document.getElementById(id);
        const data = {
            nodes: new DataSet(
                nodes.map(
                    item => ({ 
                        id: item.id, 
                        label: item.label, 
                        font: { 
                            size: 12, 
                            color: "red", 
                            face: "arial" 
                        } 
                    })
                )
            ),
            edges: new DataSet(
                edges.map(
                    item => ({ 
                        from: item.from, 
                        to: item.to, 
                        label: item.label,
                        arrows: "to", 
                        dashes: item.requisito === "EXONERADO" ? false : [5, 5],
                        color: item.requisito === "EXONERADO" ? "blue" : "red",
                        font: { 
                            size: 12, 
                            color: "red", 
                            face: "arial" 
                        }
                    })
                )
            )
        };
        const options = {
        nodes: {
            shape: "box"
        },
        };
        const network = new Network(container, data, options);
        // Cleanup function to destroy the network when the component unmounts
        return () => {
        network.destroy();
        };
    }, [nodes, edges]);

    return (
        <>
        <NavPublico />
        <div id="layoutSidenav">
            <div id="layoutSidenav_content">
                <main>
                    <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
                        <div className="container-xl px-4">
                            <div className="page-header-content pt-4">
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-auto mt-4">
                                        <h1 className="page-header-title">
                                            <div className="page-header-icon"><i data-feather="activity"></i></div>
                                            Vista de Previatura de Carreras en grafos
                                        </h1>
                                        <div className="page-header-subtitle">Mi Bedelia</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="container-xl px-4 mt-n10">
                        <div className="row">
                            <div className="col-xxl-12 col-xl-12 mb-12">
                                <div className="card card-header-actions h-100">
                                    <div className="card-header">
                                        Selecciones una carrera:
                                        <select 
                                            className="w-50 form-control" 
                                            id="listaDeCarrera"
                                            onChange={handleCarreraChange}
                                        >
                                            <option value="" disabled selected>Seleccione una carrera</option>
                                            {listaCarrera && (listaCarrera.length > 0 ? (
                                                listaCarrera.map((carrera) => (
                                                    <option key={carrera.id} value={carrera.id}>{carrera.nombre}</option>
                                                ))
                                            ) : (
                                                <option>No se recibieron datos aún</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="card-body h-100 p-5">
                                        {carreraId !== null ? (
                                            <div className="card bg-light">
                                                <div className="card-header text-dark">
                                                    Previatura de la carrera: {carreraNombre}
                                                    <span className="text-primary">[-----&gt;] Exonerado</span>
                                                    <span className="text-red">[- - -&gt;] A examen</span>
                                                </div>
                                                <div className="card-body">
                                                    <div className="container-previas" id={id} />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="card card-icon">
                                                <div className="row no-gutters">
                                                    <div className="col-auto card-icon-aside bg-primary text-white">
                                                        <i className="fas fa-question-circle"></i>
                                                    </div>
                                                    <div className="col">
                                                        <div className="card-body py-5">
                                                            <h5 className="card-title">Vista de Previatura de Carreras en grafos</h5>
                                                            <p className="card-text">Seleccione una carrera para visualizar su previatura en grafos.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
      </>
    );
};

export default Previas;
