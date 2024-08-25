import { connection } from '@/libs/mysql'
import { NextResponse } from 'next/server'

export async function DELETE(req, { params }) {
  try {
    const result = await connection.query(
      'DELETE FROM tbl_radios WHERE serial_radio = ?',
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
