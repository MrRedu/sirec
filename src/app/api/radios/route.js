import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'

const tableRadios = 'tbl_radios'
const queryGetAllRadios = `SELECT * FROM ${tableRadios}`

export async function GET() {
  try {
    const [result] = await connection.query(queryGetAllRadios)

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
