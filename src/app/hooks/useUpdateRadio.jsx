import { useEffect, useState } from 'react'
import { getRadio } from '@/services/radios'
import { toast } from 'sonner'

export function useUpdateRadio({ serial }) {
  const [radioData, setRadioData] = useState()
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
          id_status_radio: radioData.idStatusRadio,
          id_organismo_radio: radioData.idOrganismoRadio,
          id_grupo_radio: radioData.idGrupoRadio,
          id_rango_radio: radioData.idRangoRadio,
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
        serialRadio: data[0].serial_radio,
        teiRadio: data[0].tei_radio,
        issiRadio: data[0].issi_radio,
        numBienRadio: data[0].num_bien_radio,
        observacionRadio: data[0].observacion_radio,
        idStatusRadio: data[0].id_status_radio,
        idOrganismoRadio: data[0].id_organismo_radio,
        idGrupoRadio: data[0].id_grupo_radio,
        idRangoRadio: data[0].id_rango_radio,
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
