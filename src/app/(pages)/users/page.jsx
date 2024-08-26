import { Section } from '@/components/atoms/ui/Section'
import { UsersTable } from '@/components/organisms/ui/tables/UsersTable'
import { getAllUsers } from '@/services/users'

const usersColumns = ['Nombre', 'Correo electrónico', 'Rol']

export default async function UsersPage() {
  const { data: users } = await getAllUsers()
  const mappedUsers = users.map(user => ({
    id: user.id_user,
    name: user.name_user,
    email: user.email_user,
    rol: user.rol_user,
  }))

  return (
    <Section>
      <UsersTable
        ariaLabel="Tabla para ver todos los usuarios"
        columns={usersColumns}
        rows={mappedUsers}
      />
    </Section>
  )
}
