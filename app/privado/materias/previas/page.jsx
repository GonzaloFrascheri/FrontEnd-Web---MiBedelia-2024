"use client";
import { useState, useEffect } from "react";
import "vis-network/styles/vis-network.css";
import Sidebar from "../../../componentes/siders/sidebar.jsx";
import NavPrivado from '../../../componentes/navs/nav-privado.jsx';
import Previas from '../../../componentes/grafos/previas.jsx';
import { decodeJwt} from "jose";

function VerPreviaturas() {

    const [data, setData] = useState('');
    useEffect(() => {
      const token = sessionStorage.getItem("tokenFront");
      if (!token) {
        router.push("/");
      } else {
        setData(decodeJwt (token));
      }
    }, []);

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8080/metadata/getDataGrafo?idCarrera=1");
          const data = await response.json();
          if (data.evento === "success") {
            setNodes(data.dataAsignatura);
            setEdges(data.dataPuntero);
          } else {
            throw new Error("Error fetching graph data");
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
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
                        <Previas id="mynetwork" nodes={nodes} edges={edges} />
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