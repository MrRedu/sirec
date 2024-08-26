import { connection } from '@/libs/mysql'
import { NextResponse } from 'next/server'

const tableRadios = 'tbl_radios'

export async function GET(req, { params }) {
  const query = `SELECT * FROM ${tableRadios} WHERE serial_radio = ?`
  try {
    const [result] = await connection.query(query, [params.serial])

    if (result[0].length === 0) {
      return NextResponse.json({ message: 'Radio not found' }, { status: 404 })
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
        manualMessage: 'Error loading radio',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(req, { params }) {
  try {
    const result = await connection.query(
      `DELETE FROM ${tableRadios} WHERE serial_radio = ?`,
      [params.serial]
    )

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Radio not found' }, { status: 404 })
    }

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error deleting radio',
      },
      { status: 500 }
    )
  }
}

export async function PUT(req, { params }) {
  try {
    const query = `UPDATE ${tableRadios} SET ? WHERE serial_radio = ?`
    const body = await req.json()
    const result = await connection.query(query, [body, params.serial])

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Radio not found' }, { status: 404 })
    }

    const updatedQuery = `SELECT * FROM ${tableRadios} WHERE serial_radio = ?`
    const updatedRadio = await connection.query(updatedQuery, [params.serial])

    return NextResponse.json({
      message: 'Radio updated successfully',
      radio: updatedRadio[0],
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error updating radio',
      },
      { status: 500 }
    )
  }
}
