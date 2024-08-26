'use client'
import propTypes from 'prop-types'
import { Button, Input, Spinner } from '@nextui-org/react'
import { Search } from 'lucide-react'

export const FormAssignment = ({
  serial,
  cedula,
  errors,
  handleChange,
  isLoadingSerial,
  isLoadingCedula,
  handleSubmitSerial,
  handleSubmitCedula,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="form flex flex-col gap-4"
      autoComplete="off"
    >
      <Input
        type="text"
        name="serial"
        label="Serial del radio"
        isRequired
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
          isRequired
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
    </form>
  )
}

FormAssignment.propTypes = {
  serial: propTypes.string,
  cedula: propTypes.string,
  errors: propTypes.object,
  handleChange: propTypes.func,
  isLoadingSerial: propTypes.bool,
  isLoadingCedula: propTypes.bool,
  handleSubmitSerial: propTypes.func,
  handleSubmitCedula: propTypes.func,
  handleSubmit: propTypes.func,
}
