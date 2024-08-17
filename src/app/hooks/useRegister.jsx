import { useState } from 'react'

const userDataInitialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export function useRegister() {
  const [userData, setUserData] = useState(userDataInitialState)

  const handleChange = e => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(userData)
  }

  return {
    userData,
    handleChange,
    handleSubmit,
  }
}
