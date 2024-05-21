import React, { useEffect, useState } from "react";
import { GenerarPdfActaExamen } from "../../../componentes/generadorPDF/actaExamen";

export default function Index({ listaExamen, handleChangeExamen, selectedExamenId}) {

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
                ],
                logo: logoBase64 // Imagen en base64
            };
            PDFGenerador(datosPrueba);
        }
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