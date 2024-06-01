// Input regex validators
const validators = {
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
  }
}

export default validators
