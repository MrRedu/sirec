import { toast } from 'sonner'
import { ONE_HOUR_IN_MILLISECONDS } from '@/utils/const'

// #TODO: Manejar errores
export const getAllAssignments = async () => {
  const res = await fetch('http://localhost:3000/api/assignments')
  const assignments = await res.json()
  return assignments
}

export const deleteAssignment = async id => {
  if (!id) {
    return toast.error('ID es requerido')
  }

  const result = await fetch(`http://localhost:3000/api/assignments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!result.ok) {
    return toast.error('Error al eliminar la asignación')
  }

  if (result.ok) {
    return toast.success(`La asignación ha sido eliminada`)
  }
}

export const howManyAssignmentsRegistered = async () => {
  const result = await fetch('http://localhost:3000/api/assignments/count', {
    next: { revalidate: ONE_HOUR_IN_MILLISECONDS * 2 },
  })
  const { count } = await result.json()
  return count
}
