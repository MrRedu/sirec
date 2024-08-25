// #TODO: Manejar errores
export const loadAllRadios = async () => {
  const res = await fetch('http://localhost:3000/api/radios')
  const radios = await res.json()
  return radios
}

export const howManyRadiosRegistered = async () => {
  const result = await fetch('http://localhost:3000/api/radios/count')
  const { count } = await result.json()
  return count
}
