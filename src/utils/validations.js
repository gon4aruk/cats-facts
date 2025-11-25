const MIN_NAME = 3
const MAX_NAME = 15

export function isRequired(value) {
  return value.length
}
export function minMax(value) {
  return value.length >= MIN_NAME && value.length <= MAX_NAME
}
export function onlyLatin(value) {
  const latinNumbersSpaces = /^[a-zA-Z0-9\s]+$/
  return latinNumbersSpaces.test(value)
}