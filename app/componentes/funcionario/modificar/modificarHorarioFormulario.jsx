import React, { useState } from 'react'
import MaskedInput from 'react-text-mask'
import { compararDias, compararHoras, isFormValid } from '@/utils/utils'
import CustomAlert from '../../reutilizables/alert'
import { validators } from '@/utils/validators'

const posiblesDias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES']

export default function EditarHorario ({ horario, handleSubmit, estado }) {
  const [formData, setFormData] = useState({
    id: horario.id,
    horarioInicio: horario.horarioInicio,
    horarioFin: horario.horarioFin,
    diasDictados: horario.diasDictados
  })
  const [errors, setErrors] = useState({
    horarioInicio: '',
    horarioFin: '',
    diasDictados: ''
  })
  const [diasDisponibles, setDiasDisponibles] = useState(
    posiblesDias.filter(dia => !horario.diasDictados.includes(dia))
  )

  const handleFormValidation = () => {
    return isFormValid(errors, formData)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))

    const errorToEvaluate =
      name === 'diasDictados' ? [...formData.diasDictados, value] : value

    handleErrors(name, errorToEvaluate)
  }

  const removerDia = dia => {
    setFormData(prevState => ({
      ...prevState,
      diasDictados: prevState.diasDictados.filter(d => d !== dia)
    }))
    setDiasDisponibles(prevState => [...prevState, dia])

    handleErrors('diasDictados', [
      ...formData.diasDictados.filter(day => day !== dia)
    ])
  }

  const seleccionarDia = e => {
    const { value } = e.target
    setFormData(prevState => ({
      ...prevState,
      diasDictados: [...prevState.diasDictados, value]
    }))
    setDiasDisponibles(prevState => prevState.filter(item => item !== value))

    handleErrors('diasDictados', [...formData.diasDictados, value])
  }

  const handleErrors = (name, value) => {
    let error = ''
    if (['horarioInicio', 'horarioFin'].includes(name)) {
      error = validators.validateRequired(value)
      if (!error) {
        error = validators.validateTime(value)
      }
    } else if (name === 'diasDictados') {
      error = validators.validateClassDays(value)
    } else {
      error = validators.validateRequired(value)
    }

    setErrors(prevState => ({
      ...prevState,
      [name]: error
    }))
  }

  const handleFormSubmit = e => {
    e.preventDefault()

    // Chequeo que la hora de final sea mayor a la de inicio
    if (!compararHoras(formData.horarioFin, formData.horarioInicio)) {
      setErrors(prevState => ({
        ...prevState,
        horarioFin: 'El horario de fin debe ser mayor que el de inicio'
      }))
      return
    }

    if (!handleFormValidation()) return

    handleSubmit(formData)
  }

  return (
    <>
      {estado.message === '' ? (
        <>
          <div className='card-body'>
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
                type='text'
                id='horarioInicio'
                name='horarioInicio'
                value={formData.horarioInicio}
                onChange={handleInputChange}
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
                type='text'
                mask={[/^([0-2])/, /([0-9])/, ':', /[0-5]/, /[0-9]/]}
                id='horarioFin'
                name='horarioFin'
                value={formData.horarioFin}
                onChange={handleInputChange}
                className='form-control'
                required
              />
              {errors.horarioFin && errors.horarioFin !== '' && (
                <span className='text-danger text-xs'>{errors.horarioFin}</span>
              )}
            </div>
          </div>
          <div
            className='card-footer text-center'
            style={{ position: 'relative' }}
          >
            <button
              disabled={!handleFormValidation()}
              onClick={handleFormSubmit}
              className='btn btn-primary'
            >
              Modificar horario
            </button>
          </div>
        </>
      ) : (
        <>
          <div className='card-body'>
            {' '}
            <CustomAlert closable={false} estado={estado} />
          </div>
          <div className='card-footer'>
            <div className='small text-center'>
              <a
                style={{ cursor: 'pointer' }}
                className='link-primary'
                href='/privado/Funcionario/Modificar/HorarioAsignatura'
              >
                Reintentar
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}
