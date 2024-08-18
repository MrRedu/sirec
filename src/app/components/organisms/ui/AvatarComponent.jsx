'use client'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export const AvatarComponent = () => {
  const { data: session } = useSession()
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            // avatarProps={{
            // isBordered: true,
            // src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
            // }}
            className="transition-transform"
            description={session ? session?.user?.email : 'email@example.com'}
            name={session ? session?.user?.name : 'Usuario'}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Conectado con</p>
            <p className="font-bold">
              {session ? session?.user?.email : 'email@example.com'}
            </p>
          </DropdownItem>
          <DropdownItem key="settings" className="relative">
            Perfil
            <Link href="/profile" className="text-sm absolute inset-0" />
          </DropdownItem>
          <DropdownItem key="help" className="relative">
            Ayuda
            <Link href="/help" className="text-sm absolute inset-0" />
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={signOut}>
            {'Cerrar sesión'}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
