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
