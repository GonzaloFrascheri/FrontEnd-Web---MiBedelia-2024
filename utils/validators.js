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

  validateEmail:  email => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
     ? ''
      : 'El correo electrónico no es válido.'
  }
}

export default validators
