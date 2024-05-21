'use Client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import storage from "@/utils/storage";

export default function ListarUsuarios({ estado, ListUsuarios }) {
  console.info(ListUsuarios);
  const [usuarios, setUsuarios] = useState(ListUsuarios.items || []);
  const [pageIndex, setPageIndex] = useState(ListUsuarios.pageIndex || 1);
  const [totalPages, setTotalPages] = useState(ListUsuarios.totalPages || 1);
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar los errores
  const pageSize = 10; // Tamaño de página fijo, pero podría ser dinámico

  useEffect(() => {
    if (pageIndex !== ListUsuarios.pageIndex){

      const fetchData = async () => {
        setIsLoading(true);
        const token = storage.getToken();
        if (!token) {
          // Manejar el caso en que no haya token
          router.push("/");
        }

        try {
          console.info("fetch axios");
          const { data } = await axios.get(`/Administrador/listarUsuario?page=${pageIndex}&pageSize=${pageSize}`);

          setUsuarios(data.items);
          setPageIndex(data.pageIndex);
          setTotalPages(data.totalPages);
          setIsLoading(false); // Desactivar el estado de carga
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
          if (error.response && error.response.status === 401) {
            alert(error.response.data.message);
          }
          setError(error); // Establecer el error
          setIsLoading(false); // Desactivar el estado de carga
        }
      };

      fetchData();
    }
  }, [pageIndex]);

  const handleNextPage = () => {
    if (pageIndex < totalPages) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageIndex > 1) {
      setPageIndex(pageIndex - 1);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container-xl px-4 mt-n10">
      <div className="card">
        <div className="card shadow-lg border-0 rounded-lg">
          {estado.message === '' ? (
            <>
              <div className="card-header justify-content-center">
                <h3 className="fw-light">Listado de Usuario</h3>
              </div>
              <div className="card-body">
                <div className="row gx-3">
                  <div className="col-md-6">
                    <div className="mb-3">
                      {usuarios.length > 0 ? (
                        <div className="card-body">
                          <h5>Listado de Usuarios</h5>
                          <ul>
                            {usuarios.map((usuario) => (
                              <li key={usuario.id}>{usuario.nombre} {usuario.apellido} - {usuario.email} - {usuario.rol}</li>
                            ))}
                          </ul>
                          <div className="pagination">
                            <button onClick={handlePrevPage} disabled={pageIndex === 1}>
                              Anterior
                            </button>
                            <span> Página {pageIndex} de {totalPages} </span>
                            <button onClick={handleNextPage} disabled={pageIndex === totalPages}>
                              Siguiente
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>No hay usuarios para mostrar.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-center">
              </div>
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
        </div>
      </div>
    </div>
  );
}
