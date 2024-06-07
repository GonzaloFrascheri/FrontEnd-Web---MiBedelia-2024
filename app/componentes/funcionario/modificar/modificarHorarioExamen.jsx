import ListarCarreras from '@/app/componentes/reutilizables/listarCarreras'
import ListarHorarioExamen from '@/app/componentes/reutilizables/listarHorariosExamen'
import ModificarExamenForm from './modificarHorarioExamenFormulario'

export default function Index ({
  estado,
  handleSubmit,
  carreras,
  seleccionarCarrera,
  estanCargandoCarreras,
  carreraSeleccionada,
  examenes,
  seleccionarExamen,
  estanCargandoExamenes,
  examenSeleccionado,
  periodoActivo
}) {
  return (
    <div className='container-xl px-4'>
      <div className='card'>
        <div className='card shadow-lg border-0 rounded-lg'>
          <div>
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
            ) : !examenSeleccionado ? (
              <>
                <div className='card-header justify-content-center'>
                  <h3 className='fw-light'>
                    Seleccionar horario de examen a editar
                  </h3>
                </div>
                <ListarHorarioExamen
                  examenes={examenes}
                  seleccionarExamen={seleccionarExamen}
                  estanCargandoExamenes={estanCargandoExamenes}
                  examenSeleccionado={examenSeleccionado}
                />
              </>
            ) : (
              <>
                <div className='card-header justify-content-center'>
                  <h3 className='fw-light'>Modificar horario de examen</h3>
                </div>

                <ModificarExamenForm
                  estado={estado}
                  handleSubmit={handleSubmit}
                  periodoActivo={periodoActivo}
                  examen={examenSeleccionado}
                  handleFormSubmit={handleSubmit}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
