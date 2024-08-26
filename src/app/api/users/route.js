import { NextResponse } from 'next/server'
import { connection } from '@/app/libs/mysql'

const queryGetAllUsers = `SELECT * FROM tbl_users`

// Obtener todos los usuarios
export async function GET() {
  try {
    const [result] = await connection.query(queryGetAllUsers)

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
