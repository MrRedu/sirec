import { Section } from '@/components/atoms/ui/Section'
import { UsersTable } from '@/components/organisms/ui/tables/UsersTable'

const loadAllUsers = async () => {
  const res = await fetch('http://localhost:3000/api/users')
  const users = await res.json()
  return users
}

const usersColumns = ['Nombre', 'Correo electrónico', 'Rol']
const userRoles = {
  1: 'Administrador',
  2: 'Desarrollador',
  3: 'General',
}
export default async function UsersPage() {
  const { data: users } = await loadAllUsers()
  const mappedUsers = users.map(user => ({
    id: user.id_user,
    name: user.name_user,
    email: user.email_user,
    idRol: userRoles[user.id_rol] || 'Desconocido',
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
