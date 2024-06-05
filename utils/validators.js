// Input regex validators
export const validators = {
  validateCi: ci => {
    return /^\d{0,8}$/.test(ci) && ci.length >= 8
      ? ''
      : 'La cédula debe tener al menos 8 dígitos.'
  },

  validatePassword: password => {
    return password.length >= 4
      ? ''
      : 'La contraseña debe tener al menos 4 caracteres.'
  },

  validateRequired: value => {
    return value.trim().length > 0 ? '' : 'Este campo es requerido.'
  },

  validateEmail: email => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      ? ''
      : 'El correo electrónico no es válido.'
  },

  validateTime: time => {
    return /^(?:[01][0-9]|2[0-3]):[0-5][0-9]$/.test(time)
      ? ''
      : 'El formato de hora es incorrecto.'
  },

  validateEqualPasswords: (value, secondValue) => {
    return value === secondValue ? '' : 'Las contraseñas no coinciden.'
  },

  validateClassDays: days => {
    return days.length > 0 ? '' : 'Es necesario ingresar al menos un día.'
  }
}

export function handleProfileFormValidation ({ name, value, secondValue = '' }) {
  let error = ''

  // Required
  error = validators.validateRequired(value)
  if (error) return error

  if (name === 'email') {
    // Validar el formato del email
    error = validators.validateEmail(value)
  } else if (name === 'password' || name === 'confirmPassword') {
    // Validar la contraseña
    error = validators.validatePassword(value)
    if (!error) {
      // Validar si las contraseñas coinciden
      error = validators.validateEqualPasswords(value, secondValue)
    }
  }

  return error
}

export function updatePasswordErrors (
  errors,
  name,
  value,
  password,
  confirmPassword
) {
  const otherField = name === 'password' ? 'confirmPassword' : 'password'
  const otherFieldValue = name === 'password' ? confirmPassword : password

  const otherFieldError = handleProfileFormValidation({
    name: otherField,
    value: otherFieldValue,
    secondValue: value
  })

  // Actualizar el error del otro campo
  errors[otherField] = otherFieldError

  const passwordsMatch = validators.validateEqualPasswords(
    password,
    confirmPassword
  )

  if (!passwordsMatch) {
    errors.password = 'Las contraseñas no coinciden'
    errors.confirmPassword = 'Las contraseñas no coinciden'
  } else {
    if (errors.password === 'Las contraseñas no coinciden') {
      errors.password = handleProfileFormValidation({
        name: 'password',
        value: password
      })
    }
    if (errors.confirmPassword === 'Las contraseñas no coinciden') {
      errors.confirmPassword = handleProfileFormValidation({
        name: 'confirmPassword',
        value: confirmPassword
      })
    }
  }

  return errors
}

export function handleRegisterFormValidation (name, value) {
  let error = ''

  // Required
  error = validators.validateRequired(value)
  if (error) return error

  if (name === 'ci') {
    error = validators.validateCi(value)
  } else if (name === 'password') {
    error = validators.validatePassword(value)
  } else if (name === 'email') {
    error = validators.validateEmail(value)
  }

  return error
}
