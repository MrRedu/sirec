// app/api/dump/route.js
import { exec } from 'node:child_process'
import { NextResponse } from 'next/server'
import { promisify } from 'node:util'
import fs from 'fs'
import path from 'path'

const execPromise = promisify(exec)

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const fileName = searchParams.get('file')

  // Define la ruta del archivo
  const filePath = path.join(process.cwd(), fileName)

  // Verifica si el archivo existe
  if (fs.existsSync(filePath)) {
    const fileStream = fs.createReadStream(filePath)
    return new Response(fileStream, {
      headers: {
        'Content-Type': 'application/sql', // Cambia esto según el tipo de archivo
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    })
  } else {
    return NextResponse.json(
      { message: 'Archivo no encontrado' },
      { status: 404 }
    )
  }
}

export async function POST(req) {
  const { dbName, user, password } = await req.json()

  try {
    const dumpFile = `${dbName}_dump.sql`
    const command = `mysqldump -u ${user} -p${password} ${dbName} > ${dumpFile}`

    await execPromise(command)
    return NextResponse.json(
      { message: 'Dump creado con éxito', file: dumpFile },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
