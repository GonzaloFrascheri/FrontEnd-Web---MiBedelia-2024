import React, { useState, useEffect } from 'react';
import axios from '@/utils/axios'
import * as XLSX from 'xlsx';
import {GenerarExcelActaExamen} from '@/app/componentes/generadorEXCEL/actaExamen.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faExclamationTriangle,faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import DataTable from 'react-data-table-component';

export default function ExamenRegistrar({
    listasInfo,
    formData,
    setFormData,
    estado,
    setEstado,
    examenDto
}) {
    

    const { EXCELGenerador } = GenerarExcelActaExamen();
    const [file, setFile] = useState(null);
    const [studentsData, setStudentsData] = useState([]);
    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const generarExcel = () => {
        if (!examenDto) {
            console.error('examenDto es null');
            setError(true);
        } else {
            const datosPrueba = {
                fecha: examenDto.fechaExamen,
                asignatura: examenDto.nombreAsignatura,
                periodo: examenDto.idPeriodo,
                año: examenDto.anioLectivo,
                docente: {
                    nombre: examenDto.nombreDocente,
                },
                estudiantes: examenDto.estudiantes,
                horario: examenDto.horario,
                diaInicio: examenDto.diaInicio,
                diaFin: examenDto.diaFin,
                logo: '', // Imagen en base64
                enumNotas: {
                    aprobado: 'APROBADO',
                    aExamen: 'A_EXAMEN',
                    reprobado: 'REPROBADO'
                }
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
            
            try {
                // Procesar los datos del archivo Excel
                const estudiantesProcesados = jsonData.slice(15).map(row => {
                    const nota = (row[6] || '').toUpperCase().trim();
                    const validNotas = ["APROBADO", "A_EXAMEN", "REPROBADO"];
                    if (!validNotas.includes(nota)) {
                        throw new Error(`Nota inválida para el estudiante: ${row[1]} ${row[2]}, usted escribió: ( ${row[6]} ).`);
                    }
                    return {
                        nombre: row[1],
                        apellido: row[2],
                        ci: row[3],
                        telefono: row[4],
                        email: row[5],
                        nota: nota,
                        id: row[7],
                        idInscripcion: row[8]
                    };
                });
                setEstado({
                    ...estado,
                    paso: 4,
                });
    
                setStudentsData(estudiantesProcesados);
                setErrorMessage('');
            } catch (error) {
                setErrorMessage(error.message);
                console.error('Error al procesar el archivo:', error);
            }
        };
        reader.readAsArrayBuffer(file);
    };
    

    const handleSubmitExcel = (e) => {
        e.preventDefault();
        if (file) {
            try {
                leerExcel(file);
            } catch (error) {
                console.error('Error al procesar el archivo:', error);
                alert(`Error al procesar el archivo: ${error.message}`);
            }
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
            id: formData.idExamen,
            nombreAsignatura: formData.nombreExamen,
            estudiantes: studentsData.map(est => ({
                id: est.id,
                ci: est.ci,
                idInscripcion: est.idInscripcion, // Assuming you will provide the correct ID later
                resultado: est.nota
            }))
        };
        try {
            console.info('Enviando datos:', datos);
            /*
            const {data, status} = await axios.put('Funcionario/registrarActaExamen', datos);
            if (status === 200) {
                setEstado({
                    ...estado,
                    message: data.message + ' Se registró con éxito el acta para la asignatura: [' + examenDto.nombreAsignatura + '].',
                    estado: data.evento
                });
            }
            */
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
                            {listasInfo.cu} |
                            Generar Acta de Examen para la asignatura: <span className="badge bg-primary text-white ms-5">
                                {formData?.nombreExamen || ""}
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
                                    <div className="card card-icon">
                                        <div className="row no-gutters">
                                            <div className="col-auto card-icon-aside bg-primary text-white">
                                                <FontAwesomeIcon icon={faQuestionCircle} />
                                            </div>
                                            <div className="col">
                                                <div className="card-body py-5">
                                                    <h5 className="card-title">Paso 4: Confirmar datos</h5>
                                                    <p className="card-text">Verifique que los datos estén cargados correctamente y haga clic en "Confirmar" para enviar los datos.</p>
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
                                            <FontAwesomeIcon icon={faInfoCircle} />
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
                            {errorMessage && (
                                <div className="alert alert-danger alert-icon" role="alert">
                                    <div className="alert-icon-aside">
                                        <FontAwesomeIcon icon={faExclamationTriangle} />
                                    </div>
                                    <div className="alert-icon-content">
                                        <h6 className="alert-heading">{errorMessage}</h6>
                                        Recuerde que las notas posibles son: APROBADO, A_EXAMEN, REPROBADO.<br />
                                        Por favor, modifique nuevamenete el archivo descargado y asegurese de utilziar este formato de nota.<br />
                                        Recuerde guardar sus cambios.<br />
                                    </div>
                                </div>
                            )}
                            <div className="card card-icon">
                                <div className="row no-gutters">
                                    <div className="col-auto card-icon-aside bg-primary text-white">
                                        <FontAwesomeIcon icon={faQuestionCircle} />
                                    </div>
                                    <div className="col">
                                        <div className="card-body py-5">
                                            <h5 className="card-title">Paso 3: Cargar el archivo excel con las notas</h5>
                                            <p className="card-text"><b>1ro.:</b> utilice el botón "Descargar Planilla en Excel" y descarge el archivo en su equipo.</p>
                                            <p className="card-text"><b>2do.:</b> Modifique el archivo en su equipo, cargando las notas correspondiente a cada estudiantes en la columna "Notas".</p>
                                            <p className="card-text"><b>3ro.:</b> utilice el botón "Cargar Planilla Excel" para seleccionar el archivo descargado y ya modificado, recuerde guardar los cambios.</p>
                                            <p className="card-text"><b>4to.:</b> Utilice el botón "Analizar Notas" para procesar las notas y generar el acta de examen.</p>
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
    );
    
}