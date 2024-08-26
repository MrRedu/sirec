'use client'
import { useAssignments } from '@/hooks/useAssignments'
import { Button, Input, Spinner } from '@nextui-org/react'
import { Search } from 'lucide-react'

export const FormAssignment = () => {
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
  } = useAssignments()

  return (
    <form className="form flex flex-col gap-4" autoComplete="off">
      <Input
        type="text"
        name="serial"
        label="Serial del radio"
        value={serial}
        isReadOnly={errors.serial.color === 'success'}
        color={errors.serial.color}
        isInvalid={errors.serial.hasError}
        errorMessage={errors.serial.message}
        onChange={
          errors.serial.color === 'success' ? null : e => handleChange(e)
        }
        endContent={
          errors.serial.showButton && (
            <Button type="button" onClick={handleSubmitSerial}>
              {isLoadingSerial ? <Spinner size="xs" /> : <Search size={16} />}
            </Button>
          )
        }
      />

      {errors.serial.color === 'success' && (
        <Input
          type="text"
          name="cedula"
          label="Cédula del funcionario"
          value={cedula}
          isReadOnly={errors.cedula.color === 'success'}
          color={errors.cedula.color}
          isInvalid={errors.cedula.hasError}
          errorMessage={errors.cedula.message}
          onChange={
            errors.cedula.color === 'success' ? null : e => handleChange(e)
          }
          endContent={
            errors.cedula.showButton && (
              <Button type="button" onClick={handleSubmitCedula}>
                {isLoadingCedula ? <Spinner size="xs" /> : <Search size={16} />}
              </Button>
            )
          }
        />
      )}

      {/* {errors.cedula.color === 'success' && ( */}
      <Button
        type="submit"
        color="primary"
        disabled={isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? <Spinner size="xs" /> : 'Asignar'}
      </Button>
      {/* )} */}
    </form>
  )
}
