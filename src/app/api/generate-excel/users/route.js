// app/api/generate-excel/route.js
import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx'
import { connection } from '@/libs/mysql'

const queryToUsers = `
SELECT 
  u.email_user,
  u.password_user,
  u.name_user,
  u.created_at,
  u.updated_at,
  r.name_rol AS rol_user
FROM tbl_users u
JOIN tbl_roles r ON u.id_rol = r.id_rol
`

export async function GET() {
  try {
    // Consulta la tabla tbl_radios
    const [rowsRadios] = await connection.execute(queryToUsers)

    // Crea un nuevo libro de trabajo
    const workbook = XLSX.utils.book_new()

    // Convierte los datos en una hoja de trabajo
    const worksheetRadios = XLSX.utils.json_to_sheet(rowsRadios)

    // Agrega la hoja de trabajo al libro
    XLSX.utils.book_append_sheet(workbook, worksheetRadios, 'Usuarios')

    // Genera el archivo Excel
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'buffer',
    })

    // Devuelve el archivo como respuesta
    return new Response(excelBuffer, {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="usuarios.xlsx"',
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error al generar el archivo Excel' },
      { status: 500 }
    )
  } finally {
    await connection.end()
  }
}
