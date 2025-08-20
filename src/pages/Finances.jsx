import React from 'react'
import useSave from '../hooks/useSave.js'

export default function Finances() {
  const { save } = useSave()
  if (!save) return <p>Cria um jogo em <a href="#/new">Novo Jogo</a> primeiro.</p>

  return (
    <div>
      <h2>Finanças</h2>
      <table>
        <thead><tr><th>Equipa</th><th>Budget</th><th>Motor</th></tr></thead>
        <tbody>
          {save.teams.map(t=>(
            <tr key={t.id}><td>{t.name}</td><td>${t.budget}M</td><td>{t.engine}</td></tr>
          ))}
        </tbody>
      </table>
      <p style={{marginTop:12, fontSize:12, color:'#666'}}>
        * Exemplo simples com o que já existe no JSON. Posso adicionar custos (pilotos, staff, desenvolvimento, bónus) e saldo projetado por corrida.
      </p>
    </div>
  )
}
