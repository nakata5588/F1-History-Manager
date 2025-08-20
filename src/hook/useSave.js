import { useState } from 'react'

export default function useSave() {
  const [save, setSave_] = useState(() => {
    const raw = localStorage.getItem('f1_save')
    return raw ? JSON.parse(raw) : null
  })
  function setSave(v) {
    setSave_(v)
    localStorage.setItem('f1_save', JSON.stringify(v))
  }
  function clear() {
    setSave_(null)
    localStorage.removeItem('f1_save')
  }
  return { save, setSave, clear }
}
