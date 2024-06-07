import MaskedInput from 'react-text-mask'
import CustomAlert from '@/app/componentes/reutilizables/alert'
import { useState } from 'react'
import validators from '@/utils/validators'

export default function ModificarHorarioExamenForm ({ estado, horario, fecha }) {
  const [formData, setformData] = useState({
    horarioInicio: horario.horarioInicio,
    horarioFin: horario.horarioFin
  })
  const [errors, setErrors] = useState({
    horarioInicio: '',
    horarioFin: ''
  })

  const handleErrors = (name, value) => {
    let error = ''
    if (['horarioInicio', 'horarioFin'].includes(name)) {
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

  return (
    <>
      {estado.message === '' ? (
        <>
          <div className='card-body'>
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
