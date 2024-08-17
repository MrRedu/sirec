import { useState } from 'react'
import { validateEmail } from '@/utils/utils'
import { signIn } from 'next-auth/react'

const errorsInitialState = {
  email: {
    message: '',
    hasError: false,
  },
  password: {
    message: '',
    hasError: false,
  },
}

const loginInitialState = {
  email: '',
  password: '',
}

export function useLogin() {
  const [userData, setUserData] = useState(loginInitialState)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState(errorsInitialState)
  const [error, setError] = useState(null)

  const handleChange = e => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const isValidEmail = validateEmail(userData.email)

    if (!userData.email) {
      setErrors(prev => ({
        ...prev,
        email: {
          message: 'Introduzca un correo electrónico',
          hasError: true,
        },
      }))
    } else {
      setErrors({ ...errorsInitialState })
    }

    if (!userData.password) {
      setErrors(prev => ({
        ...prev,
        password: {
          message: 'Introduzca una contraseña',
          hasError: true,
        },
      }))
      return
    } else {
      setErrors({ ...errorsInitialState })
    }

    if (!isValidEmail) {
      setErrors(prev => ({
        ...prev,
        email: { message: 'Correo electrónico invalido', hasError: true },
      }))
      return
    } else {
      setErrors({ ...errorsInitialState })
    }

    try {
      setIsLoading(true)
      const response = await signIn('credentials', {
        email: userData.email,
        password: userData.password,
        callbackUrl: `/`,
        redirect: false,
      })

      if (response.status === 401) {
        setErrors(prev => ({
          ...prev,
          password: {
            message: 'Contraseña incorrecta',
            hasError: true,
          },
        }))
      } else {
        setErrors({ ...errorsInitialState })
      }
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
    errors,
  }
}
