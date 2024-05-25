import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAltm, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Index({listaAsignaturas, handleAsignaturaChange, handleChange, handleSubmit, periodoActivo, listaDocentes, formData, estado}) {
    //console.info("formdata", formData);
    const periodoInicio = formatFecha(periodoActivo.diaInicio);
    const periodoFin = formatFecha(periodoActivo.diaFin);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedDocente, setSelectedDocente] = useState({
        id: null,
        ci: "",
        nombre: "Debe seleccionar un docente",
        apellido: ""
    });
  
    const handleOpenPopup = () => {
      setIsPopupOpen(true);
    };
  
    const handleClosePopup = () => {
      setIsPopupOpen(false);
    };
  
    const handleSelectDocente = (docente) => {
      setSelectedDocente(docente);
      setIsPopupOpen(false);
      formData.idDoncente = docente.id;
      //console.log('Docente seleccionado:', docente); // Aquí puedes manejar los datos del docente seleccionado
    };

    function formatFecha(fecha) {
        const date = new Date(fecha);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses son indexados desde 0
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleDateChange = (date) => {
        handleChange({
            target: {
                name: 'fechaExamen',
                value: date //format(date, 'yyyy-MM-dd')
            }
        });
    };

    return (
        <div className="container-xl px-4">
            <div className="card">
                <div className="card shadow-lg border-0 rounded-lg">
                        <div className="card-header justify-content-center">
                            <h3 className="fw-light">Registro de un exámen relacionado a una asignatura</h3>
                        </div>
                        { estado.message === '' ? (
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="listaAsignatura">Lista de asignaturas</label>
                                            <select 
                                                className="form-control" 
                                                id="listaAsignatura"
                                                onChange={handleAsignaturaChange}
                                            >
                                                <option value="" disabled selected>Seleccione una asignatura</option>
                                                {listaAsignaturas.length > 0 ? (
                                                    listaAsignaturas.map((asignatura) => (
                                                        <option key={asignatura.id} value={asignatura.id}>{asignatura.nombre}</option>
                                                    ))
                                                ) : (
                                                    <option>No se recibieron datos aún</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label 
                                                htmlFor="fechaExamen"
                                                className="form-label col-md-12 mb-0">
                                                    Fecha exámen:
                                                    <span className="badge bg-primary text-white ms-5">
                                                        Inicio: {periodoInicio} - Fin {periodoFin}
                                                    </span>
                                            </label>
                                            <DatePicker
                                                id="fechaExamen"
                                                selected={formData.fechaExamen}
                                                onChange={handleDateChange}
                                                dateFormat="yyyy-MM-dd"
                                                minDate={periodoInicio}
                                                maxDate={periodoFin}
                                                className="form-control w-100"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label htmlFor="codigo" className="form-label">Docente:</label>
                                            <div className="input-group input-group-joined">
                                                <input
                                                    type="text"
                                                    id="idDocente"
                                                    name="idDocenteDatos"
                                                    value={"[ "+selectedDocente.id+" ] " + selectedDocente.nombre + " " + selectedDocente.apellido + " ( "+selectedDocente.ci+" )"}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    disabled
                                                    required
                                                />
                                                <span className="input-group-text">
                                                    <FontAwesomeIcon 
                                                        icon={faSearch} 
                                                        onClick={handleOpenPopup}
                                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {selectedDocente && (
                                        <div>
                                        <h3>Docente Seleccionado:</h3>
                                        <p>
                                            ID: {selectedDocente.id} -
                                            CI: {selectedDocente.ci} -
                                            Nombre: {selectedDocente.nombre} -
                                            Apellido: {selectedDocente.apellido}
                                        </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary">Crear exámen</button>
                            </div>
                        </form>
                        ) : (
                            <div className="card-body">
                                <div className="alert alert-danger" role="alert">
                                    {estado.message}
                                </div>
                            </div>
                        )
                        }


                    <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Default Bootstrap Modal</h5>
                                    <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="popup">
                                        <ul>
                                            {listaDocentes.map(docente => (
                                                <li key={docente.id} onClick={() => handleSelectDocente(docente)}>
                                                {docente.nombre} {docente.apellido} ({docente.ci})
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="modal-footer"><button className="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}