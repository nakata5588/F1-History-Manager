import React, { useRef } from 'react'
import useSave from '../hooks/useSave.js'

export default function LoadGame() {
  const fileRef = useRef(null)
  const { setSave } = useSave()

  async function onPick(e){
    const f = e.target.files?.[0]
    if(!f) return
    try{
      const json = JSON.parse(await f.text())
      setSave(json)
      alert('Jogo carregado!')
      location.hash = '#/team'
    }catch(err){
      alert('JSON inválido')
    }
  }

  return (
    <div className="glass" style={{padding:20}}>
      <h2>📂 Load Game</h2>
      <p>Carrega um ficheiro <code>.json</code> exportado do jogo.</p>
      <input ref={fileRef} type="file" accept="application/json" onChange={onPick}/>
    </div>
  )
}
