// app/api/generate-excel/route.js
import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx'
import { connection } from '@/libs/mysql'

const queryToOfficers = `
    SELECT 
    f.cedula_funcionario,
    f.nombres_funcionario,
    f.apellidos_funcionario,
    f.telefono_funcionario,
    f.created_at,
    f.updated_at,
    s.nombre_status AS status_funcionario,
    o.nombre_organismo AS organismo_funcionario,
    g.nombre_grupo AS grupo_funcionario,
    r.nombre_rango AS rango_funcionario
    FROM tbl_funcionarios f
    JOIN tbl_status_funcionario s ON f.id_status_funcionario = s.id_status_funcionario
    JOIN tbl_organismos o ON f.id_organismo_funcionario = o.id_organismo
    JOIN tbl_grupos g ON f.id_grupo_funcionario = g.id_grupo
    JOIN tbl_rangos r ON f.id_rango_funcionario = r.id_rango
`

export async function GET() {
  try {
    // Consulta la tabla tbl_radios
    const [rowsRadios] = await connection.execute(queryToOfficers)

    // Crea un nuevo libro de trabajo
    const workbook = XLSX.utils.book_new()

    // Convierte los datos en una hoja de trabajo
    const worksheetRadios = XLSX.utils.json_to_sheet(rowsRadios)

    // Agrega la hoja de trabajo al libro
    XLSX.utils.book_append_sheet(workbook, worksheetRadios, 'Funcionarios')

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
        'Content-Disposition': 'attachment; filename="funcionarios.xlsx"',
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
