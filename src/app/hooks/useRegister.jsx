import { useState } from 'react'
import { hashPassword } from '@/services/authService'
import { validateEmail, validateString } from '@/utils/utils'
import { toast } from 'sonner'

const userDataInitialState = {
  name: '',
  email: '',
  idRol: '',
  password: '',
  confirmPassword: '',
}

const errorsInitialState = {
  name: {
    message: '',
    hasError: false,
  },
  email: {
    message: '',
    hasError: false,
  },
  rol: {
    message: '',
    hasError: false,
  },
  password: {
    message: '',
    hasError: false,
  },
  confirmPassword: {
    message: '',
    hasError: false,
  },
}

export function useRegister() {
  const [userData, setUserData] = useState(userDataInitialState)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState(errorsInitialState)
  //   const [error, setError] = useState(null)

  const hasError = () => {
    let hasErrorFlag = false

    // Validación del nombre
    if (!userData.name) {
      setErrors(prev => ({
        ...prev,
        name: {
          message: 'El nombre es obligatorio',
          hasError: true,
        },
      }))
      hasErrorFlag = true
    } else if (!validateString(userData.name)) {
      setErrors(prev => ({
        ...prev,
        name: {
          message: 'Los nombres solo pueden contener letras',
          hasError: true,
        },
      }))
      hasErrorFlag = true
    } else {
      setErrors(prev => ({ ...prev, name: { message: '', hasError: false } }))
    }

    // Validación del correo electrónico
    if (!userData.email) {
      setErrors(prev => ({
        ...prev,
        email: {
          message: 'El correo electrónico es obligatorio',
          hasError: true,
        },
      }))
      hasErrorFlag = true
    } else if (!validateEmail(userData.email)) {
      setErrors(prev => ({
        ...prev,
        email: {
          message: 'El correo electrónico no es válido',
          hasError: true,
        },
      }))
      hasErrorFlag = true
    } else {
      setErrors(prev => ({ ...prev, email: { message: '', hasError: false } }))
    }

    // #TODO: ¿Existe este correo?

    // Validación del rol
    if (!userData.idRol) {
      setErrors(prev => ({
        ...prev,
        rol: {
          message: 'El rol es obligatorio',
          hasError: true,
        },
      }))
      hasErrorFlag = true
    } else {
      setErrors(prev => ({ ...prev, rol: { message: '', hasError: false } }))
    }

    // Validación de la contraseña
    if (!userData.password) {
      setErrors(prev => ({
        ...prev,
        password: {
          message: 'La contraseña es obligatoria',
          hasError: true,
        },
      }))
      hasErrorFlag = true
    } else if (userData.password.length < 8) {
      setErrors(prev => ({
        ...prev,
        password: {
          message: 'La contraseña debe tener al menos 8 caracteres',
          hasError: true,
        },
      }))
      hasErrorFlag = true
    } else {
      setErrors(prev => ({
        ...prev,
        password: { message: '', hasError: false },
      }))
    }

    // Validación de la confirmación de la contraseña
    if (userData.password !== userData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: {
          message: 'La contraseña no coincide',
          hasError: true,
        },
      }))
      hasErrorFlag = true
    } else {
      setErrors(prev => ({
        ...prev,
        confirmPassword: { message: '', hasError: false },
      }))
    }

    return hasErrorFlag
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (hasError()) return

    try {
      setIsLoading(true)
      const hashedPassword = await hashPassword(userData.password)
      const response = await fetch('http://localhost:3000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          idRol: userData.idRol,
        }),
      })

      if (!response.ok) {
        throw new Error('Error creating user')
      }

      if (response.status === 201) {
        setUserData(userDataInitialState)
        toast.success('Usuario creado correctamente')
      }

      //   setError(null)
    } catch (error) {
      console.error(error)
      //   setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const handleReset = () => {
    setUserData(userDataInitialState)
    setErrors(errorsInitialState)
  }

  return {
    userData,
    handleChange,
    handleSubmit,
    handleReset,

    isLoading,
    errors,
  }
}
