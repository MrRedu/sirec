// #TODO: Manejar errores
export const loadAllOfficers = async () => {
  const res = await fetch('http://localhost:3000/api/officers')
  const radios = await res.json()
  return radios
}
