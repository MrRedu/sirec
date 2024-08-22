'use client'
import propTypes from 'prop-types'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { useState } from 'react'

export const RadiosTable = ({
    ariaLabel = 'Example static collection table',
    color = 'primary',
    columns,
    rows,
  }) => {
    const [selectedRow, setSelectedRow] = useState(null)
    const handleRowSelect = row => {
      setSelectedRow(row)
      console.log(row)
    }
    return (
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
    )
}

RadiosTable.propTypes = {
    ariaLabel: propTypes.string,
    color: propTypes.string,
    columns: propTypes.array,
    rows: propTypes.array,
  }
  