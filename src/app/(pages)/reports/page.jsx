import { Section } from '@/components/atoms/ui/Section'
import { Title } from '@/components/atoms/ui/Title'
import {
  CalendarArrowDown,
  FileText,
  RadioTower,
  SquareUser,
  UsersRound,
} from 'lucide-react'
import { CardReport } from '@/components/molecules/CardReport'

const administrative = [
  {
    id: 'users',
    title: 'Usuarios',
    subtitle: 'Reporte de usuarios registrados',
    icon: <UsersRound size={36} className="text-blue-600 min-w-9 min-h-9" />,
  },
  {
    id: 'log',
    title: 'Bitácora',
    subtitle: 'Filtra por rango de fechas',
    icon: (
      <CalendarArrowDown size={36} className="text-blue-600 min-w-9 min-h-9" />
    ),
  },
]

const technical = [
  {
    id: 'radios',
    title: 'Radios',
    subtitle: 'Filtrar por marca y modelo',
    icon: <RadioTower size={36} className="text-blue-600 min-w-9 min-h-9" />,
  },
  {
    id: 'assignments',
    title: 'Asignaciones',
    subtitle: 'Filtra por ID de asignación',
    icon: <FileText size={36} className="text-blue-600 min-w-9 min-h-9" />,
  },
  {
    id: 'officers',
    title: 'Funcionarios',
    subtitle: 'Filtrar por funcionario',
    icon: <SquareUser size={36} className="text-blue-600 min-w-9 min-h-9" />,
  },
]

export default function ReportsPage() {
  return (
    <Section>
      <Title className="mb-4">{`Reportes`}</Title>

      <div className="flex flex-col gap-4 mb-6">
        <Title isH3 className="font-normal text-xl">
          Administrativas
        </Title>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {administrative.map(({ id, title, subtitle, icon }) => {
            return (
              <CardReport
                key={id}
                title={title}
                subtitle={subtitle}
                icon={icon}
              />
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Title isH3 className="font-normal text-xl">
          Técnicas
        </Title>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {technical.map(({ id, title, subtitle, icon }) => {
            return (
              <CardReport
                key={id}
                title={title}
                subtitle={subtitle}
                icon={icon}
              />
            )
          })}
        </div>
      </div>
    </Section>
  )
}
