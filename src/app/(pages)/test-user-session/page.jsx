'use client'

import { useState } from 'react'
import { Section } from '@/components/atoms/ui/Section'
import { Button } from '@nextui-org/react'

export default function TestClientPage() {
  const [message, setMessage] = useState('')

  const handleDump = async () => {
    const response = await fetch('/api/dump', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dbName: 'db_sirec',
        user: 'root',
        password: 'password',
      }),
    })

    const data = await response.json()

    setMessage(data.message || data.error)
  }

  const handleDownload = () => {
    const fileName = 'db_sirec_dump.sql' // Cambia esto al nombre de tu archivo
    const url = `/api/dump?file=${fileName}`

    // Crea un enlace y simula un clic para descargar el archivo
    const a = document.createElement('a')
    a.href = url
    a.download = fileName // Nombre sugerido para el archivo
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <Section>
      <h2>{`</TestClientPage>`}</h2>
      <Button type="button" color="primary" onClick={handleDump}>
        Dump
      </Button>
      {message && <p>{message}</p>}
      <button onClick={handleDownload}>Descargar Dump</button>
    </Section>
  )
}
