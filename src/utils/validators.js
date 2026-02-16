export function isEmailValid(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function isPhoneValid(phone) {
  const re = /^\+?\d{7,15}$/
  return re.test(phone)
}

export function isRequired(value) {
  return value !== null && value !== undefined && value.toString().trim() !== ''
}

export function minLength(value, length) {
  return value && value.toString().length >= length
}

export function maxLength(value, length) {
  return value && value.toString().length <= length
}
