import { toast } from 'sonner'

export const getRadio = async ({ serial }) => {
  if (!serial) {
    return toast.error('Serial es requerido')
  }

  const result = await fetch(`http://localhost:3000/api/radios/${serial}`)
  const radio = await result.json()
  return radio
}

// #TODO: Manejar errores
export const getAllRadios = async () => {
  const res = await fetch('http://localhost:3000/api/radios', {
    next: { revalidate: 10 },
  })
  const radios = await res.json()
  return radios
}

export const howManyRadiosRegistered = async () => {
  const result = await fetch('http://localhost:3000/api/radios/count')
  const { count } = await result.json()
  return count
}

export const deleteRadio = async serial => {
  if (!serial) {
    return toast.error('Serial es requerido')
  }

  const result = await fetch(`http://localhost:3000/api/radios/${serial}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!result.ok) {
    return toast.error('Error al eliminar el radio')
  }

  if (result.ok) {
    return toast.success(`El radio ${serial} ha sido eliminado`)
  }
}
