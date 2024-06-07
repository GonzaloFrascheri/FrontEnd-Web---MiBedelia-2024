import MaskedInput from 'react-text-mask'
import CustomAlert from '@/app/componentes/reutilizables/alert'
import { useEffect, useMemo, useState } from 'react'
import { validators } from '@/utils/validators'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { createLocalDateFromString, parseDateToISO } from '@/utils/utils'
import { isFormValid } from '@/utils/utils'

export default function ModificarHorarioExamenForm ({
  estado,
  examen,
  periodoActivo,
  handleFormSubmit
}) {
  const minDate = useMemo(
    () => parseDateToISO(periodoActivo.diaInicio),
    [periodoActivo]
  )
  const maxDate = useMemo(
    () => parseDateToISO(periodoActivo.diaFin),
    [periodoActivo]
  )
  const [formData, setFormData] = useState({
    horario: examen.horario,
    fecha: parseDateToISO(examen.fechaExamen) || minDate
  })
  const [errors, setErrors] = useState({
    horario: '',
    fecha: ''
  })

  const handleFormValidation = () => {
    return isFormValid(errors, formData)
  }

  const handleDateChange = date => {
    handleChange({
      target: {
        name: 'fecha',
        value: date
      }
    })
  }

  const handleChange = e => {
    const { name, value } = e.target
    const valueToChange = name === 'fecha' ? parseDateToISO(value) : value
    setFormData(prevState => ({
      ...prevState,
      [name]: valueToChange
    }))

    handleErrors(name, valueToChange)
  }
  const handleErrors = (name, value) => {
    let error = ''
    if (name === 'horario') {
      error = validators.validateRequired(value)
      if (!error) {
        error = validators.validateTime(value)
      }
    } else {
      error = validators.validateRequired(value)
    }

    setErrors(prevState => ({
      ...prevState,
      [name]: error
    }))
  }

  const handleSubmitForm = e => {
    e.preventDefault()
    handleFormSubmit(formData)
  }

  return (
    <>
      {estado.message === '' ? (
        <>
          <div className='card-body'>
            <div className='mb-3'>
              <label htmlFor='horario' className='form-label'>
                Horario:
              </label>
              <MaskedInput
                mask={[/^([0-2])/, /([0-9])/, ':', /[0-5]/, /[0-9]/]}
                type='text'
                id='horario'
                name='horario'
                value={formData.horario}
                onChange={handleChange}
                className='form-control'
                required
              />
              {errors.horario && errors.horario !== '' && (
                <span className='text-danger text-xs'>{errors.horario}</span>
              )}
            </div>
            <div className='col-md-6'>
              <div className='mb-3'>
                <label
                  htmlFor='fecha'
                  className='form-label col-md-12 mb-0'
                >
                  Fecha exámen:
                  <span className='badge bg-primary text-white ms-5'>
                    Inicio: {minDate} - Fin {maxDate}
                  </span>
                </label>
                <DatePicker
                  id='fecha'
                  name='fecha'
                  value={createLocalDateFromString(
                    parseDateToISO(formData.fecha) || minDate
                  )}
                  selected={createLocalDateFromString(
                    parseDateToISO(formData.fecha) || minDate
                  )}
                  onKeyDown={e => {
                    e.preventDefault() // Prevent user to write in the date manually
                  }}
                  onChange={handleDateChange}
                  dateFormat='yyyy-MM-dd'
                  minDate={createLocalDateFromString(minDate)}
                  maxDate={createLocalDateFromString(maxDate)}
                  className='form-control w-100'
                  required
                />

                {errors.fechaExamen && errors.fechaExamen !== '' && (
                  <span className='text-danger text-xs'>
                    {errors.fechaExamen}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div
            className='card-footer text-center'
            style={{ position: 'relative' }}
          >
            <button
              disabled={!handleFormValidation()}
              onClick={handleSubmitForm}
              className='btn btn-primary'
            >
              Modificar horario
            </button>
          </div>
        </>
      ) : (
        <>
          <div className='card-body'>
            <CustomAlert closable={false} estado={estado} />
          </div>
          <div className='card-footer'>
            <div className='small text-center'>
              <a
                style={{ cursor: 'pointer' }}
                className='link-primary'
                href='/privado/Funcionario/Modificar/HorarioExamen'
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
