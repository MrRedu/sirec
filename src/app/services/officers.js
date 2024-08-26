import { toast } from 'sonner'

// #TODO: Manejar errores
export const getAllOfficers = async () => {
  const res = await fetch('http://localhost:3000/api/officers')
  const radios = await res.json()
  return radios
}

export const deleteOfficer = async cedula => {
  if (!cedula) {
    return toast.error('Cédula es requerido')
  }

  const result = await fetch(`http://localhost:3000/api/officers/${cedula}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!result.ok) {
    return toast.error('Error al eliminar el funcionario')
  }

  if (result.ok) {
    return toast.success(`El funcionario C.I: ${cedula} ha sido eliminado`)
  }
}
