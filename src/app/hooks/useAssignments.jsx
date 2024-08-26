import { useState } from 'react'
import { getRadio } from '@/services/radios'
import { getOfficer } from '@/services/officers'
import { toast } from 'sonner'

export function useAssignments() {
  const [serial, setSerial] = useState('')
  const [isLoadingSerial, setIsLoadingSerial] = useState(false)
  const [cedula, setCedula] = useState('')
  const [isLoadingCedula, setIsLoadingCedula] = useState(false)
  const [errors, setErrors] = useState({
    serial: {
      hasError: false,
      message: '',
      color: 'default',
      showButton: true,
    },
    cedula: {
      hasError: false,
      message: '',
      color: 'default',
      showButton: true,
    },
  })
  const [data, setData] = useState({
    idRadio: '',
    idFuncionario: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    if (name === 'serial') {
      setSerial(value)
    } else if (name === 'cedula') {
      setCedula(value)
    }
  }

  const handleSubmitSerial = async e => {
    e.preventDefault()
    if (!serial) return
    try {
      setIsLoadingSerial(true)
      const { data } = await getRadio({ serial })
      if (data === undefined) {
        setErrors(prev => ({
          ...prev,
          serial: {
            hasError: true,
            message: 'Serial no registrado',
            color: 'error',
            showButton: true,
          },
        }))
      } else {
        setErrors(prev => ({
          ...prev,
          serial: {
            hasError: false,
            message: '',
            color: 'success',
            showButton: false,
          },
        }))
        setData(prev => ({ ...prev, idRadio: data.id_radio }))
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoadingSerial(false)
    }
  }

  const handleSubmitCedula = async e => {
    e.preventDefault()
    if (!cedula) return
    try {
      setIsLoadingCedula(true)
      const { data } = await getOfficer({ cedula })
      if (data === undefined) {
        setErrors(prev => ({
          ...prev,
          cedula: {
            hasError: true,
            message: 'Funcionario no registrado',
            color: 'error',
            showButton: true,
          },
        }))
      } else {
        setErrors(prev => ({
          ...prev,
          cedula: {
            hasError: false,
            message: '',
            color: 'success',
            showButton: false,
          },
        }))
        setData(prev => ({ ...prev, idFuncionario: data.id_funcionario }))
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoadingCedula(false)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(data)
    if (!data.idRadio || !data.idFuncionario) return
    try {
      setIsLoading(true)

      const result = fetch('http://localhost:3000/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      // TODO, crear estos códigos
      if (result.status === 201) {
        toast.success('Asignación realizada con éxito')
      }

      if (result.status === 500) {
        toast.error(`Error registrando la asignación.`)
        // return
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleChange,
    serial,
    cedula,
    errors,
    isLoadingSerial,
    isLoadingCedula,
    handleSubmitSerial,
    handleSubmitCedula,
    handleSubmit,
    isLoading,
  }
}
