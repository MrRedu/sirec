import { toast } from 'sonner'

export const deleteUser = async email => {
  if (email === 'eduardo@dev.com') {
    return toast.error('No se puede eliminar este usuario 🤡')
  }

  if (!email) {
    return toast.error('Email es requerido')
  }

  const result = await fetch(`http://localhost:3000/api/users/${email}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!result.ok) {
    return toast.error('Error al eliminar el usuario')
  }

  if (result.ok) {
    return toast.success(`El usuario ${email} ha sido eliminado`)
  }
}
