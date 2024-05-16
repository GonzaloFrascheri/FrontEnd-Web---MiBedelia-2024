// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {  } from '@fortawesome/free-solid-svg-icons';

export default function Index({estado, formData, handleChange, handleSubmit}) {

    return (
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
              <div className="container-xl px-4">
                <div className="row justify-content-center">
                  <div className="col-lg-7">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                      {estado.message === '' ? (
                      <>
                        <div className="card-header justify-content-center">
                          <h3 className="fw-light my-4">Alta de Carrera</h3>
                        </div>
                        <div className="card-body">
                          <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                              <label htmlFor="nombre" className="form-label">Nombre:</label>
                              <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="form-control"
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="duracion" className="form-label">Duración:</label>
                              <input
                                type="text"
                                id="duracion"
                                name="duracion"
                                value={formData.duracion}
                                onChange={handleChange}
                                className="form-control"
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="nivel" className="form-label">Nivel:</label>
                              <input
                                type="text"
                                id="nivel"
                                name="nivel"
                                value={formData.nivel}
                                onChange={handleChange}
                                className="form-control"
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="descripcion" className="form-label">Descripción:</label>
                              <textarea
                                id="descripcion"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                className="form-control"
                                required
                              ></textarea>
                            </div>
                          </form>
                        </div>
                        <div className="card-footer text-center">
                          <button type="submit" className="btn btn-primary">Guardar</button>
                        </div>
                        </>
                      ) : (
                        <div>
                          <div className={'alert alert-icon ${estado.estado === 200 ? "alert-primary" : "alert-secondary"}'} role="alert">
                            <button className="btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
                            <div className="alert-icon-aside">
                                <i className="far fa-flag"></i>
                            </div>
                            <div className="alert-icon-content">
                                <h6 className="alert-heading">Resultado</h6>
                                {estado.message}!
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
              </div>
            </main>
          </div>
      </div>
    );
}