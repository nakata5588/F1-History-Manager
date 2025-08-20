import React from 'react'
import useSave from '../hooks/useSave.js'

export default function Calendar() {
  const { save } = useSave()
  if (!save) return <p>Cria um jogo em <a href="#/new">Novo Jogo</a> primeiro.</p>
  const { gps, tracks, season } = save
  function trackName(id){ return tracks.find(t=>t.id===id)?.name || id }

  return (
    <div>
      <h2>Calendário {season}</h2>
      <table>
        <thead><tr><th>Ronda</th><th>GP</th><th>Pista</th></tr></thead>
        <tbody>
          {gps.map((gp, i)=>(
            <tr key={gp.id}><td>{i+1}</td><td>{gp.name}</td><td>{trackName(gp.trackId)}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
