'use client'
// TODO: BUSCAR LA MANERA DE HACER ESTA PÁGINA SSR
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

const handleDownloadExcel = ({ endpoint, fileName }) => {
  const url = `/api/generate-excel/${endpoint}`

  // Crea un enlace y simula un clic para descargar el archivo
  const a = document.createElement('a')
  a.href = url
  a.download = `${fileName}.xlsx` // Nombre sugerido para el archivo
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

const administrative = [
  {
    id: 'users',
    title: 'Usuarios',
    subtitle: 'Reporte de usuarios registrados',
    icon: <UsersRound size={36} className="text-blue-600 min-w-9 min-h-9" />,
    onClick: () =>
      handleDownloadExcel({
        endpoint: 'users',
        fileName: 'usuarios',
      }),
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
    onClick: () =>
      handleDownloadExcel({
        endpoint: 'radios',
        fileName: 'radios',
      }),
  },
  {
    id: 'assignments',
    title: 'Asignaciones',
    subtitle: 'Filtra por ID de asignación',
    icon: <FileText size={36} className="text-blue-600 min-w-9 min-h-9" />,
    onClick: () =>
      handleDownloadExcel({
        endpoint: 'assignments',
        fileName: 'asignaciones',
      }),
  },
  {
    id: 'officers',
    title: 'Funcionarios',
    subtitle: 'Filtrar por funcionario',
    icon: <SquareUser size={36} className="text-blue-600 min-w-9 min-h-9" />,
    onClick: () =>
      handleDownloadExcel({
        endpoint: 'officers',
        fileName: 'funcionarios',
      }),
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
          {administrative.map(({ id, title, subtitle, icon, onClick }) => {
            return (
              <CardReport
                key={id}
                title={title}
                subtitle={subtitle}
                icon={icon}
                onClick={onClick}
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
          {technical.map(({ id, title, subtitle, icon, onClick }) => {
            return (
              <CardReport
                key={id}
                title={title}
                subtitle={subtitle}
                icon={icon}
                onClick={onClick}
              />
            )
          })}
        </div>
      </div>
    </Section>
  )
}
