import propTypes from 'prop-types'
import { Input, Select, SelectItem } from '@nextui-org/react'

const roles = [
  {
    value: 1,
    label: 'Administrador',
  },
  {
    value: 2,
    label: 'Desarrollador',
  },
  {
    value: 3,
    label: 'General',
  },
]

export const FormUser = ({ userData, handleChange, errors }) => {
  return (
    <form action="" className="flex flex-col gap-4">
      <Input
        type="text"
        label="Nombre"
        name="name"
        variant="bordered"
        value={userData.name}
        onChange={handleChange}
        isInvalid={errors.name.hasError}
        errorMessage={errors.name.message}
      />
      <Input
        type="email"
        label="Correo electrónico"
        name="email"
        variant="bordered"
        value={userData.email}
        onChange={handleChange}
        isInvalid={errors.email.hasError}
        errorMessage={errors.email.message}
      />
      <Select
        label="Rol"
        disabledKeys={['2']}
        variant="bordered"
        name="idRol"
        selectedKeys={[userData.idRol]}
        onChange={handleChange}
        isInvalid={errors.rol.hasError}
        errorMessage={errors.rol.message}
      >
        {roles.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </Select>
      <Input
        type="password"
        label="Contraseña temporal"
        name="password"
        variant="bordered"
        value={userData.password}
        onChange={handleChange}
        isInvalid={errors.password.hasError}
        errorMessage={errors.password.message}
      />
      <Input
        type="password"
        label="Confirmar contraseña temporal"
        name="confirmPassword"
        variant="bordered"
        value={userData.confirmPassword}
        onChange={handleChange}
        isInvalid={errors.confirmPassword.hasError}
        errorMessage={errors.confirmPassword.message}
      />
    </form>
  )
}

FormUser.propTypes = {
  userData: propTypes.object,
  handleChange: propTypes.func,
  errors: propTypes.object,
}
