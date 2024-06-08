'use client'
import React, { useEffect, useState } from "react";
import axios from '@/utils/axios'
import { DataSet } from "vis-data/esnext";
import { Network } from "vis-network/esnext";
import NavPublico from '@/app/componentes/navs/nav-publico.jsx';
import Footer from '@/app/componentes/main/footer';

const Previas = () => {

    const [id, setId] = useState("nodos")
    const [nodes, setNodes] = useState([])
    const [edges, setEdges] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data, status } = await axios.get('metadata/getDataGrafo?idCarrera=1')

            if (status === 200) {
                setNodes(data.dataAsignatura)
                setEdges(data.dataPuntero)
            }
          } catch (error) {
                console.error(error)
          }
        }
    
        fetchData()
    }, [])

    useEffect(() => {
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
                        dashes: item.requisito === "aprobado" ? false : [5, 5],
                        color: item.requisito === "aprobado" ? "blue" : "red",
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
    }, [id, nodes, edges]); // Dependency array ensures the effect runs only once after the initial render
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
                                <div className="card h-100">
                                    <div className="card-header">
                                        <h5 className="card-title">Grafo de Previaturas por carrera: Tecnólogo Informático:</h5>
                                    </div>
                                    <div className="card-body h-100 p-5">
                                        <div className="container-previas" id={id} />
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
