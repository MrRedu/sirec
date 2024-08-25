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

    try {
      setIsLoading(true)

      // TODO: VALIDACIONES

      const result = await fetch('http://localhost:3000/api/officers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(officerData),
      })

      if (result.status === 201) {
        toast.success(
          `Funcionario C.I: [${officerData.cedulaOfficer}] registrado con éxito!`
        )
      }

      // TODO, crear estos códigos
      if (result.status === 500) {
        toast.error(`Error registrando al funcionario.`)
        return
      }

      setOfficerData(officerDataInitialState)
      setErrors(errorsOfficerInitialState)
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
