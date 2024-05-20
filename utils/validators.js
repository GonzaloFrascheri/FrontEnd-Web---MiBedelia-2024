// Input regex validators
const validators = {
  validateCi: ci => {
    //console.log(ci.length)
    return /^\d{0,8}$/.test(ci) && ci.length === 8
      ? ''
      : 'La cedula debe tener 8 dígitos.'
  },

  validatePassword: password => {
    return password.length >= 4
      ? ''
      : 'La contraseña debe tener al menos 4 caracteres.'
  }
}

export default validators
