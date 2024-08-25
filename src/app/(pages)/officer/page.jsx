import { Section } from '@/components/atoms/ui/Section'
import { OfficersTable } from '@/components/organisms/ui/tables/OfficersTable'

export default function OfficerPage() {
  return (
    <Section>
      <OfficersTable ariaLabel="Tabla para ver todos los funcionarios" />
    </Section>
  )
}
