// app/api/generate-excel/route.js
import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx'
import { connection } from '@/libs/mysql'

const queryToRadios = `
  SELECT 
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

export async function GET() {
  try {
    // Consulta la tabla tbl_radios
    const [rowsRadios] = await connection.execute(queryToRadios)

    // Crea un nuevo libro de trabajo
    const workbook = XLSX.utils.book_new()

    // Convierte los datos en una hoja de trabajo
    const worksheetRadios = XLSX.utils.json_to_sheet(rowsRadios)

    // Agrega la hoja de trabajo al libro
    XLSX.utils.book_append_sheet(workbook, worksheetRadios, 'Radios')

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
