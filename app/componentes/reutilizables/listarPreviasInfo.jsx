import React, {useState, useEffect} from "react";
import axios from "@/utils/axios";
import { DataSet } from "vis-data/esnext";
import { Network } from "vis-network/esnext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faCheckCircle, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

export default function ListarPreviasInfo({
    listaAsignatura,
    handleAsignaturaChange,
    listAsignatura,
    listasInfo,
    formData
}) {
    const [detalleAsignatura, setDetalleAsignatura] = useState([]);

    const fetchListaPrevia = async () => {
        try {
            const responseAsignatura = await axios.get('Coordinador/getAsignatura?idAsignatura=' + formData.idAsignatura);
            setDetalleAsignatura(responseAsignatura.data);
        } catch (error) {
            console.error('Error fetching listaPrevia:', error)
        }
    }

    useEffect(() => {
        fetchListaPrevia();
    }, [formData.idAsignatura]);

    // mostrar grafos
    const [id] = useState("nodos")
    const [nodes, setNodes] = useState([])
    const [edges, setEdges] = useState([])
    // Fetch data grafo
    useEffect(() => {
        const fetchData = async () => {
            if (formData.idCarrera !== null) {
                try {
                    const { data, status } = await axios.get('metadata/getDataGrafo?idCarrera=' + formData.idCarrera)

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
    }, [ formData.idCarrera ])

    useEffect(() => {
        if (nodes.length === 0) return;

        let filteredNodes = nodes;
        let filteredEdges = edges;

        if (formData.idAsignatura !== null) {
            const requiredNodes = new Set([formData.idAsignatura]);
            const stack = [formData.idAsignatura];

            while (stack.length > 0) {
                const nodeId = stack.pop();
                edges.forEach(edge => {
                    if (edge.to === nodeId && !requiredNodes.has(edge.from)) {
                        requiredNodes.add(edge.from);
                        stack.push(edge.from);
                    }
                });
            }

            filteredNodes = nodes.filter(node => requiredNodes.has(node.id));
            filteredEdges = edges.filter(edge => requiredNodes.has(edge.from) && requiredNodes.has(edge.to));
        }

        const container = document.getElementById(id);
        const data = {
            nodes: new DataSet(
                filteredNodes.map(
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
                filteredEdges.map(
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
            layout: {
                hierarchical: {
                direction: "DU",
                sortMethod: "directed",
                },
            },
            physics: {
                hierarchicalRepulsion: {
                avoidOverlap: 1,
                },
            },
        };
        const network = new Network(container, data, options);
        return () => {
            network.destroy();
        };
    }, [nodes, edges, formData.idAsignatura]);

    return (
        <div className="container-xl">
            <div className="card shadow-lg border-0 rounded-lg">
                <div className="card-header justify-content-center">
                    <h3 className="fw-light">
                        {listasInfo.cu} | Lista de Previas para: <span className="badge bg-primary text-white ms-5">{formData.nombreAsignatura}</span>
                    </h3>
                </div>
                <div className="card-body">
                    {/** DETALLE DE HORARIOS */}
                    <div className="container-fluid px-4">
                        <div className="card bg-gradient-primary-to-secondary mb-4">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="container-fluid">
                                        <div className="row gx-4">
                                            {/** PREVIAS YA ASIGNADAS */}
                                            <div className="col mb-3">
                                                <div className="text-white">
                                                    <label htmlFor="listaAsignatura">
                                                        Lista de asignaturas
                                                    </label>
                                                </div>
                                                <select
                                                    className="form-control"
                                                    id="listaAsignatura"
                                                    selected={formData?.idAsignatura || ""}
                                                    onChange={handleAsignaturaChange}
                                                    >
                                                    <option value="" disabled selected>
                                                        Seleccione una asignatura
                                                    </option>
                                                    {listaAsignatura.length > 0 ? (
                                                        listaAsignatura.map((asignatura) => (
                                                            <option
                                                                key={asignatura.id}
                                                                value={asignatura.id}>
                                                                [ {asignatura.gradoSemestre} ] {asignatura.nombre}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option>No se recibieron datos aún</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="container-fluid mb-4">
                                <div className="row gx-4">
                                    {/** PREVIAS YA ASIGNADAS */}
                                    <div className="col-lg-6">
                                        <div className="card mb-4">
                                            <div className="card-header">Detalles de previas</div>
                                            <div className="card-body p-0">
                                                <table className="table table-striped mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th>Estado</th>
                                                            <th>Nombre</th>
                                                            <th>Requisito</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {detalleAsignatura.previaturas && detalleAsignatura.previaturas.length > 0 ? (
                                                            detalleAsignatura.previaturas.map((previatura, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <FontAwesomeIcon icon={faCheckCircle} className="text-success text-xs me-2" />
                                                                    </td>
                                                                    <td><strong>{previatura.nombrePrev}</strong></td>
                                                                    <td>{previatura.requisito}</td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="3" className="text-center">No se asignaron previas aún.</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="card-footer"></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <div className="card mb-4">
                                            <div className="card-header">Grafo de previas</div>
                                            <div className="card-body">
                                                <div className="container-previas" id={id} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/** AYUDA */}
                    <div className="card card-icon mb-4">
                        <div className="row no-gutters">
                            <div className="col-auto card-icon-aside bg-primary text-white">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                            </div>
                            <div className="col">
                                <div className="card-body py-5">
                                    <h5 className="card-title">{listasInfo.tituloInfo}</h5>
                                    <p className="card-text">{listasInfo.mensajeInfo}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
