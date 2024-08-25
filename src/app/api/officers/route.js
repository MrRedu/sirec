import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'

const queryGetAllOfficers = `SELECT * FROM tbl_funcionarios`

export async function GET() {
  try {
    const [result] = await connection.query(queryGetAllOfficers)

    return NextResponse.json({ data: result, message: 'OK' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error loading officers',
      },
      { status: 500 }
    )
  }
}
