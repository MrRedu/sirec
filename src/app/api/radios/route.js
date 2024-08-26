import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'

const tableRadios = 'tbl_radios'
// const queryGetAllRadios = `SELECT * FROM ${tableRadios}`

const query = `
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

export async function GET() {
  try {
    const [result] = await connection.query(query)

    return NextResponse.json({ data: result, message: 'OK' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error loading radios',
      },
      { status: 500 }
    )
  }
}

export async function POST(req) {
  try {
    const {
      serialRadio,
      teiRadio,
      issiRadio,
      numBienRadio,
      observacionRadio,
      idStatusRadio,
      idMarcaRadio,
      idModeloRadio,
      idTipoRadio,
    } = await req.json()

    const query = `INSERT INTO ${tableRadios} SET ?`
    const result = await connection.query(query, {
      serial_radio: serialRadio,
      tei_radio: teiRadio,
      issi_radio: issiRadio,
      num_bien_radio: numBienRadio,
      observacion_radio: observacionRadio,
      id_status_radio: Number(idStatusRadio),
      id_marca_radio: Number(idMarcaRadio),
      id_modelo_radio: Number(idModeloRadio),
      id_tipo_radio: Number(idTipoRadio),
    })

    return NextResponse.json(
      {
        message: 'Radio created successfully',
        radio: {
          id_radio: result.insertId,
          serial_radio: serialRadio,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error creating radio',
      },
      { status: 500 }
    )
  }
}
