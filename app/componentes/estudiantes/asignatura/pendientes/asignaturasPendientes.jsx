import React, { useState } from 'react';
import ListarCarreras from '@/app/componentes/reutilizables/listarCarreras'

export default function AsignaturasPendientes({
  resetearForm,
  carreraSeleccionada,
  estanCargandoCarreras,
  estado,
  carreras,
  seleccionarCarrera,
  obtenerAsignaturasPendientes
}) {
  const [asignaturasPendientes, setAsignaturasPendientes] = useState([]);

  const handleVerAsignaturas = async () => {
    if (!carreraSeleccionada) {
      alert('Debes seleccionar una carrera antes de ver las asignaturas pendientes.');
      return;
    }

    // Llamar a la función para obtener las asignaturas pendientes
    const asignaturas = await obtenerAsignaturasPendientes();
    setAsignaturasPendientes(asignaturas);
  };

  return (
    <div className='container-xl px-4 mt-n10'>
      <div className='card'>
        <div className='card shadow-lg border-0 rounded-lg'>
            <div className='card-header d-flex align-items-center justify-content-between'>
              <h3 className='fw-light'>Listado de asignaturas pendientes</h3>
              <div className="small">
                  <a href="/privado/Estudiantes/Asignatura/Pendiente">Volver</a>
              </div>
            </div>
          {estado.message === '' ? (
            <>
              <div>
                {/* ListarCarreras y otros componentes necesarios */}
                {!carreraSeleccionada ? (
                  <>
                    <ListarCarreras
                      carreraSeleccionada={carreraSeleccionada}
                      carreras={carreras}
                      estanCargandoCarreras={estanCargandoCarreras}
                      seleccionarCarrera={seleccionarCarrera}
                    />
                    <div className='card-footer text-center'></div>
                  </>
                ) : (
                  <>
                    <div className='card-footer text-center'>
                      <button
                        disabled={!carreraSeleccionada}
                        onClick={handleVerAsignaturas}
                        type='button'
                        className='btn btn-primary'
                      >
                        Ver asignaturas pendientes
                      </button>
                    </div>
                    {asignaturasPendientes.length > 0 && (
                      <div className='card-body'>
                        <h5>Asignaturas Pendientes:</h5>
                        <ul>
                          {asignaturasPendientes.map((asignatura, index) => (
                            <li key={index}>{asignatura.nombre}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <br></br>
                  </>
                )}
              </div>
            </>
          ) : (
            {/*<div>
              <div className='card-footer text-center'>
                <div className='small'>
                  <a
                    style={{ cursor: 'pointer' }}
                    className='link-primary'
                    onClick={resetearForm}
                  >
                    Reintentar
                  </a>
                </div>
              </div>
          </div>*/}
          )}
        </div>
      </div>
    </div>
  );
}
