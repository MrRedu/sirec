import { useState } from 'react'

export function useOfficer() {
  const [officerData, setOfficerData] = useState()

  const handleChange = e => {
    const { name, value } = e.target
    setOfficerData(prev => ({ ...prev, [name]: value }))
  }

  return { officerData, handleChange }
}
