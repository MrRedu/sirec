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
import { useState } from 'react'
import { Title } from '@/components/atoms/ui/Title'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { FormOfficer } from '../forms/FormOfficer'
import { useOfficer } from '@/hooks/useOfficer'
import { deleteOfficer } from '@/services/officers'

export const OfficersTable = ({
  ariaLabel = 'Example static collection table',
  color = 'primary',
  columns = ['Is empty'],
  rows = [],
}) => {
  const [selectedRow, setSelectedRow] = useState(null)
  const handleRowSelect = row => {
    setSelectedRow(row)
  }

  const modalToAddOfficer = useDisclosure()
  const modalToConfirmDelete = useDisclosure()

  const {
    officerData,
    isLoading,
    handleChange,
    handleReset,
    handleSubmit,
    errors,
  } = useOfficer()

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Title>{`Funcionarios`}</Title>
        <div className="flex gap-4">
          <Button
            color={'primary'}
            endContent={<Plus />}
            onPress={modalToAddOfficer.onOpen}
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
              <TableCell>{row.nombres}</TableCell>
              <TableCell>{row.apellidos}</TableCell>
              <TableCell>{row.cedula}</TableCell>
              <TableCell>{row.telefono}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.organismo}</TableCell>
              <TableCell>{row.grupo}</TableCell>
              <TableCell>{row.rango}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Modal to add officer */}
      <Modal
        isOpen={modalToAddOfficer.isOpen}
        onOpenChange={modalToAddOfficer.onOpenChange}
        isDismissable={false}
        size="xl"
        isKeyboardDismissDisabled={true}
        scrollBehavior={'inside'}
        backdrop={'blur'}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`Registrar funcionario`}
              </ModalHeader>
              <ModalBody>
                <FormOfficer
                  officerData={officerData}
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
                  {isLoading ? 'Creando...' : `Crear funcionario`}
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
                {`Eliminar funcionario`}
              </ModalHeader>
              <ModalBody>
                <p>{`¿Estás seguro de borrar al funcionario C.I: ${selectedRow.cedula}?`}</p>
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
                    deleteOfficer(selectedRow.cedula)
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

OfficersTable.propTypes = {
  ariaLabel: propTypes.string,
  color: propTypes.string,
  columns: propTypes.array,
  rows: propTypes.array,
}
