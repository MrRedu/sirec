import { Section } from '@/components/atoms/ui/Section'
import { Title } from '@/components/atoms/ui/Title'
import { CardResumen } from '@/components/molecules/CardResumen'
import { howManyRadiosRegistered } from '@/services/radios'
import { Radio } from 'lucide-react'

export default async function DashboardPage() {
  const totalRadiosRegistered = await howManyRadiosRegistered()
  return (
    <Section>
      <Title>{`Resumen`}</Title>
      <CardResumen
        text="Radios registrados"
        number={totalRadiosRegistered}
        icon={<Radio size={36} className="text-indigo-600" />}
      />
    </Section>
  )
}
