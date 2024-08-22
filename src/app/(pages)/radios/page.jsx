import { Title } from '@/components/atoms/ui/Title'
import { Section } from '@/components/atoms/ui/Section'
import { RadiosTable } from '@/components/organisms/ui/tables/RadiosTable'


const radiosColumns = ['Serial', 'ISSI', 'TEI', 'N° Bien', 'Observación', 'Status', 'Marca', 'Modelo', 'Tipo']

// serial: '890TPA0101',
// issi: '202401',
// tei: '000819134354151544',
// numBien: '5781',
// observacion: '',
// idStatus: '1',
// idMarca: '1',
// idModelo: '1',
// idTipo: '1',

const radios = [{
  serial: '890TPA0101',
  issi: '202401',
  tei: '000819134354151544',
  numBien: '5781',
  observacion: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  idStatus: '1',
  idMarca: '1',
  idModelo: '1',
  idTipo: '1',
}]

export default function RadiosPage() {
  return (
    <Section>
      <Title>Radios</Title>
      <RadiosTable columns={radiosColumns} rows={radios}/>
    </Section>
  )
}
