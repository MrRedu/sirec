import { TableComponent } from '@/components/organisms/ui/TableComponent'
import { Section } from '@/components/atoms/ui/Section'

const loadUsers = async () => {
  const res = await fetch('http://localhost:3000/api/users')
  const users = await res.json()
  return users
}

const usersColumns = ['Nombre', 'Correo electrónico', 'Rol']
const roleMapping = {
  1: 'Administrador',
  2: 'Desarrollador',
  3: 'General',
}
export default async function UsersPage() {
  const { data: users } = await loadUsers()
  const mappedUsers = users.map(user => ({
    id: user.id_user,
    name: user.name_user,
    email: user.email_user,
    idRol: roleMapping[user.id_rol] || 'Desconocido',
  }))

  return (
    <Section>
      <TableComponent
        ariaLabel="Tabla para ver todos los usuarios"
        columns={usersColumns}
        rows={mappedUsers}
      />
    </Section>
  )
}
