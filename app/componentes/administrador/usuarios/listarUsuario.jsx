import React from 'react';

export default function ListarUsuarios({ estado, handleSubmit, usuarios }) {
  return (
    <div className="container-xl px-4 mt-n10">
      <div className="card">
        <div className="card shadow-lg border-0 rounded-lg">
          {estado.message === '' ? (
            <>
              <form onSubmit={handleSubmit}>
                <div className="card-header justify-content-center">
                  <h3 className="fw-light">Listado de Usuario</h3>
                </div>
                <div className="card-body">
                  <div className="row gx-3">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="small mb-1">Para descargar el listado de usuarios presione el botón</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-center">
                  <button className="btn btn-primary" type="submit">
                    Listar Usuarios
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div>
              <div className={`alert alert-icon ${estado.estado === 200 ? "alert-primary" : "alert-secondary"}`} role="alert">
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
          {usuarios.length > 0 && (
            <div className="card-body">
              <h5>Listado de Usuarios</h5>
              <ul>
                {usuarios.map((usuario) => (
                  <li key={usuario.id}>{usuario.nombre}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
