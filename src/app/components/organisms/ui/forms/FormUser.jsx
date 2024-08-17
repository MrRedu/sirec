import { useRegister } from '@/hooks/useRegister'
import { Input } from '@nextui-org/react'

export const FormUser = () => {
  const { userData, handleChange, handleSubmit } = useRegister()

  return (
    <form action="" className="flex flex-col gap-4">
      <Input
        type="text"
        label="Nombre"
        name="name"
        variant="bordered"
        value={userData.name}
        onChange={handleChange}
        // isInvalid={errors.email.hasError}
        // errorMessage={errors.email.message}
      />
      <Input
        type="email"
        label="Correo electrónico"
        name="email"
        variant="bordered"
        value={userData.email}
        onChange={handleChange}
        // isInvalid={errors.email.hasError}
        // errorMessage={errors.email.message}
      />
      <Input
        type="password"
        label="Contraseña temporal"
        name="password"
        variant="bordered"
        value={userData.password}
        onChange={handleChange}
        // isInvalid={errors.email.hasError}
        // errorMessage={errors.email.message}
      />
      <Input
        type="password"
        label="Confirmar contraseña temporal"
        name="confirmPassword"
        variant="bordered"
        value={userData.confirmPassword}
        onChange={handleChange}
        // isInvalid={errors.email.hasError}
        // errorMessage={errors.email.message}
      />
      {/* Un select de los roles */}
    </form>
  )
}
