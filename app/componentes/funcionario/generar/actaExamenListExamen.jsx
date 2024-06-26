import React, { useEffect, useState } from "react";
import { GenerarPdfActaExamen } from "@/app/componentes/generadorPDF/actaExamen";

export default function Index({ listaExamen, handleChangeExamen, selectedExamenId, ExamenDto}) {

    const [error, setError] = useState(false);
    // Función para cargar la imagen y convertirla a base64
    const loadImageAsBase64 = (url, callback) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
        const reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    };
    
    const { PDFGenerador } = GenerarPdfActaExamen();

    const [logoBase64, setLogoBase64] = useState(null);

    useEffect(() => {
      // Ruta relativa a la carpeta pública del proyecto
      const logoUrl = `/img/logo.png`;
      loadImageAsBase64(logoUrl, (base64) => {
        setLogoBase64(base64);
      });
    }, []);

    const generarPDF = () => {
        if (logoBase64) {
            if (!ExamenDto) {
                console.error('ExamenDto es null');
                setError(true);
            } else {
                const fecha = new Date(ExamenDto.fechaExamen);
                const datosPrueba = {
                    examen: ExamenDto.nombreAsignatura,
                    docente: ExamenDto.nombreDocente,
                    fecha: fecha.toISOString().split('T')[0],
                    año: ExamenDto.anioLectivo,
                    hora: ExamenDto.horario,
                    aula: "___",
                    estudiantes: ExamenDto.estudiantes,
                    logo: logoBase64 // Imagen en base64
                };
                console.info('estudiante', ExamenDto.estudiantes);
                PDFGenerador(datosPrueba);
            }
        }
    };

    const handleChange = (event) => {
        const selectedId = event.target.value;
        handleChangeExamen(selectedId);
    };

    return (
        <div className="container-xl px-4">
            <div className="card">
                <div className="card shadow-lg border-0 rounded-lg">
                        <div className="card-header d-flex align-items-center justify-content-between">
                            <h3 className="fw-light">Elegir un Examen</h3>
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
                                    onChange={handleChange}
                                >
                                    <option value="" disabled selected>Seleccione un examen...</option>
                                    {listaExamen.length > 0 ? (
                                        listaExamen.map((examen) => (
                                            <option key={examen.id} value={examen.id}>{examen.nombreAsignatura} - {examen.nombreDocente}</option>
                                        ))
                                    ) : (
                                        <option>No se recibieron datos aún</option>
                                    )}
                                </select>
                            </div>
                            {error && (
                            <div className="mb-3">
                                <div className={'alert alert-icon alert-primary'} role="alert">                                
                                    <div className="alert-icon-aside">
                                        <i className="far fa-flag"></i>
                                    </div>
                                    <div className="alert-icon-content">
                                        <h6 className="alert-heading">Resultado</h6>
                                        <p className="mb-0">Aún no se ha generado el Acta para el exámen seleccioando.</p>
                                    </div>
                                </div>
                            </div>
                            )}
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