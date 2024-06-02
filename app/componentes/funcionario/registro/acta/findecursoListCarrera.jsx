import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

export default function FinDeCursoListCarrera ({ listaCarrera, onCarreraChange }) {
    
    const handleChange = (event) => {
        const selectedId = Number(event.target.value);
        const selectedCarrera = listaCarrera.find(
            (carrera) => carrera.id === selectedId
        );
        if (selectedCarrera) {
            onCarreraChange({ id: selectedId, nombre: selectedCarrera.nombre });
        }
    };
    
    return (
        <div className="container-xl px-4">
            <div className="card">
                <div className='card shadow-lg border-0 rounded-lg'>
                    <div className='card-header justify-content-center'>
                        <h3 className='fw-light'>Seleccionar carrera</h3>
                    </div>
                    <div className='card-body'>
                        <div className="mb-3">
                            <label htmlFor="listaDeCarrera">Lista de carreras</label>
                            <select 
                                className="form-control" 
                                id="listaDeCarrera"
                                onChange={handleChange}
                            >
                                <option value="" disabled selected>Seleccione una carrera</option>
                                {listaCarrera.length > 0 ? (
                                    listaCarrera.map((carrera) => (
                                        <option key={carrera.id} value={carrera.id}>{carrera.nombre}</option>
                                    ))
                                ) : (
                                    <option>No se recibieron datos aún</option>
                                )}
                            </select>
                        </div>
                        <div class="card card-icon">
                            <div class="row no-gutters">
                                <div class="col-auto card-icon-aside bg-primary">
                                    <i data-feather="layers"> <FontAwesomeIcon icon={faQuestionCircle} /> </i>
                                </div>
                                <div class="col">
                                    <div class="card-body py-5">
                                        <h5 class="card-title">Paso 1: Seleccionar una carrera</h5>
                                        <p class="card-text">Utilice el selector: "Lista de carreras", despliéguelo y seleccione la carrera.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}