import { Section } from '@/components/atoms/ui/Section'
import { AssignmentsTable } from '@/components/organisms/ui/tables/AssignmentsTable'

const assignmentsColumns = [
  'Serial',
  'Cédula',
  'Nombre',
  'Teléfono',
  'Organismo',
  'Grupo',
  'Fecha',
]

const simulatedAssignments = [
  {
    id: 1,
    serial: '890TPA0508',
    cedula: '123456789',
    nombre: 'Toro R. Melissa D.',
    telefono: '123456789',
    organismo: 'Policía Bolivariana de Aragua',
    grupo: 'Dpto. de Telecomunicaciones',
    fecha: '2023-05-08',
  },
  {
    id: 2,
    serial: '890TPA0509',
    cedula: '897845641',
    nombre: 'Toro R. Josefino D.',
    telefono: '2597897',
    organismo: 'Policía Nacional Bolivariana',
    grupo: 'Dpto. de Sistemas',
    fecha: '2023-05-21',
  },
]

export default function AssignmentsPage() {
  return (
    <Section>
      <AssignmentsTable
        ariaLabel="Tabla para ver todos las asignaciones"
        columns={assignmentsColumns}
        rows={simulatedAssignments}
      />
    </Section>
  )
}
