import { connection } from '@/libs/mysql'
import { NextResponse } from 'next/server'

const tableOfficers = 'tbl_funcionarios'

export async function GET(req, { params }) {
  const query = `SELECT * FROM ${tableOfficers} WHERE cedula_funcionario = ?`
  try {
    const [result] = await connection.query(query, [params.cedula])

    if (result[0].length === 0) {
      return NextResponse.json(
        { message: 'Officer not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { data: result[0], message: 'OK' },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error loading officer',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(req, { params }) {
  try {
    const result = await connection.query(
      'DELETE FROM tbl_funcionarios WHERE cedula_funcionario = ?',
      [params.cedula]
    )

    if (result[0].length === 0) {
      return NextResponse.json(
        { message: 'Officer not found' },
        { status: 404 }
      )
    }

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error deleting officer',
      },
      { status: 500 }
    )
  }
}
