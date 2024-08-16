'use client'
import { useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { useLogin } from '@/hooks/useLogin'

export const FormLogin = () => {
  const { userData, handleChange, handleSubmit, isLoading } = useLogin()

  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="email"
        label="Email"
        name="email"
        value={userData.email}
        onChange={handleChange}
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        name="password"
        value={userData.password}
        onChange={handleChange}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
            aria-label="toggle password visibility"
          >
            {isVisible ? (
              // <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              <p>HIDE</p>
            ) : (
              // <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              <p>SHOW</p>
            )}
          </button>
        }
        type={isVisible ? 'text' : 'password'}
        className="max-w-xs"
      />
      <Button
        type="submit"
        // disabled={isLoading}
        // isLoading={isLoading}
        onClick={handleSubmit}
        color="primary"
        className="bg-primary-700 hover:bg-primary-800"
      >
        {`Iniciar sesión`}
      </Button>
    </form>
  )
}
