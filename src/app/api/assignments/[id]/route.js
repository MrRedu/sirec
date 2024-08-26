import { connection } from '@/libs/mysql'
import { NextResponse } from 'next/server'

export async function DELETE(req, { params }) {
  try {
    const result = await connection.query(
      'DELETE FROM tbl_asignaciones WHERE id_asignacion = ?',
      [params.id]
    )

    if (result[0].length === 0) {
      return NextResponse.json(
        { message: 'Assignment not found' },
        { status: 404 }
      )
    }

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error deleting assignment',
      },
      { status: 500 }
    )
  }
}
