import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { GenerarPdfActaExamen } from "../../../componentes/generadorPDF/actaExamen";

export default function Index({ listaExamen, handleChangeExamen, selectedExamenId}) {

    const { PDFGenerador } = GenerarPdfActaExamen();

    const generarPDF = () => {
        const datosPrueba = {
            examen: {
                nombre: "Matemáticas II"
            },
            docente: {
                nombre: "Juan",
                apellido: "Pérez"
            },
            fecha: "2024-05-20",
            hora: "10:00 AM",
            aula: "101",
            estudiantes: [
                { nombre: "Carlos", apellido: "García" },
                { nombre: "María", apellido: "Rodríguez" },
                { nombre: "Ana", apellido: "Martínez" }
            ]
        };
        PDFGenerador(datosPrueba);
    };

    return (
        <div className="container-xl px-4 mt-n10">
            <div className="card">
                <div className="card shadow-lg border-0 rounded-lg">
                        <div className="card-header justify-content-center">
                            <h3 className="fw-light">Elegir una Examen</h3>
                            <div className="small">
                                <a href="/privado/Funcionario/Generar/ActaExamen">Volver</a>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="listaDeExamenes">Lista de Examenes</label>
                                <select 
                                    className="form-control" 
                                    id="listaDeExamenes"
                                    onChange={handleChangeExamen}
                                >
                                    {listaExamen.length > 0 ? (
                                        listaExamen.map((examen) => (
                                            <option key={examen.id} value={examen.id}>{examen.nombre}</option>
                                        ))
                                    ) : (
                                        <option>No se recibieron datos aún</option>
                                    )}
                                </select>
                            </div>
                            <div className="mb-3">
                                <button 
                                    className="btn btn-primary" 
                                    disabled={!selectedExamenId}
                                    onClick={generarPDF}
                                >
                                    Generar PDF
                                </button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}