import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'

const tableOfficers = 'tbl_funcionarios'
const queryGetAllOfficers = `SELECT * FROM tbl_funcionarios`

export async function GET() {
  try {
    const [result] = await connection.query(queryGetAllOfficers)

    return NextResponse.json({ data: result, message: 'OK' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error loading officers',
      },
      { status: 500 }
    )
  }
}

export async function POST(req) {
  try {
    const {
      cedulaOfficer,
      nombresOfficer,
      apellidosOfficer,
      telefonoOfficer,
      idStatusOfficer,
      idOrganismoOfficer,
      idGrupoOfficer,
      idRangoOfficer,
    } = await req.json()

    const query = `INSERT INTO ${tableOfficers} SET ?`
    const result = await connection.query(query, {
      cedula_funcionario: Number(cedulaOfficer),
      nombres_funcionario: nombresOfficer,
      apellidos_funcionario: apellidosOfficer,
      telefono_funcionario: telefonoOfficer,
      id_status_funcionario: Number(idStatusOfficer),
      id_organismo_funcionario: Number(idOrganismoOfficer),
      id_grupo_funcionario: Number(idGrupoOfficer),
      id_rango_funcionario: Number(idRangoOfficer),
    })

    return NextResponse.json(
      {
        message: 'Officer created successfully',
        officer: {
          idOfficer: result.insertId,
          cedula_funcionario: cedulaOfficer,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error creating officer',
      },
      { status: 500 }
    )
  }
}
