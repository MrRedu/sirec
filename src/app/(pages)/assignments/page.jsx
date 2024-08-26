import { Section } from '@/components/atoms/ui/Section'
import { AssignmentsTable } from '@/components/organisms/ui/tables/AssignmentsTable'
import { getAllAssignments } from '@/services/assignments'

const assignmentsColumns = [
  'Serial',
  'Cédula',
  'Nombre',
  'Teléfono',
  'Organismo',
  'Grupo',
  'Fecha',
]

export default async function AssignmentsPage() {
  const { data: assignments } = await getAllAssignments()
  const mappedAssignments = assignments.map(assignment => ({
    id: assignment.id_asignacion,
    cedula: assignment.cedula_funcionario,
    serial: assignment.serial_radio,
    nombres: assignment.nombres_funcionario,
    apellidos: assignment.apellidos_funcionario,
    telefono: assignment.telefono_funcionario,
    organismo: assignment.nombre_organismo,
    grupo: assignment.nombre_grupo,
    fecha: assignment.created_at,
  }))

  return (
    <Section>
      <AssignmentsTable
        ariaLabel="Tabla para ver todos las asignaciones"
        columns={assignmentsColumns}
        rows={mappedAssignments}
      />
    </Section>
  )
}
