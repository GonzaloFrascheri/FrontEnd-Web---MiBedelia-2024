export async function hashPassword (password) {
  // Convert the password string to an ArrayBuffer
  const encoder = new TextEncoder()
  const data = encoder.encode(password)

  // Use the SubtleCrypto API to hash the password
  const hashBuffer = await crypto.subtle.digest('SHA-512', data)

  // Convert the ArrayBuffer to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

  return hashHex
}

// yyyy-mm-dd
export function parseDateToISO (dateString) {
  const date = new Date(dateString)
  const isoDate = date.toISOString().split('T')[0]
  return isoDate
}

// Para el date picker, ajustando el timezone
export function createLocalDateFromString (dateString) {
  // Crear una fecha con el tiempo local basado en una cadena en formato yyyy-mm-dd
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day) // El mes se ajusta porque va de 0 a 11
}

export function crearSecuencia (n) {
  return Array.from({ length: 2 * n }, (_, i) => i + 1)
}

export function isFormValid (errors, formData) {
  return (
    Object.values(errors).every(error => error === '') &&
    Object.values(formData).every(value => value !== '')
  )
}

export function compararDias (a, b) {
  const diasOrdenados = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES']
  return diasOrdenados.indexOf(a) - diasOrdenados.indexOf(b)
}

export function compararHoras (a, b) {
  // Parsear las horas a objetos Date
  const horaA = new Date(`2000-01-01T${a}`)
  const horaB = new Date(`2000-01-01T${b}`)

  return horaA > horaB
}
