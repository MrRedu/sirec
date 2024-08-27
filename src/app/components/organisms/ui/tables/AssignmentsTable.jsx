'use client'
import propTypes from 'prop-types'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from '@nextui-org/react'
import { Title } from '@/components/atoms/ui/Title'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { FormAssignment } from '../forms/FormAssignment'
import { deleteAssignment } from '@/services/assignments'
import { useAssignments } from '@/hooks/useAssignments'

export const AssignmentsTable = ({
  ariaLabel = 'Example static collection table',
  color = 'primary',
  columns = ['Is empty'],
  rows = [],
}) => {
  const [selectedRow, setSelectedRow] = useState(null)
  const handleRowSelect = row => {
    setSelectedRow(row)
  }

  const modalToAddAssignment = useDisclosure()
  const modalToConfirmDelete = useDisclosure()

  const {
    serial,
    cedula,
    errors,
    handleChange,
    isLoadingSerial,
    isLoadingCedula,
    handleSubmitSerial,
    handleSubmitCedula,
    handleSubmit,
    isLoading,
    handleReset,
  } = useAssignments()

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Title>{`Asignaciones`}</Title>
        <div className="flex gap-4">
          <Button
            color={'primary'}
            endContent={<Plus />}
            onPress={modalToAddAssignment.onOpen}
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
              <TableCell>{row.serial}</TableCell>
              <TableCell>{row.cedula}</TableCell>
              <TableCell>{`${row.nombres} ${row.apellidos}`}</TableCell>
              <TableCell>{row.telefono}</TableCell>
              <TableCell>{row.organismo}</TableCell>
              <TableCell>{row.grupo}</TableCell>
              <TableCell>
                {new Date(row.fecha).toLocaleDateString('es-MX', {
                  day: 'numeric',
                  year: 'numeric',
                  month: 'short',
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Modal to add assignment */}
      <Modal
        isOpen={modalToAddAssignment.isOpen}
        onOpenChange={modalToAddAssignment.onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior={'inside'}
        backdrop={'blur'}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`Crear asignación`}
              </ModalHeader>
              <ModalBody>
                <FormAssignment
                  serial={serial}
                  cedula={cedula}
                  errors={errors}
                  handleChange={handleChange}
                  isLoadingSerial={isLoadingSerial}
                  isLoadingCedula={isLoadingCedula}
                  handleSubmitSerial={handleSubmitSerial}
                  handleSubmitCedula={handleSubmitCedula}
                  handleSubmit={handleSubmit}
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
                  onClick={e => {
                    handleSubmit(e)
                    onClose()
                  }}
                  isLoading={isLoading}
                  isDisabled={errors.cedula.color === 'default'}
                >
                  {isLoading ? 'Asignando...' : `Crear asignación`}
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
                {`Eliminar radio`}
              </ModalHeader>
              <ModalBody>
                <p>{`¿Estás seguro de borrar la asignación del ${selectedRow.serial} con la cedula ${selectedRow.cedula}?`}</p>
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
                    deleteAssignment(selectedRow.id)
                    onClose()
                  }}
                >
                  {`Eliminar radio`}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

AssignmentsTable.propTypes = {
  ariaLabel: propTypes.string,
  color: propTypes.string,
  columns: propTypes.array,
  rows: propTypes.array,
}
