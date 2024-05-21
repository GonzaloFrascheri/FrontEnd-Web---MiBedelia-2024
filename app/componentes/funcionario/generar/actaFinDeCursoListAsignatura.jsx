import React, { useEffect, useState } from "react";
import { GenerarPdfActaFinDeCurso } from "@/app/componentes/generadorPDF/actaFinDeCurso";

export default function Index({ listaAsignatura, handleChangeAsignatura, selectedAsignaturaId}) {

    // Función para cargar la imagen y convertirla a base64
    console.log(selectedAsignaturaId);
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
    
    const { PDFGenerador } = GenerarPdfActaFinDeCurso();

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
                asignatura: "Matemáticas II",
                semestre: "Impar",
                año: "2024",
                docente: {
                    nombre: "Juan",
                    apellido: "Pérez"
                },
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
                            <h3 className="fw-light">Elegir una Asignatura</h3>
                            <div className="small">
                                <a href="/privado/Funcionario/Generar/ActaFinDeCurso">Volver</a>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="listaDeAsignaturas">Lista de Asignaturas</label>
                                <select 
                                    className="form-control" 
                                    id="listaDeAsignaturas"
                                    onChange={handleChangeAsignatura}
                                >
                                    {listaAsignatura.length > 0 ? (
                                        listaAsignatura.map((Asignatura) => (
                                            <option key={Asignatura.id} value={Asignatura.id}>{Asignatura.nombre}</option>
                                        ))
                                    ) : (
                                        <option>No se recibieron datos aún</option>
                                    )}
                                </select>
                            </div>
                            <div className="mb-3">
                                <button 
                                    className="btn btn-primary" 
                                    disabled={!selectedAsignaturaId}
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