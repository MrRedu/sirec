// #TODO: Manejar errores
export const loadAllRadios = async () => {
  const res = await fetch('http://localhost:3000/api/radios')
  const radios = await res.json()
  return radios
}
