import React, {useState, useEffect} from "react";
import axios from "@/utils/axios";
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
                                    <div className="container-fluid mb-4">
                                        <div className="row gx-4">
                                            {/** PREVIAS YA ASIGNADAS */}
                                            <div className="col-lg-6 mb-3">
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
                                            <div className="col-lg-6">
                                                <div className="card mb-4">
                                                    <div className="card-header">Detalles de previas</div>
                                                    <div className="card-body p-0">
                                                        <table className="table table-striped">
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
