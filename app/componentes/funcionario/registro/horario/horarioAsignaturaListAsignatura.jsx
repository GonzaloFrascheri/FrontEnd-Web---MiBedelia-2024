import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'
import MaskedInput from 'react-text-mask'
import 'react-datepicker/dist/react-datepicker.css'
import { compararDias } from '@/utils/utils'

const posiblesDias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES']

export default function Index ({
  listaAsignaturas,
  listaDocentes,
  handleAsignaturaChange,
  handleChange,
  handleSubmit,
  formData,
  estado,
  errors,
  isFormValid,
  handleRemoveDay
}) {
  const [selectedDocente, setSelectedDocente] = useState({
    id: null,
    ci: '',
    nombre: 'Debe seleccionar un docente',
    apellido: ''
  })
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState(listaDocentes)
  const [diasDisponibles, setDiasDisponibles] = useState(posiblesDias)
  const columnas = [
    {
      name: 'id',
      selector: row => row.id,
      sortable: true,
      width: '80px'
    },
    {
      name: 'ci',
      selector: row => row.ci,
      sortable: true
    },
    {
      name: 'nombre',
      selector: row => row.nombre,
      sortable: true
    },
    {
      name: 'apellido',
      selector: row => row.apellido,
      sortable: true
    }
  ]

  function Loader () {
    return (
      <div className='text-center'>
        <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    )
  }

  useEffect(() => {
    const result = listaDocentes.filter(item => {
      return item.apellido
        ? item.apellido.toLowerCase().includes(search.toLowerCase())
        : false
    })
    setFilter(result)
  }, [search, listaDocentes])

  const handleSelectDocente = docente => {
    setSelectedDocente(docente)
    const docenteData = {
      target: {
        name: 'ciDocente',
        value: docente.ci
      }
    }
    handleChange(docenteData)
    // Cerrar el modal
    document.querySelector('#docenteModal .btn-close').click()
  }

  const removerDia = dia => {
    handleRemoveDay(dia)
    setDiasDisponibles(prevState => [...prevState, dia])
  }

  const seleccionarDia = e => {
    handleChange(e)
    setDiasDisponibles(prevState =>
      prevState.filter(item => item !== e.target.value)
    )
  }

  const tableHeaderstyle = {
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '14px',
        backgroundColor: '#ccc'
      }
    }
  }

  return (
    <div className='container-xl px-4'>
      <div className='card'>
        <div className='card shadow-lg border-0 rounded-lg'>
          <div className='card-header d-flex align-items-center justify-content-between'>
            <h3 className='fw-light'>Registro horario de una asignatura</h3>
            <div className="small">
                <a href="/privado/Funcionario/Registro/HorarioAsignatura">Volver</a>
            </div>
          </div>
          {estado.message === '' ? (
            <form onSubmit={handleSubmit}>
              <div className='card-body'>
                <div className='row'>
                  <div>
                    <div className='mb-3'>
                      <label htmlFor='listaAsignatura'>
                        Lista de asignaturas
                      </label>
                      <select
                        className='form-control'
                        id='listaAsignatura'
                        onChange={handleAsignaturaChange}
                      >
                        <option value='' disabled selected>
                          Seleccione una asignatura
                        </option>
                        {listaAsignaturas.length > 0 ? (
                          listaAsignaturas.map(asignatura => (
                            <option key={asignatura.id} value={asignatura.id}>
                              {asignatura.nombre}
                            </option>
                          ))
                        ) : (
                          <option>No se recibieron datos aún</option>
                        )}
                      </select>
                      {errors.idAsignatura && errors.idAsignatura !== '' && (
                        <span className='text-danger text-xs'>
                          {errors.idAsignatura}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='diasDictados' className='form-label'>
                    Días dictados:
                  </label>
                  <select
                    id='diasDictados'
                    name='diasDictados'
                    value={''}
                    onChange={seleccionarDia}
                    className='form-control'
                  >
                    <option value='' disabled>
                      Seleccione un día
                    </option>
                    {diasDisponibles.sort(compararDias).map(dia => (
                      <option key={dia} value={dia}>
                        {dia}
                      </option>
                    ))}
                  </select>
                  {errors.diasDictados && errors.diasDictados !== '' && (
                    <span className='text-danger text-xs'>
                      {errors.diasDictados}
                    </span>
                  )}
                </div>
                <div className='mb-3'>
                  {formData.diasDictados.map(dia => (
                    <span
                      key={dia}
                      className='badge bg-primary me-2 mb-2'
                      style={{ cursor: 'pointer' }}
                      onClick={() => removerDia(dia)}
                    >
                      {dia}
                    </span>
                  ))}
                </div>
                <div className='mb-3'>
                  <label htmlFor='horarioInicio' className='form-label'>
                    Hora inicio:
                  </label>
                  <MaskedInput
                    mask={[/^([0-2])/, /([0-9])/, ':', /[0-5]/, /[0-9]/]}
                    type='string'
                    id='horarioInicio'
                    name='horarioInicio'
                    value={formData.horarioInicio}
                    onChange={handleChange}
                    className='form-control'
                    required
                  />
                  {errors.horarioInicio && errors.horarioInicio !== '' && (
                    <span className='text-danger text-xs'>
                      {errors.horarioInicio}
                    </span>
                  )}
                </div>
                <div className='mb-3'>
                  <label htmlFor='horarioFin' className='form-label'>
                    Hora fin:
                  </label>

                  <MaskedInput
                    type='string'
                    mask={[/^([0-2])/, /([0-9])/, ':', /[0-5]/, /[0-9]/]}
                    id='horarioFin'
                    name='horarioFin'
                    value={formData.horarioFin}
                    onChange={handleChange}
                    className='form-control'
                    required
                  />

                  {errors.horarioFin && errors.horarioFin !== '' && (
                    <span className='text-danger text-xs'>
                      {errors.horarioFin}
                    </span>
                  )}
                </div>
                <div className='mb-3'>
                  <label htmlFor='codigo' className='form-label'>
                    Docente:
                  </label>
                  <div className='input-group input-group-joined'>
                    <input
                      type='text'
                      id='ciDocente'
                      name='idDocenteDatos'
                      value={
                        '[ ' +
                        selectedDocente.id +
                        ' ] ' +
                        selectedDocente.nombre +
                        ' ' +
                        selectedDocente.apellido +
                        ' ( ' +
                        selectedDocente.ci +
                        ' )'
                      }
                      onChange={handleChange}
                      className='form-control'
                      disabled
                      required
                    />
                    <span
                      data-bs-toggle='modal'
                      data-bs-target='#docenteModal'
                      className='input-group-text'
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </span>
                  </div>
                  {errors.ciDocente && errors.ciDocente !== '' && (
                    <span className='text-danger text-xs'>
                      {errors.ciDocente}
                    </span>
                  )}
                </div>
              </div>
              <div
                className='card-footer text-center'
                style={{ position: 'relative' }}
              >
                <button
                  disabled={!isFormValid()}
                  type='submit'
                  className='btn btn-primary'
                >
                  Crear horario
                </button>
              </div>
            </form>
          ) : (
            <div className='card-body'>
              <div
                className={`alert alert-icon m-2 alert-primary`}
                role='alert'
              >
                <div className='alert-icon-aside'>
                  <i className='far fa-flag'></i>
                </div>
                <div className='alert-icon-content'>
                  <h6 className='alert-heading'>Resultado</h6>
                  {estado.message}
                </div>
              </div>
            </div>
          )}

          <div
            className='modal fade'
            id='docenteModal'
            role='dialog'
            aria-labelledby='docenteModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='docenteModalLabel'>
                    Seleccione un Docente para la asignatura
                  </h5>
                  <button
                    className='btn-close'
                    type='button'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
                  <div className='popup'>
                    <DataTable
                      customStyles={tableHeaderstyle}
                      columns={columnas}
                      data={filter}
                      pagination
                      fixedHeader
                      highlightOnHover
                      subHeader
                      subHeaderComponent={
                        <input
                          type='text'
                          className='w-25 form-control'
                          placeholder='Buscar por apellido...'
                          value={search}
                          onChange={e => setSearch(e.target.value)}
                        />
                      }
                      subHeaderAlign='right'
                      progressComponent={<Loader />}
                      onRowClicked={handleSelectDocente}
                    />
                  </div>
                  <div className='modal-footer'>
                    <button
                      className='btn btn-secondary'
                      type='button'
                      data-bs-dismiss='modal'
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
