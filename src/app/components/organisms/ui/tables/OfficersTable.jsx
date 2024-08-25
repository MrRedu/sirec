'use client'
import propTypes from 'prop-types'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { useState } from 'react'
import { Title } from '@/components/atoms/ui/Title'
import { Pencil, Plus, Trash2 } from 'lucide-react'

export const OfficersTable = ({
  ariaLabel = 'Example static collection table',
  color = 'primary',
  columns = ['Is empty'],
  rows = [],
}) => {
  const [selectedRow, setSelectedRow] = useState(null)
  const handleRowSelect = row => {
    setSelectedRow(row)
    console.log(selectedRow)
  }
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Title>{`Funcionarios`}</Title>
        <div className="flex gap-4">
          <Button
            color={'primary'}
            endContent={<Plus />}
            // onPress={modalToAddRadio.onOpen}
          >{`Agregar`}</Button>
          <Button
            isIconOnly
            color="primary"
            aria-label="Editar"
            variant={selectedRow ? 'flat' : 'light'}
            isDisabled={!selectedRow}
          >
            <Pencil />
          </Button>
          <Button
            isIconOnly
            color="danger"
            aria-label="Borrar"
            variant={selectedRow ? 'flat' : 'light'}
            isDisabled={!selectedRow}
            // onPress={modalToConfirmDelete.onOpen}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
      <Table
        color={color}
        selectionMode="single"
        aria-label={ariaLabel}
        isHeaderSticky
        // defaultSelectedKeys={['0']}
      >
        <TableHeader>
          {columns.map((name, index) => (
            <TableColumn key={index}>{name}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={'No hay información para mostrar.'}>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              onClick={() => handleRowSelect(row)}
              className="cursor-pointer"
            >
              <TableCell>{row.serial}</TableCell>
              <TableCell>{row.issi}</TableCell>
              <TableCell>{row.tei}</TableCell>
              <TableCell>{row.numBien}</TableCell>
              <TableCell>{row.observacion}</TableCell>
              <TableCell>{row.idStatus}</TableCell>
              <TableCell>{row.idMarca}</TableCell>
              <TableCell>{row.idModelo}</TableCell>
              <TableCell>{row.idTipo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

OfficersTable.propTypes = {
  ariaLabel: propTypes.string,
  color: propTypes.string,
  columns: propTypes.array,
  rows: propTypes.array,
}
