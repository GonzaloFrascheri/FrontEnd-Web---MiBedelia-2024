import React, { useState } from 'react';
import ListarCarreras from '@/app/componentes/reutilizables/listarCarreras'

export default function AsignaturasAprobadas({
  resetearForm,
  carreraSeleccionada,
  estanCargandoCarreras,
  estado,
  carreras,
  seleccionarCarrera,
  obtenerAsignaturasAprobadas
}) {
  const [asignaturasAprobadas, setAsignaturasAprobadas] = useState([]);

  const handleVerAsignaturas = async () => {
    if (!carreraSeleccionada) {
      alert('Debes seleccionar una carrera antes de ver las asignaturas aprobadas.');
      return;
    }

    // Llamar a la función para obtener las asignaturas pendientes
    const asignaturas = await obtenerAsignaturasAprobadas();
    setAsignaturasAprobadas(asignaturas);
  };

  return (
    <div className='container-xl px-4 mt-n10'>
      <div className='card'>
        <div className='card shadow-lg border-0 rounded-lg'>
          {estado.message === '' ? (
            <>
              <div>
                <div className='card-header justify-content-center'>
                  <h3 className='fw-light'>Listado de asignaturas aprobadas</h3>
                </div>
                {!carreraSeleccionada ? (
                  <>
                    <div className='card-header justify-content-center'>
                      <h4 className='fw-light'>Seleccionar carrera</h4>
                    </div>{' '}
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
                        Listado de asignaturas aprobadas
                      </button>
                    </div>
                    {asignaturasAprobadas.length > 0 && (
                      <div className='card-body'>
                        <h5>Asignaturas Aprobadas:</h5>
                        <ul>
                          {asignaturasAprobadas.map((asignatura, index) => (
                            <li key={index}>{asignatura.nombre}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <br></br>
                    <a 
                        href="/privado/Estudiantes/Asignatura/Aprobada" 
                        className="btn btn-link" 
                        style={{ position: 'absolute', left: '10px', bottom: '10px' }}>
                            Volver
                    </a>
                  </>
                )}
              </div>
            </>
          ) : (
            <div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
