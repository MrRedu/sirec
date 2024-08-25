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

import { useRegister } from '@/hooks/useRegister'
import { deleteUser } from '@/services/users'
import { Title } from '@/components/atoms/ui/Title'
import { FormUser } from '../forms/FormUser'

export const UsersTable = ({
  ariaLabel = 'Example static collection table',
  color = 'primary',
  columns = ['Is empty'],
  rows = [],
}) => {
  const [selectedRow, setSelectedRow] = useState(null)
  const handleRowSelect = row => {
    setSelectedRow(row)
    console.log(row)
  }
  // const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const modalToAddUser = useDisclosure()
  const modalToConfirmDelete = useDisclosure()

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
        <Title>{`Usuarios`}</Title>
        <div className="flex gap-4">
          <Button
            color={'primary'}
            endContent={<Plus />}
            onPress={modalToAddUser.onOpen}
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
            onPress={modalToConfirmDelete.onOpen}
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
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.idRol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Modal to add user */}
      <Modal
        isOpen={modalToAddUser.isOpen}
        onOpenChange={modalToAddUser.onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior={'inside'}
        backdrop={'blur'}
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
      {/* Modal to confirm delete */}
      <Modal
        isOpen={modalToConfirmDelete.isOpen}
        onOpenChange={modalToConfirmDelete.onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior={'inside'}
        backdrop={'blur'}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`Eliminar usuario`}
              </ModalHeader>
              <ModalBody>
                <p>{`¿Estás seguro de borrar a ${selectedRow.name}?`}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose()
                  }}
                >
                  {`Cerrar`}
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    deleteUser(selectedRow.email)
                    onClose()
                  }}
                >
                  {`Eliminar usuario`}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

UsersTable.propTypes = {
  ariaLabel: propTypes.string,
  color: propTypes.string,
  columns: propTypes.array,
  rows: propTypes.array,
}
