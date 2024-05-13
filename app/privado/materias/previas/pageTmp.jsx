"use client";
import { useState, useEffect } from "react";
// all peer dependencies have to be installed
// even if you don't import them yourself
import { DataSet } from "vis-data/esnext";
import { Network } from "vis-network/esnext";
import "vis-network/styles/vis-network.css";
import Sidebar from "../../../componentes/siders/sidebar.jsx";
import NavPrivado from '../../../componentes/navs/nav-privado.jsx';
import { decodeJwt} from "jose";

function VerPreviaturas() {

    const [graphData, setGraphData] = useState(null);
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
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8080/metadata/getDataGrafo?idCarrera=1");
          const data = await response.json();
          if (data.evento === "success") {
            setGraphData(data);
          } else {
            throw new Error("Error fetching graph data");
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, []);

    if (graphData) {
      console.log("data asignaturas");
      console.log(graphData.dataAsignatura);
      console.log("data punteros");
      console.log(graphData.dataPuntero);
      // Render the graph using the fetched data
      // You can access the data using graphData.dataAsignatura and graphData.dataPuntero
      // Example usage: const nodes = new DataSet(graphData.dataAsignatura);
      // Example usage: const edges = new DataSet(graphData.dataPuntero);
    }

    // Rest of the component code...


  useEffect(() => {
    const nodes = new DataSet([
      { id: 1, label: "Arq. del Computador", font: { size: 12, color: "red", face: "arial" } },
      { id: 2, label: "MDL1", font: { size: 12, color: "red", face: "arial" } },
      { id: 3, label: "Matematicas", font: { size: 12, color: "red", face: "arial" } },
      { id: 4, label: "Ingles Tec. 1", font: { size: 12, color: "red", face: "arial" } },
      { id: 5, label: "Ingles Tec. 2", font: { size: 12, color: "blue", face: "arial" }},
      { id: 6, label: "Principios de programacion", font: { size: 12, color: "red", face: "arial" } },
      { id: 7, label: "Base de datos 1", font: { size: 12, color: "blue", face: "arial" }},
      { id: 8, label: "EDA", font: { size: 12, color: "blue", face: "arial" }},
      { id: 9, label: "Sistemas Operativos", font: { size: 12, color: "blue", face: "arial" }},
      { id: 10, label: "Redes de Computadoras", font: { size: 12, color: "blue", face: "arial" }},
      { id: 11, label: "MDL2", font: { size: 12, color: "blue", face: "arial" }},
      { id: 12, label: "Base de datos 2", font: { size: 12, color: "blue", face: "arial" }},
      { id: 13, label: "COE"},
      { id: 14, label: "Contabilidad"},
      { id: 15, label: "Programacion avanzada"},
      { id: 16, label: "ADI"},
      { id: 17, label: "IS"},
      { id: 18, label: "PYE"}
    ]);

    // create an array with edges

    const edges = new DataSet([
      { from: 6, to: 7, arrows: "to", dashes: [5, 5], label: "cursado", color: "red"},
      { from: 2, to: 11, arrows: "to", label: "aproabdo"},
      { from: 6, to: 8, arrows: "to", label: "aprobado" },
      { from: 2, to: 8, arrows: "to", label: "aprobado" },
      { from: 1, to: 9, arrows: "to", label: "aprobado" },
      { from: 7, to: 12, arrows: "to", label: "aprobado" },
      { from: 1, to: 10, arrows: "to", label: "aprobado" },
      { from: 8, to: 15, arrows: "to", label: "aprobado" },
      { from: 9, to: 16, arrows: "to", label: "aprobado" },
      { from: 10, to: 16, arrows: "to", dashes: [5, 5], label: "cursado", color: "red" },
      { from: 8, to: 17, arrows: "to", label: "aprobado" },
      { from: 7, to: 17, arrows: "to", label: "aprobado" },
      { from: 12, to: 17, arrows: "to", dashes: [5, 5], label: "cursado", color: "red" },
      { from: 15, to: 17, arrows: "to", dashes: [5, 5], label: "cursado", color: "red" },
      { from: 11, to: 18, arrows: "to", label: "aprobado" },
      { from: 2, to: 17, arrows: "to", label: "aprobado" }
    ]);

    // create a network
    const container = document.getElementById("mynetwork");
    const data = {
      nodes: nodes,
      edges: edges
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
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

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
                                  <div className="page-header-subtitle">Bienvenido .</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </header>
              <div className="container-xxl px-4 mt-n10">
                <div className="card">
                    <div className="card-body text-center p-5">
                        <h5>Previas</h5>
                        <div className="container-previas" id="mynetwork" />
                    </div>
                </div>
              </div>
          </main>
        </div>
      </div>
    </>
  );
}
export default VerPreviaturas;