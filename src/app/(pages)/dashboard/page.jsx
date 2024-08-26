import { Section } from '@/components/atoms/ui/Section'
import { Title } from '@/components/atoms/ui/Title'
import { CardResumen } from '@/components/molecules/CardResumen'
import { FileText, RadioTower, SquareUser } from 'lucide-react'
import { howManyRadiosRegistered } from '@/services/radios'
import { howManyOfficersRegistered } from '@/services/officers'
import { howManyAssignmentsRegistered } from '@/services/assignments'


export default async function DashboardPage() {
  const totalRadiosRegistered = await howManyRadiosRegistered()
  const totalOfficersRegistered = await howManyOfficersRegistered()
  const totalAssignmentsRegistered = await howManyAssignmentsRegistered()

  return (
    <Section>
      <Title className="mb-4">{`Resumen`}</Title>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <CardResumen
          text="Radios registrados"
          number={totalRadiosRegistered}
          icon={
            <RadioTower size={36} className="text-blue-600 min-w-9 min-h-9" />
          }
        />
        <CardResumen
          text="Funcionarios registrados"
          number={totalOfficersRegistered}
          icon={
            <SquareUser size={36} className="text-blue-600 min-w-9 min-h-9" />
          }
        />
        <CardResumen
          text="Asignaciones registradas"
          number={totalAssignmentsRegistered}
          icon={
            <FileText size={36} className="text-blue-600 min-w-9 min-h-9" />
          }
        />
 
      </div>
    </Section>
  )
}
