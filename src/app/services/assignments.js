// #TODO: Manejar errores
export const getAllAssignments = async () => {
  const res = await fetch('http://localhost:3000/api/assignments')
  const assignments = await res.json()
  return assignments
}
