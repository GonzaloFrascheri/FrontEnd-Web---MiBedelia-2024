import React, { useState } from 'react';
import ListarCarreras from '@/app/componentes/reutilizables/listarCarreras'
import axios from '@/utils/axios'

export default function AsignaturasAprobadas({
  resetearForm,
  carreraSeleccionada,
  estanCargandoCarreras,
  estado,
  setEstado,
  carreras,
  seleccionarCarrera,
  fechaInicio,
  setFechaInicio,
  fechaFin,
  setFechaFin,
  userData
}) {
  const [asignaturasAprobadas, setAsignaturasAprobadas] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const handleVerAsignaturas = async () => {
    if (!carreraSeleccionada) {
      alert('Debes seleccionar una carrera antes de ver las asignaturas aprobadas.');
      return;
    }
    const obtenerAsignaturasAprobadas = async () => {
      try {
        console.log(`/Estudiante/getAsignaturasAprobadas?idEstudiante=${userData.id}&idCarrera=${carreraSeleccionada}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
        const response = await axios.get(
          `/Estudiante/getAsignaturasAprobadas?idEstudiante=${userData.id}&idCarrera=${carreraSeleccionada}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        )
        const { data } = response
        return data
      } catch (error) {
        console.info('error', error)
        const { status, data } = error.response
        setEstado({
          estado: status,
          message: data.message
        })
        return []
      }
    }
    
    const asignaturas = await obtenerAsignaturasAprobadas();

    console.info('asignaturas', asignaturas)
    console.info('fechaInicio', fechaInicio)
    console.info('fechaFin', fechaFin)


    const asignaturasFiltradas = asignaturas.filter(asignaturas => {
      const fechaAprobacion = new Date(asignaturas.fechaAprobacion);
      const fechaInicioFiltro = fechaInicio ? new Date(fechaInicio) : null ;
      const fechaFinFiltro = fechaFin ? new Date(fechaFin) : null ;
      
      if(fechaInicioFiltro > fechaFinFiltro){
        alert('La fecha de inicio no puede ser mayor que la fecha de fin del rango');
      }

      return (!fechaInicio || fechaAprobacion >= fechaInicioFiltro) 
      && (!fechaFin || fechaAprobacion <= fechaFinFiltro);
      
    });
    
    if(asignaturas.length === 0){
      setMensaje('No existen asignaturas aprobadas en el rango de tiempo solicitado.')
      return;
    }

    setAsignaturasAprobadas(asignaturas);
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
          <div className='card-header d-flex align-items-center justify-content-between'>
            <h3 className='fw-light'>Listado de asignaturas aprobadas</h3>
            <div className="small">
                <a href="/privado/Estudiantes/Asignatura/Aprobada">Volver</a>
            </div>
          </div>
          {estado.message === '' ? (
            <>
              <div>
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
                        id='btnListadoAsignaturasAprobadas'
                        disabled={!fechaInicio || !fechaFin}
                        onClick={handleVerAsignaturas}
                        type='button'
                        className='btn btn-primary'
                      >
                        Listado de asignaturas aprobadas
                      </button>
                      {mensaje && <p style={{ textAlign: 'left' }}>{mensaje}</p>}
                    </div>
                    {asignaturasAprobadas.length > 0 && (
                      <div className='card-body'>
                        <h5>Asignaturas Aprobadas:</h5>
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Nombre</th>
                              <th>Fecha Aprobación</th>
                            </tr>
                          </thead>
                          <tbody>
                            {asignaturasAprobadas.map((asignatura, index) => (
                              <tr key={index}>
                                <td>{asignatura.nombre}</td>
                                <td>{formatearFecha(asignatura.fechaAprobacion)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    <br></br>
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
