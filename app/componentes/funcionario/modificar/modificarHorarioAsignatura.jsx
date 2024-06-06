import ListarCarreras from '@/app/componentes/reutilizables/listarCarreras'
import ListarAsignaturas from '@/app/componentes/reutilizables/listarAsignaturas'
import ListarHorarios from '@/app/componentes/reutilizables/listarHorarios'
import ModificarHorarioForm from './modificarHorarioFormulario'

export default function Index ({
  estado,
  handleSubmit,
  carreras,
  seleccionarCarrera,
  estanCargandoCarreras,
  carreraSeleccionada,
  asignaturas,
  seleccionarAsignatura,
  estanCargandoAsignaturas,
  asignaturaSeleccionada,
  horarios,
  horarioSeleccionado,
  seleccionarHorario,
  estanCargandoHorarios
}) {
  return (
    <div className='container-xl px-4'>
      <div className='card'>
        <div className='card shadow-lg border-0 rounded-lg'>
          <form onSubmit={handleSubmit}>
            {!carreraSeleccionada ? (
              <>
                <div className='card-header justify-content-center'>
                  <h3 className='fw-light'>Seleccionar carrera</h3>
                </div>
                <ListarCarreras
                  carreraSeleccionada={carreraSeleccionada}
                  carreras={carreras}
                  estanCargandoCarreras={estanCargandoCarreras}
                  seleccionarCarrera={seleccionarCarrera}
                />
              </>
            ) : !asignaturaSeleccionada ? (
              <>
                <div className='card-header justify-content-center'>
                  <h3 className='fw-light'>Seleccionar asignatura</h3>
                </div>
                <ListarAsignaturas
                  asignaturaSeleccionada={asignaturaSeleccionada}
                  asignaturas={asignaturas}
                  estanCargandoAsignaturas={estanCargandoAsignaturas}
                  seleccionarAsignatura={seleccionarAsignatura}
                />
              </>
            ) : !horarioSeleccionado ? (
              <>
                <div className='card-header justify-content-center'>
                  <h3 className='fw-light'>Seleccionar horario a editar</h3>
                </div>
                <ListarHorarios
                  horarioSeleccionado={horarioSeleccionado}
                  horarios={horarios}
                  estanCargandoHorarios={estanCargandoHorarios}
                  seleccionarHorario={seleccionarHorario}
                />
              </>
            ) : (
              <>
                <div className='card-header justify-content-center'>
                  <h3 className='fw-light'>Modificar horario</h3>
                </div>

                <ModificarHorarioForm
                  estado={estado}
                  handleSubmit={handleSubmit}
                  horario={horarioSeleccionado}
                />
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
