import React from 'react'
import useSave from '../hooks/useSave.js'

export default function Sponsors() {
  const { save } = useSave()
  if (!save) return <p>Cria um jogo em <a href="#/new">Novo Jogo</a> primeiro.</p>

  const sponsors = save.sponsors || []
  return (
    <div>
      <h2>Sponsors</h2>
      {sponsors.length === 0 ? (
        <p><em>Sem sponsors ainda.</em> Adiciona uma propriedade <code>sponsors</code> ao JSON com: tipo (Principal/Técnico/Premium), investimento, exigências (pódios/vitórias), bónus por vitória/pódio/campeonato, sinergias.</p>
      ) : (
        <table>
          <thead><tr><th>Nome</th><th>Tipo</th><th>Investimento</th><th>Exigência</th></tr></thead>
          <tbody>
            {sponsors.map((s, i) => (
              <tr key={i}><td>{s.name}</td><td>{s.type}</td><td>{s.investment}M</td><td>{s.requirement}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
