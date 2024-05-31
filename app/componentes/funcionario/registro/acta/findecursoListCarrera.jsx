export default function FinDeCursoListCarrera ({ listaCarrera, onCarreraChange }) {
    
    const handleChange = (event) => {
        const selectedId = event.target.value;
        onCarreraChange(selectedId);
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
                    </div>
                </div>
            </div>
        </div>
    )
}