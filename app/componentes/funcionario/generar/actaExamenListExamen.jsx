import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default function Index({ listaAsignatura, handleChangeAsignatura}) {

    return (
        <div className="container-xl px-4 mt-n10">
            <div className="card">
                <div className="card shadow-lg border-0 rounded-lg">
                    <form>
                        <div className="card-header justify-content-center">
                            <h3 className="fw-light">Elegir una asignatura</h3>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="listaDeAsignaturas">Lista de asignaturas</label>
                                <select 
                                    className="form-control" 
                                    id="listaDeAsignaturas"
                                    onChange={handleChangeAsignatura}
                                >
                                    {listaAsignatura.length > 0 ? (
                                        listaAsignatura.map((asignatura) => (
                                            <option key={asignatura.id} value={asignatura.id}>{asignatura.nombre}</option>
                                        ))
                                    ) : (
                                        <option>No se recibieron datos aún</option>
                                    )}
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}