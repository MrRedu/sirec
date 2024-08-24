import { Section } from '@/components/atoms/ui/Section'
import { RadiosTable } from '@/components/organisms/ui/tables/RadiosTable'
import { loadAllRadios } from '@/services/radios'

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

const statusRadio = {
  1: 'Operativo',
  2: 'Inoperativo',
  3: 'Entregado',
  4: 'Nuevo',
  5: 'Vacaciones',
  6: 'Extraviado',
  7: 'Externo',
  8: 'En mantenimiento',
  9: 'En garantía',
  10: 'Desincorporado',
  11: 'En depósito',
}

const modelosRadio = {
  1: 'MTP850',
  2: 'MTP3550',
  3: 'MTP5400',
}
const marcasRadio = {
  1: 'Motorola',
  2: 'Huawei',
}
const tiposRadio = {
  1: 'Portátil',
  2: 'Movil',
  3: 'Fijo',
}

export default async function RadiosPage() {
  const { data: radios } = await loadAllRadios()
  // #TODO: Hacer este map dentro de la función, manejando errores y demás
  const mappedRadios = radios.map(radio => ({
    id: radio.id_radio,
    serial: radio.serial_radio,
    issi: radio.issi_radio,
    tei: radio.tei_radio,
    numBien: radio.num_bien_radio,
    observacion: radio.observacion_radio,
    idStatus: statusRadio[radio.id_status_radio] || '',
    idMarca: marcasRadio[radio.id_marca_radio] || '',
    idModelo: modelosRadio[radio.id_modelo_radio] || '',
    idTipo: tiposRadio[radio.id_tipo_radio] || '',
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
