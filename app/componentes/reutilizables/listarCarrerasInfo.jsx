import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

export default function ListarCarrerasInfo ({ listaCarrera, onCarreraChange, listasInfo }) {
    
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
                        <h3 className='fw-light'>{listasInfo.cu} | Seleccionar carreras</h3>
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
                        <div className="card card-icon">
                            <div className="row no-gutters">
                                <div className="col-auto card-icon-aside bg-primary text-white">
                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                </div>
                                <div className="col">
                                    <div className="card-body py-5">
                                        <h5 className="card-title">{listasInfo.tituloInfo}</h5>
                                        <p className="card-text">{listasInfo.mensajeInfo}</p>
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