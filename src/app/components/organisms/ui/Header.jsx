import { Image } from '@nextui-org/react'
import { AvatarComponent } from './AvatarComponent'
import { Nav } from './Nav'
import { authOptions } from '#/src/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export async function Header() {
  const { user } = await getServerSession(authOptions)

  return (
    <header className="flex items-center justify-center">
      <div className="w-full flex items-center justify-between py-4 px-8">
        <Image
          width={82}
          height={82}
          alt="Logo del Servicio Desconcentrado de Telecomunicaciones Aragua"
          src="/logo-sdta.svg"
        />
        <Nav idRol={user.id_rol} />
        <AvatarComponent />
      </div>
    </header>
  )
}
