import { NextResponse } from 'next/server'
import { connection } from '@/app/libs/mysql'

// const queryGetAllUsers = `SELECT * FROM tbl_users`
const query = `
SELECT 
  u.id_user,
  u.email_user,
  u.password_user,
  u.name_user,
  u.created_at,
  u.updated_at,
  r.name_rol AS rol_user
FROM tbl_users u
JOIN tbl_roles r ON u.id_rol = r.id_rol
`

// Obtener todos los usuarios
export async function GET() {
  try {
    const [result] = await connection.query(query)

    return NextResponse.json({ data: result, message: 'OK' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error loading users',
      },
      { status: 500 }
    )
  }
}

// Crear un nuevo usuario
export async function POST(req) {
  try {
    const { name, email, password, idRol } = await req.json()

    const result = await connection.query('INSERT INTO tbl_users SET ?', {
      name_user: name,
      email_user: email,
      password_user: password,
      id_rol: parseInt(idRol),
    })

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          idUser: result.insertId,
          name,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error creating user',
      },
      { status: 500 }
    )
  }
}
