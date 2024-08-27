import { Section } from '@/components/atoms/ui/Section'
import { RadiosTable } from '@/components/organisms/ui/tables/RadiosTable'
import { getAllRadios } from '@/services/radios'

const radiosColumns = [
  'Serial',
  'ISSI',
  'TEI',
  'N° Bien',
  'Observación',
  'Status',
  'Marca',
  'Modelo',
  'Tipo',
]

export default async function RadiosPage() {
  const { data: radios } = await getAllRadios()
  // #TODO: Hacer este map dentro de la función, manejando errores y demás
  const mappedRadios = radios.map(radio => ({
    id: radio.id_radio,
    serial: radio.serial_radio,
    issi: radio.issi_radio,
    tei: radio.tei_radio,
    numBien: radio.num_bien_radio,
    observacion: radio.observacion_radio,
    status: radio.status_radio,
    marca: radio.marca_radio,
    modelo: radio.modelo_radio,
    tipo: radio.tipo_radio,
  }))

  return (
    <Section>
      <RadiosTable
        ariaLabel="Tabla para ver todos los radios"
        columns={radiosColumns}
        rows={mappedRadios}
      />
    </Section>
  )
}
