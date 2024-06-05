import React, { useState } from 'react';
import ListarCarreras from '@/app/componentes/reutilizables/listarCarreras'

export default function AsignaturasAprobadas({
  resetearForm,
  carreraSeleccionada,
  estanCargandoCarreras,
  estado,
  carreras,
  seleccionarCarrera,
  obtenerAsignaturasAprobadas,
  fechaInicio,
  setFechaInicio,
  fechaFin,
  setFechaFin
}) {
  const [asignaturasAprobadas, setAsignaturasAprobadas] = useState([]);

  const handleVerAsignaturas = async () => {
    if (!carreraSeleccionada) {
      alert('Debes seleccionar una carrera antes de ver las asignaturas aprobadas.');
      return;
    }
    
    const asignaturas = await obtenerAsignaturasAprobadas();
    
    const asignaturasFiltradas = asignaturas.filter(asignaturas => {
      const fechaAprobacion = new Date(asignaturas.fechaAprobacion);
      const fechaInicioFiltro = fechaInicio ? new Date(fechaInicio) : null ;
      const fechaFinFiltro = fechaFin ? new Date(fechaFin) : null ;
      
      console.log("Fecha Aprobacion:", fechaAprobacion);
      console.log("Fecha Inicio Filtro:", fechaInicioFiltro);
      console.log("Fecha Fin Filtro:", fechaFinFiltro);
      
      return (!fechaInicio || fechaAprobacion >= fechaInicioFiltro) 
      && (!fechaFin || fechaAprobacion <= fechaFinFiltro);
      
    });
    
    setAsignaturasAprobadas(asignaturasFiltradas);
    console.log("Asignaturas Filtradas: ",asignaturasFiltradas);
  };

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
                    <div className="container">
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label htmlFor="fechaInicio">Fecha Inicio</label>
                          <input
                            type="date"
                            id="fechaInicio"
                            className="form-control"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="fechaFin">Fecha Fin</label>
                          <input
                            type="date"
                            id="fechaFin"
                            className="form-control"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='card-footer text-center'>
                      <button
                        disabled={!fechaInicio || !fechaFin}
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
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Nombre</th>
                              <th>Calificación</th>
                              <th>Fecha Aprobación</th>
                            </tr>
                          </thead>
                          <tbody>
                            {asignaturasAprobadas.map((asignatura, index) => (
                              <tr key={index}>
                                <td>{asignatura.nombre}</td>
                                <td>{asignatura.calificacion}</td>
                                <td>{formatearFecha(asignatura.fechaAprobacion)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
