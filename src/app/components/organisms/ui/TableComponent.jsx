'use client'

import propTypes from 'prop-types'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'

import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { FormUser } from './forms/FormUser'
import { useRegister } from '@/hooks/useRegister'
import { deleteUser } from '@/services/users'

export const TableComponent = ({
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    userData,
    handleChange,
    handleSubmit,
    isLoading,
    errors,
    handleReset,
  } = useRegister()

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold leading-none tracking-tight text-gray-800  dark:text-white">{`Usuarios`}</h2>
        <div className="flex gap-4">
          <Button
            color={'primary'}
            endContent={<Plus />}
            onPress={onOpen}
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
            onClick={() => deleteUser(selectedRow.email)}
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
            <TableRow key={index} onClick={() => handleRowSelect(row)}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.idRol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior={'inside'}
        // backdrop={'blur'}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`Agregar usuario`}
              </ModalHeader>
              <ModalBody>
                <FormUser
                  userData={userData}
                  handleChange={handleChange}
                  errors={errors}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    handleReset()
                    onClose()
                  }}
                >
                  {`Cerrar`}
                </Button>
                <Button
                  color="primary"
                  onClick={handleSubmit}
                  isLoading={isLoading}
                >
                  {isLoading ? 'Creando...' : `Crear usuario`}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

TableComponent.propTypes = {
  ariaLabel: propTypes.string,
  color: propTypes.string,
  columns: propTypes.array,
  rows: propTypes.array,
}
