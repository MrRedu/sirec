'use client'
import { useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Image,
  Input,
} from '@nextui-org/react'
import { useLogin } from '@/hooks/useLogin'
import { Eye, EyeOff } from 'lucide-react'

export const FormLogin = () => {
  const { userData, handleChange, handleSubmit, isLoading, error, errors } =
    useLogin()

  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <Card>
      <CardBody className="p-8">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Image
              width={82}
              height={82}
              alt="Logo del Servicio Desconcentrado de Telecomunicaciones Aragua"
              src="/logo-sdta.svg"
            />
            <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-800 md:text-5xl lg:text-6xl dark:text-white">{`SIREC`}</h1>
          </div>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{`Bienvenido de vuelta`}</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <Input
            label="Contraseña"
            variant="bordered"
            name="password"
            value={userData.password}
            onChange={handleChange}
            isInvalid={errors.password.hasError}
            errorMessage={errors.password.message}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <Eye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
          />
          <Checkbox defaultSelected>Recordarme</Checkbox>
          <Button
            type="submit"
            isLoading={isLoading}
            onClick={handleSubmit}
            color="primary"
          >
            {`Iniciar sesión`}
          </Button>
          {error && <p>{error}</p>}
        </form>
      </CardBody>
    </Card>
  )
}
