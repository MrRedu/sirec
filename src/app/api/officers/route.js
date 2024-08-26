import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'

const tableOfficers = 'tbl_funcionarios'

const query = `
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
    const [result] = await connection.query(query)

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
