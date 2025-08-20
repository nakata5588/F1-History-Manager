import React, { useState } from 'react'

export default function Settings() {
  const [seed, setSeed] = useState(localStorage.getItem('sim_seed') || '1980')
  function save(){
    localStorage.setItem('sim_seed', seed)
    alert('Settings guardadas!')
  }
  return (
    <div className="glass" style={{padding:20, display:'grid', gap:12, maxWidth:420}}>
      <h2>⚙️ Settings</h2>
      <label style={{display:'grid', gap:6}}>
        <span>Seed da simulação (para resultados reprodutíveis)</span>
        <input value={seed} onChange={e=>setSeed(e.target.value)} style={{padding:'8px 10px'}}/>
      </label>
      <button className="btn primary" onClick={save}>Guardar</button>
    </div>
  )
}
