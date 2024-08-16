import { useState } from 'react'
import { toast } from 'sonner'
import { validateEmail } from '@/utils/utils'
import { signIn } from 'next-auth/react'

const loginInitialState = {
  email: '',
  password: '',
}

export function useLogin() {
  const [userData, setUserData] = useState(loginInitialState)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = e => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const isValidEmail = validateEmail(userData.email)

    if (!userData.email || !userData.password)
      return toast.error('Todos los campos son obligatorios')
    if (!isValidEmail) return toast.error('El correo electrónico no es valido')

    try {
      setIsLoading(true)
      const response = await signIn('credentials', {
        email: userData.email,
        password: userData.password,
        callbackUrl: `/`,
        redirect: false,
      })

      if (response.status === 401)
        return toast.error('Credenciales incorrectas')
    } catch (error) {
      setError(error)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    userData,
    handleChange,
    handleSubmit,
    isLoading,
    error,
  }
}
