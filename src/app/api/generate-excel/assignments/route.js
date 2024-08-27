// app/api/generate-excel/route.js
import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx'
import { connection } from '@/libs/mysql'

const queryToAssignments = `
  SELECT 
    f.cedula_funcionario,
    f.telefono_funcionario,
    o.nombre_organismo,
    g.nombre_grupo,
    f.nombres_funcionario,
    f.apellidos_funcionario,
    r.serial_radio,
    a.created_at
  FROM tbl_asignaciones a
  JOIN tbl_funcionarios f ON a.id_funcionario = f.id_funcionario
  JOIN tbl_radios r ON a.id_radio = r.id_radio
  JOIN tbl_organismos o ON f.id_organismo_funcionario = o.id_organismo
  JOIN tbl_grupos g ON f.id_grupo_funcionario = g.id_grupo
`

export async function GET() {
  try {
    // Consulta la tabla tbl_radios
    const [rowsRadios] = await connection.execute(queryToAssignments)

    // Crea un nuevo libro de trabajo
    const workbook = XLSX.utils.book_new()

    // Convierte los datos en una hoja de trabajo
    const worksheetRadios = XLSX.utils.json_to_sheet(rowsRadios)

    // Agrega la hoja de trabajo al libro
    XLSX.utils.book_append_sheet(workbook, worksheetRadios, 'Asignaciones')

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
        'Content-Disposition': 'attachment; filename="asignaciones.xlsx"',
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
