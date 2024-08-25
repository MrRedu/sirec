import { Section } from '@/components/atoms/ui/Section'
import { OfficersTable } from '@/components/organisms/ui/tables/OfficersTable'
import { loadAllOfficers } from '@/services/officers'

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

export default async function OfficerPage() {
  const { data: officers } = await loadAllOfficers()
  const mappedOfficers = officers.map(officer => ({
    id: officer.id_funcionario,
    cedula: officer.cedula_funcionario,
    nombres: officer.nombres_funcionario,
    apellidos: officer.apellidos_funcionario,
    telefono: officer.telefono_funcionario,
    idStatus: officer.id_status_funcionario,
    idOrganismo: officer.id_organismo_funcionario,
    idGrupo: officer.id_grupo_funcionario,
    idRango: officer.id_rango_funcionario,
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
