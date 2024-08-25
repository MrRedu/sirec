import { useState } from 'react'
import { toast } from 'sonner'

const officerDataInitialState = {
  cedulaOfficer: '',
  nombresOfficer: '',
  apellidosOfficer: '',
  telefonoOfficer: '',
  idStatusOfficer: '',
  idOrganismoOfficer: '',
  idGrupoOfficer: '',
  idRangoOfficer: '',
}

export const errorsOfficerInitialState = {
  // serial: {
  //   hasError: false,
  //   message: '',
  // },
  // status: {
  //   hasError: false,
  //   message: '',
  // },
  // marca: {
  //   hasError: false,
  //   message: '',
  // },
  // modelo: {
  //   hasError: false,
  //   message: '',
  // },
  // tipo: {
  //   hasError: false,
  //   message: '',
  // },
  cedula: {
    message: '',
    hasError: false,
  },
}

export function useOfficer() {
  const [officerData, setOfficerData] = useState(officerDataInitialState)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState(errorsOfficerInitialState)

  const handleChange = e => {
    const { name, value } = e.target
    setOfficerData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(officerData)

    try {
      setIsLoading(true)
    } catch (error) {
      console.error(error)
      toast.error(`Error registrando al funcionario.`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setOfficerData(officerDataInitialState)
  }

  return {
    officerData,
    handleChange,
    isLoading,
    errors,
    handleReset,
    handleSubmit,
  }
}
