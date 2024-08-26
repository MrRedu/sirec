import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'

const tableAssignments = 'tbl_asignaciones'
// const queryGetAllAssignments = `SELECT * FROM ${tableAssignments}`

const query = `
  SELECT 
    a.id_asignacion,
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
    // const [result] = await connection.query(queryGetAllAssignments)
    const [result] = await connection.query(query)

    return NextResponse.json({ data: result, message: 'OK' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error loading assignments',
      },
      { status: 500 }
    )
  }
}

export async function POST(req) {
  try {
    const { idFuncionario, idRadio } = await req.json()

    const query = `INSERT INTO ${tableAssignments} SET ?`
    const result = await connection.query(query, {
      id_radio: Number(idRadio),
      id_funcionario: Number(idFuncionario),
    })

    return NextResponse.json(
      {
        message: 'Assignment created successfully',
        assignment: { idAssignment: result.insertId },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error creating assignment',
      },
      { status: 500 }
    )
  }
}
