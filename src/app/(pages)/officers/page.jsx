import { Section } from '@/components/atoms/ui/Section'
import { OfficersTable } from '@/components/organisms/ui/tables/OfficersTable'
import { getAllOfficers } from '@/services/officers'

const officersColumns = [
  'Nombres',
  'Apellidos',
  'Cédula',
  'Teléfono',
  'Status',
  'Organismo',
  'Grupo',
  'Rango',
]

export default async function OfficersPage() {
  const { data: officers } = await getAllOfficers()
  const mappedOfficers = officers.map(officer => ({
    id: officer.id_funcionario,
    cedula: officer.cedula_funcionario,
    nombres: officer.nombres_funcionario,
    apellidos: officer.apellidos_funcionario,
    telefono: officer.telefono_funcionario,
    status: officer.status_funcionario,
    organismo: officer.organismo_funcionario,
    grupo: officer.grupo_funcionario,
    rango: officer.rango_funcionario,
  }))

  return (
    <Section>
      <OfficersTable
        columns={officersColumns}
        rows={mappedOfficers}
        ariaLabel="Tabla para ver todos los funcionarios"
      />
    </Section>
  )
}
