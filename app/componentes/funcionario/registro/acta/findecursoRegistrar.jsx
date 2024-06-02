import React, { useState, useEffect } from 'react';
import axios from '@/utils/axios'
import * as XLSX from 'xlsx';
import {GenerarExcelActaFinDeCurso} from '@/app/componentes/generadorEXCEL/actaFinDeCurso.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import DataTable from 'react-data-table-component'

export default function FinDeCursoRegistrar({
    formData,
    setFormData,
    estado,
    setEstado,
    isFormValid,
    FinDeCursoDto
}) {

    const { EXCELGenerador } = GenerarExcelActaFinDeCurso();
    const [file, setFile] = useState(null);
    const [studentsData, setStudentsData] = useState([]);
    const [isValid, setIsValid] = useState(false);

    const generarExcel = () => {
        if (!FinDeCursoDto) {
            console.error('FinDeCursoDto es null');
            setError(true);
        } else {
            const fecha = new Date(FinDeCursoDto.fechaExamen);
            const datosPrueba = {
                asignatura: FinDeCursoDto.nombreAsignatura,
                semestre: FinDeCursoDto.semestre,
                //fechaExamen: fecha.toISOString().split('T')[0],
                año: FinDeCursoDto.anioLectivo,
                docente: {
                    nombre: FinDeCursoDto.nombreDocente,
                },
                estudiantes: 
                    FinDeCursoDto.estudiantes,
                logo: '' // Imagen en base64
            };
            EXCELGenerador(datosPrueba);
            }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFormData({
            ...formData,
            archivoExcel: file
        });
    };
    useEffect(() => {
        if (file) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [formData]);

    const leerExcel = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            
            // Procesar los datos del archivo Excel
            const estudiantesProcesados = jsonData.slice(13).map(row => ({
                index: row[0],
                nombre: row[1],
                apellido: row[2],
                ci: row[3],
                telefono: row[4],
                email: row[5],
                nota: row[6],
                id: row[7],
                idInscripcion: row[8]
            }));
            setEstado({
                ...estado,
                paso: 4,
            });
            setStudentsData(estudiantesProcesados);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleSubmitExcel = (e) => {
        e.preventDefault();
        if (file) {
            leerExcel(file);
        } else {
            console.error('No se ha seleccionado ningún archivo');
        }
    };

    const columns = [
        { name: 'Nombre', selector: (row) => row.nombre, sortable: true },
        { name: 'Apellido', selector: (row) => row.apellido, sortable: true },
        { name: 'CI', selector: (row) => row.ci, sortable: true },
        { name: 'Teléfono', selector: (row) => row.telefono, sortable: true },
        { name: 'Email', selector: (row) => row.email, sortable: true },
        { name: 'Nota', selector: (row) => row.nota, sortable: true }
    ];

    const enviarDatos = async () => {
        const datos = {
            id: formData.idAsignatura,
            nombreAsignatura: formData.nombreAsignatura,
            estudiantes: studentsData.map(est => ({
                id: est.id,
                ci: est.ci,
                idInscripcion: est.idInscripcion, // Assuming you will provide the correct ID later
                resultado: est.nota
            }))
        };
        
        try {
            console.info('Enviando datos:', datos);
            const {data, status} = await axios.put('Funcionario/registrarActaFinCurso', datos);
            if (status === 200) {
                setEstado({
                    ...estado,
                    message: data.message + ' Se registró con éxito el acta para la asignatura: [' + FinDeCursoDto.nombreAsignatura + '].',
                    estado: data.evento
                });
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setEstado({
                ...estado,
                estado: error.code,
                message: error.message
            })
        }
    };

    return (   
        <div className="container-xl px-4">
            <div className="card">
                <div className="card shadow-lg border-0 rounded-lg">
                    <div className="card-header justify-content-center">
                        <h3 className="fw-light">
                            Generar Acta de Examen para la asignatura:
                            <span className="badge bg-primary text-white ms-5">
                                {formData?.nombreAsignatura || ""}
                            </span>
                        </h3>
                    </div>
                    {studentsData.length > 0 ? (
                        estado.message === '' ?  (
                            <>
                                <div className="card-body">
                                    <h5>Resultados de las Notas:</h5>
                                    <DataTable
                                        columns={columns}
                                        data={studentsData}
                                        pagination
                                        highlightOnHover
                                        pointerOnHover
                                    />
                                    <div class="card card-icon">
                                        <div class="row no-gutters">
                                            <div class="col-auto card-icon-aside bg-primary">
                                                <i data-feather="layers"> <FontAwesomeIcon icon={faQuestionCircle} /> </i>
                                            </div>
                                            <div class="col">
                                                <div class="card-body py-5">
                                                    <h5 class="card-title">Paso 4: Confirmar datos</h5>
                                                    <p class="card-text">Verifique que los datos esten caragdos correctamente y haga clic en "Confirmar" para enviar los datos.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button
                                        className="btn btn-primary"
                                        onClick={enviarDatos}
                                    >
                                        Confirmar
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                            <div className='card-body'>
                                <div
                                    className={`alert alert-icon m-2 alert-primary`}
                                    role='alert'
                                >
                                    <div className='alert-icon-aside'>
                                    <i className='far fa-flag'></i>
                                    </div>
                                    <div className='alert-icon-content'>
                                    <h6 className='alert-heading'>Resultado</h6>
                                    {estado.message}
                                    </div>
                                </div>
                                </div>
                                <div className='card-footer text-center'>
                                <div className='small'>
                                    <a href='/privado'>Volver al inicio</a>
                                </div>
                            </div>
                            </>
                        )
                    ) : (
                    <form onSubmit={handleSubmitExcel} encType="multipart/form-data">
                        <div className="card-body">
                            <div className='row py-2'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <button
                                        className="btn btn-secondary"
                                        type="button"
                                        onClick={generarExcel}
                                    >
                                        Descargar Planilla en Excel
                                    </button>
                                    <input 
                                        type="file" 
                                        accept=".xlsx, .xls" 
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }} 
                                        id="upload-excel"
                                    />
                                    <label htmlFor="upload-excel" className="btn btn-success">
                                        Cargar Planilla Excel
                                    </label>
                                    <button
                                        disabled={!isValid}
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Analizar Notas
                                    </button>
                                </div>
                            </div>
                            <div class="card card-icon">
                                <div class="row no-gutters">
                                    <div class="col-auto card-icon-aside bg-primary">
                                        <i data-feather="layers"> <FontAwesomeIcon icon={faQuestionCircle} /> </i>
                                    </div>
                                    <div class="col">
                                        <div class="card-body py-5">
                                            <h5 class="card-title">Paso 3: Cargar el archivo excel con las notas</h5>
                                            <p class="card-text"><b>1ro.:</b> utilice el botón "Descargar Planilla en Excel" y descarge el archivo en su equipo.</p>
                                            <p class="card-text"><b>2do.:</b> Modifique el archivo en su equipo, cargando las notas correspondiente a cada estudiantes en la columna "Notas".</p>
                                            <p class="card-text"><b>3ro.:</b> utilice el botón "Cargar Planilla Excel" para seleccionar el archivo descargado y ya modificado, recuerde gaurdar los cambios.</p>
                                            <p class="card-text"><b>4to.:</b> Utilice el botón "Analizar Notas" para procesar las notas y generar el acta de examen.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    )}
                </div>
            </div>
        </div>
    )
}