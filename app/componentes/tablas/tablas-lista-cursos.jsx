"use client"
import React, { useEffect, useState } from 'react';
import {DataTable} from "simple-datatables"

const TablaConContenido = ({jsonData}) => {
    // Crear un diccionario para almacenar las relaciones de pre-requisitos
    const prerequisites = {};
    jsonData.dataPuntero.forEach(item => {
        if (!prerequisites[item.to]) {
            prerequisites[item.to] = [];
        }
        prerequisites[item.to].push(item.from);
    });

    // Función para obtener las etiquetas de las materias
    const getMateriaLabel = (id) => {
        const materia = jsonData.dataAsignatura.find(item => item.id === id);
        return materia ? materia.label : '';
    };

    const [selectedAsignatura, setSelectedAsignatura] = useState(null);
    const [selectedPrereqRequisito, setSelectedPrereqRequisito] = useState(null);
    const [selectedPrereqPrevia, setSelectedPrereqPrevia] = useState(null);

    function handleAddPrereqClick (event) {
        const asignaturaId = event.target.getAttribute('data-asignatura-id');
        const asignaturaLabel = event.target.getAttribute('data-asignatura-label');
        setSelectedAsignatura({ id: asignaturaId, label: asignaturaLabel });
    };

    const handleSelectChangeRequisito = (event) => {
        setSelectedPrereqRequisito(event.target.value);
    };

    const handleSelectChangePrevia = (event) => {
        setSelectedPrereqPrevia(event.target.value);
    };

    const handleAgregarPreviatura = (event) => {
        const data = {
            "idAsigOrigen": parseInt(selectedAsignatura.id),
            "idPrevAsignada": parseInt(selectedPrereqPrevia),
            "requisito": selectedPrereqRequisito
        };

        console.log(JSON.stringify(data));

        // Realizar la solicitud POST al endpoint
        fetch('http://localhost:8080/asignatura/altaPrevia', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                // Si la respuesta es correcta (código 200-299), puedes manejarla aquí
                console.log('Respuesta del servidor:', response);
                window.location.reload(); // Si deseas recargar la página
            } else {
                // Si hay un problema con la respuesta, lanzar un error
                throw new Error('La solicitud PUT falló');
            }
        })
        .catch(error => {
            // Manejar errores de la solicitud
            console.error('Error al enviar datos:', error);
        });
    };

    useEffect(() => {
        const table1 = new DataTable("#tablaListaCarreraAsignaturaConPrevias", {
            // Configuración de traducciones en español
            /*
            language: {
                "decimal": "",
                "emptyTable": "No hay información",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrar _MENU_ Entradas",
                "loadingRecords": "Cargando...",
                "processing": "Procesando...",
                "search": "Buscar:",
                "zeroRecords": "Sin resultados encontrados",
                "paginate": {
                    "first": "Primero",
                    "last": "Ultimo",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            }
            */
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
            },
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        });
    }, []);

    const renderTable = () => {
        return (
            <table id="tablaListaCarreraAsignaturaConPrevias" className='datatable table'>
                <thead>
                    <tr>
                        <th>Materia</th>
                        <th>Previas</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>Materia</th>
                        <th>Previas</th>
                        <th>Acción</th>
                    </tr>
                </tfoot>
                <tbody>
                    {jsonData.dataAsignatura.map(asignatura => (
                        <tr key={asignatura.id}>
                            <td>{asignatura.label}</td>
                            <td>
                                {jsonData.dataAsignatura.map(prereqAsignatura => (
                                    <div key={prereqAsignatura.id}>
                                        {prerequisites[asignatura.id]?.includes(prereqAsignatura.id) ? getMateriaLabel(prereqAsignatura.id) : ''}
                                    </div>
                                ))}
                            </td>
                            <td>
                                <button 
                                    type="button"
                                    className="btn btn-primary"
                                    data-asignatura-id={asignatura.id}
                                    data-asignatura-label={asignatura.label}
                                    onClick={handleAddPrereqClick}>
                                        +
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="card mb-4">
            <div className="card-header">Extended DataTables</div>
            <div className="card-body">
                <h2>Tabla de materias y pre-requisitos</h2>
                {renderTable()}
                {selectedAsignatura && (
                    <div className="modal fade show" style={{ display: 'block' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Agregar Pre-requisito para {selectedAsignatura.label}</h5>
                                    <button type="button" className="btn-close" onClick={() => setSelectedAsignatura(null)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="idPrevAsignada">ID de Asignatura</label>
                                        <input type="text" className="form-control" id="idPrevAsignada" value={selectedAsignatura.id} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="requisito">Seleccionar requisito</label>
                                        <select className="form-control" id="requisito" onChange={handleSelectChangeRequisito} value={selectedPrereqRequisito}>
                                            <option value="">Seleccionar...</option>
                                            <option value="aprobado">aprobado</option>
                                            <option value="cursado">cursado</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="idAsigOrigen">Seleccionar Previa</label>
                                        <select className="form-control" id="idAsigOrigen" onChange={handleSelectChangePrevia} value={selectedPrereqPrevia}>
                                            <option value="">Seleccionar...</option>
                                            {jsonData.dataAsignatura
                                                .map(asignatura => (
                                                    <option 
                                                        key={asignatura.id}
                                                        id={asignatura.id}
                                                        value={asignatura.id}
                                                        disabled={(asignatura.id==selectedAsignatura.id)?"disabled":''}
                                                    >
                                                        {asignatura.label}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setSelectedAsignatura(null)}>Cerrar</button>
                                    <button type="button" className="btn btn-primary" onClick={handleAgregarPreviatura}>Agregar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TablaConContenido;