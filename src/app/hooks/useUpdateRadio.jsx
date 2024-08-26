import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getRadio } from '@/services/radios'
import { radioDataInitialState } from '@/utils/const'

export function useUpdateRadio({ serial }) {
  const [radioData, setRadioData] = useState(radioDataInitialState)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setRadioData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setIsLoading(true)

      const result = await fetch(`http://localhost:3000/api/radios/${serial}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serial_radio: radioData.serialRadio,
          tei_radio: radioData.teiRadio,
          issi_radio: radioData.issiRadio,
          num_bien_radio: radioData.numBienRadio,
          observacion_radio: radioData.observacionRadio,
          id_status_radio: Number(radioData.idStatusRadio),
          id_marca_radio: Number(radioData.idMarcaRadio),
          id_modelo_radio: Number(radioData.idModeloRadio),
          id_tipo_radio: Number(radioData.idTipoRadio),
        }),
      })

      if (result.ok) {
        toast.success('Radio actualizado correctamente')
      } else {
        toast.error('Error al actualizar el radio')
      }
    } catch (error) {
      toast.error('Error al actualizar el radio')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const getRadioData = async () => {
      const { data } = await getRadio({ serial })
      setRadioData({
        serialRadio: data.serial_radio,
        teiRadio: data.tei_radio,
        issiRadio: data.issi_radio,
        numBienRadio: data.num_bien_radio,
        observacionRadio: data.observacion_radio,
        idStatusRadio: data.id_status_radio,
        idMarcaRadio: data.id_marca_radio,
        idModeloRadio: data.id_modelo_radio,
        idTipoRadio: data.id_tipo_radio,
      })
    }

    if (serial) {
      getRadioData()
    }
  }, [serial])

  return {
    isLoading,
    radioData,
    handleChange,
    handleSubmit,
  }
}
