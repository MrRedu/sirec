import { NextResponse } from 'next/server'
import { connection } from '@/app/libs/mysql'

const queryGetAllUsers = `SELECT * FROM tbl_users`

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
