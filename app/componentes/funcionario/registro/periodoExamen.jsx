export default function Index({estado, formData, handleChange, handleSubmit, error}) {

    return (
        <div className="container-xl px-4 mt-n10">
            <div className="card">
                <div className="card shadow-lg border-0 rounded-lg">
                    <div className="card-header justify-content-center">
                        <h3 className="fw-light">Registro período de exámen</h3>
                    </div>
                    {estado.message === '' ? (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="diaInicio" className="form-label">Fecha inicio:</label>
                                <input
                                    type="date"
                                    id="diaInicio"
                                    name="diaInicio"
                                    value={formData.diaInicio}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="diaFin" className="form-label">Fecha fin:</label>
                                <input
                                    type="date"
                                    id="diaFin"
                                    name="diaFin"
                                    value={formData.diaFin}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}
                            </div>
                            <div className="card-footer text-center">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary">Crear período</button>
                            </div>
                        </form>
                        </>
                    ) : (
                        <div>
                            <div className={`alert alert-icon m-2 ${estado.estado === 200 ? "alert-primary" : "alert-secondary"}`} role="alert">
                                <div className="alert-icon-aside">
                                    <i className="far fa-flag"></i>
                                </div>
                                <div className="alert-icon-content">
                                    <h6 className="alert-heading">Resultado</h6>
                                    {estado.message}
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <div className="small"><a href="/privado">Volver al inicio</a></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

}