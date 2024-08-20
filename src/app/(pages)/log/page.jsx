'use client'
import { Section } from '@/components/atoms/ui/Section'
import { Title } from '@/components/atoms/ui/Title'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'

const registros = [
  {
    user: 'eduardo@dev.com',
    date: '20/8/2024, 7:24:00 p. m.',
    action: 'Asigna [890TPA1010] a [12.258.367]',
  },
  {
    user: 'mariana@general.com',
    date: '19/8/2024, 9:00:00 p. m.',
    action: 'Asigna [890TPA1020] a [9.123.457]',
  },
  {
    user: 'jose@admin.com',
    date: '19/8/2024, 8:55:00 p. m.',
    action: 'Cambio de estado de [890TPA1010] a [INOPERATIVO]',
  },
  {
    user: 'laura@general.com',
    date: '19/8/2024, 8:50:00 p. m.',
    action: 'Cierre de sesión',
  },
  {
    user: 'laura@general.com',
    date: '19/8/2024, 8:55:00 p. m.',
    action: 'Inicio de sesión',
  },
  {
    user: 'carlos@admin.com',
    date: '19/8/2024, 8:45:00 p. m.',
    action: 'Asigna [890TPA1030] a [9.123.458]',
  },
  {
    user: 'sofia@general.com',
    date: '19/8/2024, 8:40:00 p. m.',
    action: 'Cambio de estado de [890TPA1020] a [OPERATIVO]',
  },
  {
    user: 'pablo@admin.com',
    date: '19/8/2024, 8:35:00 p. m.',
    action: 'Cierre de sesión',
  },
  {
    user: 'pablo@admin.com',
    date: '19/8/2024, 8:32:00 p. m.',
    action: 'Inicio de sesión',
  },
  {
    user: 'marta@general.com',
    date: '19/8/2024, 8:30:00 p. m.',
    action: 'Cambio de estado de [890TPA1011] a [DEPÓSITO]',
  },
  {
    user: 'julia@admin.com',
    date: '19/8/2024, 8:25:00 p. m.',
    action: 'Asigna [890TPA1040] a [9.456.459]',
  },
  {
    user: 'francisco@general.com',
    date: '19/8/2024, 8:17:00 p. m.',
    action: 'Cierre de sesión',
  },
  {
    user: 'francisco@general.com',
    date: '19/8/2024, 8:15:00 p. m.',
    action: 'Inicio de sesión',
  },
  {
    user: 'veronica@admin.com',
    date: '19/8/2024, 8:15:00 p. m.',
    action: 'Cambio estado del [890TPA1030] a [MANTENIMIENTO]',
  },
  {
    user: 'diego@general.com',
    date: '19/8/2024, 8:10:00 p. m.',
    action: 'Asigna [890TPA1050] a [9.123.460]',
  },
  {
    user: 'isabel@admin.com',
    date: '19/8/2024, 8:07:00 p. m.',
    action: 'Cierre de sesión',
  },
  {
    user: 'isabel@admin.com',
    date: '19/8/2024, 8:05:00 p. m.',
    action: 'Inicio de sesión',
  },
]

export default function LogPage() {
  return (
    <Section>
      <Title className="mb-4">{`Bitácora`}</Title>
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Usuario</TableColumn>
          <TableColumn>Fecha</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {registros.map(({ user, date, action }, index) => (
            <TableRow key={index}>
              <TableCell>{user}</TableCell>
              <TableCell>{date}</TableCell>
              <TableCell>{action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Section>
  )
}
