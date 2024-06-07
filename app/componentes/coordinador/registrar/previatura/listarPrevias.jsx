import React, {useState, useEffect} from "react";
import axios from "@/utils/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faCheckCircle, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

export default function ListarPreviasInfo({
    listAsignatura,
    listasInfo,
    formData
}) {

    const [showPopup, setShowPopup] = useState(false);
    const [selectedAsignatura, setSelectedAsignatura] = useState(null);
    const [requisito, setRequisito] = useState('EXONERADO');
    const [estado, setEstado] = useState({message: '', estado: '', refresh: 0});
    const [detalleAsignatura, setDetalleAsignatura] = useState([]);

    const handleMostrarPopUp = (asignatura) => {
        setSelectedAsignatura(asignatura);
        setShowPopup(true);
    };

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
    }, [estado.refresh]);
                
    const handleAsignarPrevia = async () => {
        try {
            // envío datos al bk
            const datos = {
                idAsigOrigen: formData.idAsignatura,
                idPrevAsignada: selectedAsignatura.id,
                requisito: requisito
            };
            const { data, status } = await axios.post('Coordinador/registrarPreviatura', datos);
            console.log('data:', data);
            // si la data es ok - docente fue dado de alta
            if (status === 200) {
                setEstado({
                    message: data.message,
                    estado: 'success',
                    refresh: estado.refresh + 1
                });
            }else{
                setEstado({
                    message: data.message,
                    estado: 'danger'
                });
            }
        } catch (error) {
            console.error('Error al guardar la asignatura:', error);
            setEstado({
                message: error.response ? error.response.data.message : 'Error al guardar la asignatura',
                estado: 'danger'
            });
        }finally {
            setShowPopup(false);
            setTimeout(() => setEstado({ message: '', estado: '' }), 5000);
        }
    };

    const handleCancelar = () => {
        setShowPopup(false);
    };

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
                                    {detalleAsignatura.horarios && detalleAsignatura.horarios.length > 0 ? (
                                        (() => {
                                            const horario = detalleAsignatura.horarios[detalleAsignatura.horarios.length - 1];
                                            return (
                                                <>
                                                    <div key={detalleAsignatura.horarios.length - 1} className="mb-3">
                                                        <div className="small text-white-50">
                                                            <strong>Horario:</strong> {horario.horarioInicio} - {horario.horarioFin}
                                                        </div>
                                                        <div className="h1 text-white">
                                                            <strong>Docente:</strong> {horario.nombreDocente} ({horario.ciDocente})
                                                        </div>
                                                    </div>
                                                    <div className="text-white">
                                                        <p><strong>Días Dictados:</strong> {horario.diasDictados !== null ? (
                                                            horario.diasDictados.join(", ")
                                                        ) : (
                                                            "No especificado"
                                                        )}</p>
                                                        <strong>Semestre:</strong> {horario.tipoSemestre} ({new Date(horario.inicioSemestre).toLocaleDateString()} - {new Date(horario.finSemestre).toLocaleDateString()})
                                                    </div>
                                                </>
                                            );
                                        })()
                                    ) : (
                                        <div className="me-3">
                                            <div className="h1 text-white">No hay horarios asignados.</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/** MENSAJES */}
                    {estado.message && (
                        <div>
                            <div
                                className={`alert alert-icon m-2 alert-${estado.estado}`}
                                role="alert"
                            >
                                <button
                                    className="btn-close"
                                    type="button"
                                    data-bs-dismiss="alert"
                                    aria-label="Close"
                                ></button>
                                <div className="alert-icon-aside">
                                    <i className="far fa-flag"></i>
                                </div>
                                <div className="alert-icon-content">
                                    <h6 className="alert-heading">Resultado</h6>
                                    {estado.message}!
                                </div>
                            </div>
                        </div>
                    )}
                    {/** DETALLE DE PREVIAS */}
                    <div className="container-fluid mb-4">
                        <div className="row gx-4">
                            {/** PREVIAS YA ASIGNADAS */}
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
                            {/** FORM PARA ASIGNAR PREVIAS */}
                            <div className="col-lg-6">
                                <div className="card card-header-actions">
                                    <div className="card-header">
                                        Agregar previas
                                    </div>
                                    <div className="card-body p-0">
                                        <ul className="list-group list-group-flush">
                                            {console.info("detalleAsignatura.previaturas:", detalleAsignatura, formData)}
                                            {
                                                formData.idSemestre === 1 ? (
                                                    <li className="list-group-item">No se admiten previas para Asignaturas de semestre uno.</li>
                                                ) : (
                                                    listAsignatura.filter(asignatura =>
                                                        detalleAsignatura.previaturas &&
                                                        !detalleAsignatura.previaturas.some(previatura => previatura.idPrevAsignada === asignatura.id)
                                                    ).map((asignatura) => (
                                                        <li
                                                            key={asignatura.id}
                                                            className="list-group-item"
                                                            onClick={() => handleMostrarPopUp(asignatura)}
                                                        >
                                                            <FontAwesomeIcon icon={faArrowAltCircleLeft} className="text-danger text-xs me-2" />
                                                            ({asignatura.gradoSemestre}) {asignatura.nombre}
                                                        </li>
                                                    ))
                                                )
                                            }
                                        </ul>
                                    </div>
                                    <div className="card-footer"></div>
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
            {/* Modal Popup */}
            {showPopup && (
                <div className="modal show fade" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Asignar Previa</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCancelar}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={selectedAsignatura?.nombre || ''}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Grado/Semestre</label>
                                        <select
                                            className="form-control"
                                            value={requisito}
                                            onChange={(e) => setRequisito(e.target.value)}
                                        >
                                            <option value="EXONERADO">EXONERADO</option>
                                            <option value="A_EXAMEN">A_EXAMEN</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCancelar}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleAsignarPrevia}>Asignar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}