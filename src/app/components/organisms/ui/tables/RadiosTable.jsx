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
import { Pencil, Plus, Trash2 } from 'lucide-react'

import { Title } from '@/components/atoms/ui/Title'
import { deleteRadio } from '@/services/radios'
import { FormRadio } from '../forms/FormRadio'
import { useRadio } from '@/hooks/useRadio'
import { UpdateFormRadio } from '../forms/UpdateFormRadio'
import { useUpdateRadio } from '@/hooks/useUpdateRadio'

export const RadiosTable = ({
  ariaLabel = 'Example static collection table',
  color = 'primary',
  columns = ['Is empty'],
  rows = [],
}) => {
  const [selectedRow, setSelectedRow] = useState(null)
  const handleRowSelect = row => {
    setSelectedRow(row)
  }

  const modalToAddRadio = useDisclosure()
  const modalToConfirmDelete = useDisclosure()
  const modalToUpdateRadio = useDisclosure()

  const {
    radioData,
    isLoading,
    handleChange,
    handleReset,
    handleSubmit,
    errors,
  } = useRadio()

  const {
    isLoading: isLoadingUpdate,
    radioData: radioDataUpdate,
    handleChange: handleChangeUpdate,
    handleSubmit: handleSubmitUpdate,
  } = useUpdateRadio({
    serial: selectedRow?.serial,
  })

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Title>{`Radios`}</Title>
        <div className="flex gap-4">
          <Button
            color={'primary'}
            endContent={<Plus />}
            onPress={modalToAddRadio.onOpen}
          >{`Agregar`}</Button>
          <Button
            isIconOnly
            color="primary"
            aria-label="Editar"
            variant={selectedRow ? 'flat' : 'light'}
            isDisabled={!selectedRow}
            onPress={modalToUpdateRadio.onOpen}
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
              <TableCell>{row.issi}</TableCell>
              <TableCell>{row.tei}</TableCell>
              <TableCell>{row.numBien}</TableCell>
              <TableCell>{row.observacion}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.marca}</TableCell>
              <TableCell>{row.modelo}</TableCell>
              <TableCell>{row.tipo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Modal to add radio */}
      <Modal
        isOpen={modalToAddRadio.isOpen}
        onOpenChange={modalToAddRadio.onOpenChange}
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
                {`Registrar radio`}
              </ModalHeader>
              <ModalBody>
                <FormRadio
                  radioData={radioData}
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
                  {isLoading ? 'Creando...' : `Crear radio`}
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
                <p>{`¿Estás seguro de borrar el radio ${selectedRow.serial}?`}</p>
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
                    deleteRadio(selectedRow.serial)
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
      {/* Modal to update radio */}
      <Modal
        isOpen={modalToUpdateRadio.isOpen}
        onOpenChange={modalToUpdateRadio.onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior={'inside'}
        backdrop={'blur'}
        size="xl"
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`Editar radio`}
              </ModalHeader>
              <ModalBody>
                <UpdateFormRadio
                  isLoading={isLoadingUpdate}
                  radioData={radioDataUpdate}
                  handleChange={handleChangeUpdate}
                />
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
                  onClick={handleSubmitUpdate}
                  isLoading={isLoadingUpdate}
                >
                  {isLoadingUpdate ? 'Actualizando...' : `Actualizar radio`}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

RadiosTable.propTypes = {
  ariaLabel: propTypes.string,
  color: propTypes.string,
  columns: propTypes.array,
  rows: propTypes.array,
}
