// app/api/generate-excel/route.js
import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx'
import { connection } from '@/libs/mysql'

const queryToRadios = `
  SELECT 
    r.id_radio,
    r.serial_radio,
    r.tei_radio,
    r.issi_radio,
    r.num_bien_radio,
    r.observacion_radio,
    s.nombre_status AS status_radio,
    m.nombre_marca AS marca_radio,
    mo.nombre_modelo AS modelo_radio,
    t.nombre_tipo AS tipo_radio
  FROM tbl_radios r
  JOIN tbl_status_radio s ON r.id_status_radio = s.id_status_radio
  JOIN tbl_marcas m ON r.id_marca_radio = m.id_marca
  JOIN tbl_modelos mo ON r.id_modelo_radio = mo.id_modelo
  JOIN tbl_tipos t ON r.id_tipo_radio = t.id_tipo
`

const queryToOfficers = `
SELECT 
  f.id_funcionario,
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
    const [rowsRadios] = await connection.execute(queryToRadios)
    const [rowOfficers] = await connection.execute(queryToOfficers)

    // Crea un nuevo libro de trabajo
    const workbook = XLSX.utils.book_new()

    // Convierte los datos en una hoja de trabajo
    const worksheetRadios = XLSX.utils.json_to_sheet(rowsRadios)
    const worksheetOfficers = XLSX.utils.json_to_sheet(rowOfficers)

    // Agrega la hoja de trabajo al libro
    XLSX.utils.book_append_sheet(workbook, worksheetRadios, 'Radios')
    XLSX.utils.book_append_sheet(workbook, worksheetOfficers, 'Funcionarios')

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
        'Content-Disposition': 'attachment; filename="radios.xlsx"',
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
