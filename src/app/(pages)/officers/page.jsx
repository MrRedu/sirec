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

const officersStatus = {
  1: 'Activo',
  2: 'Inactivo',
  3: 'Permiso',
  4: 'Reposo',
  5: 'Vacaciones',
}

// TODO: Tomar los que están en mayúsculas desde la base de datos
const RANGOS_OFFICER = {
  1: 'Técnico',
  2: 'Coordinador',
  3: 'Director',
  4: 'Gerente',
}

const GRUPOS_OFFICER = {
  1: 'Dpto. de Sistemas',
  2: 'Dpto. de Telecomunicaciones',
}

const ORGANISMOS_OFFICER = {
  1: 'Servicio Desconcentrado de Telecomunicaciones Aragua',
  2: 'Policía Bolivariana de Aragua',
  3: 'Policía Bolivariana Nacional',
}

export default async function OfficersPage() {
  const { data: officers } = await getAllOfficers()
  const mappedOfficers = officers.map(officer => ({
    id: officer.id_funcionario,
    cedula: officer.cedula_funcionario,
    nombres: officer.nombres_funcionario,
    apellidos: officer.apellidos_funcionario,
    telefono: officer.telefono_funcionario,
    idStatus: officersStatus[officer.id_status_funcionario] || 'Desconocido',
    idOrganismo:
      ORGANISMOS_OFFICER[officer.id_organismo_funcionario] || 'Desconocido',
    idGrupo: GRUPOS_OFFICER[officer.id_grupo_funcionario] || 'Desconocido',
    idRango: RANGOS_OFFICER[officer.id_rango_funcionario] || 'Desconocido',
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
