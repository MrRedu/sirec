import { useState } from 'react'
import { toast } from 'sonner'
import { radioDataInitialState } from '@/utils/const'



export const errorsRadioInitialState = {
  serial: {
    hasError: false,
    message: '',
  },
  status: {
    hasError: false,
    message: '',
  },
  marca: {
    hasError: false,
    message: '',
  },
  modelo: {
    hasError: false,
    message: '',
  },
  tipo: {
    hasError: false,
    message: '',
  },
}

export function useRadio() {
  const [radioData, setRadioData] = useState(radioDataInitialState)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState(errorsRadioInitialState)

  const handleChange = e => {
    const { name, value } = e.target
    setRadioData(prev => ({ ...prev, [name]: value }))
  }

  // const handleUpdate = e => {
  //   const { name, value } = e.target
  //   setRadioData(prev => ({ ...prev, [name]: value }))
  // }

  const handleSubmit = async e => {
    e.preventDefault()

    // const isSerialValid = validateSerial(formData.serialRadio, setErrors)
    // const isMarcaValid = validateMarca(formData.idMarcaRadio, setErrors)
    // const isModeloValid = validateModelo(formData.idModeloRadio, setErrors)
    // const isTipoValid = validateTipo(formData.idTipoRadio, setErrors)
    // const isStatusValid = validateStatus(formData.idStatusRadio, setErrors)

    // if (
    //   isSerialValid ||
    //   isMarcaValid ||
    //   isModeloValid ||
    //   isTipoValid ||
    //   isStatusValid
    // )
    //   return

    // const radioExists = await loadRadio(formData.serialRadio)

    // if (radioExists) {
    //   toast.error(`El radio [${formData.serialRadio}] ya existe.`)
    //   return
    // }

    try {
      setIsLoading(true)
      const result = await fetch('http://localhost:3000/api/radios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(radioData),
      })

      if (result.status === 201) {
        toast.success(`¡Radio [${radioData.serialRadio}] creado con éxito!`)
      }

      // TODO, crear estos códigos
      if (result.status === 500) {
        toast.error(`Error registrando el radio.`)
        return
      }

      setRadioData(radioDataInitialState)
      setErrors(errorsRadioInitialState)
    } catch (error) {
      console.error(error)
      toast.error(`Error registrando el radio.`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setRadioData(radioDataInitialState)
  }

  return {
    radioData,
    isLoading,
    handleChange,
    handleReset,
    handleSubmit,
    errors,
  }
}
