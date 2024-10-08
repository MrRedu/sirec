import { connection } from '@/app/libs/mysql'
import { NextResponse } from 'next/server'

// Obtener un usuario por email
export async function GET(req, { params }) {
  try {
    const [result] = await connection.query(
      'SELECT * FROM tbl_users WHERE email_user = ?',
      [params.email]
    )

    if (result[0].length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ data: result[0] }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error loading user',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(req, { params }) {
  try {
    const result = await connection.query(
      'DELETE FROM tbl_users WHERE email_user = ?',
      [params.email]
    )

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error deleting user',
      },
      { status: 500 }
    )
  }
}
