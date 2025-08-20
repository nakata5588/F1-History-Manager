import React, { useState } from 'react'
import useSave from '../hooks/useSave.js'

export default function Team() {
  const { save } = useSave()
  if (!save) return <p>Cria um jogo em <a href="#/new">Novo Jogo</a> primeiro.</p>

  const [selectedId, setSelectedId] = useState(save.teams[0]?.id)
  const team = save.teams.find(t => t.id === selectedId)
  const drivers = save.drivers.filter(d => d.teamId === selectedId)

  return (
    <div>
      <h2>Equipa</h2>

      <div style={{display:'grid', gridTemplateColumns:'280px 1fr', gap:16}}>
        <aside style={{borderRight:'1px solid #eee', paddingRight:16}}>
          {save.teams.map(t => (
            <button key={t.id}
              onClick={()=>setSelectedId(t.id)}
              style={{
                display:'block', width:'100%', textAlign:'left',
                padding:'8px 10px', marginBottom:8,
                border:'1px solid #ddd', borderRadius:8,
                background: t.id===selectedId ? '#f2f6ff' : 'white'
              }}>
              <div style={{fontWeight:600}}>{t.name}</div>
              <div style={{fontSize:12, color:'#666'}}>Motor: {t.engine}</div>
            </button>
          ))}
        </aside>

        <section>
          {!team ? <p>Selecione uma equipa.</p> : (
            <div style={{display:'grid', gap:16}}>
              <div style={{display:'flex', gap:12, alignItems:'center'}}>
                <div style={{width:14, height:14, background:team.color || '#888', borderRadius:3}} />
                <h3 style={{margin:0}}>{team.name}</h3>
              </div>

              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:12}}>
                {drivers.map(d => (
                  <article key={d.id} style={{border:'1px solid #ddd', borderRadius:12, padding:12}}>
                    <div style={{fontWeight:600, marginBottom:6}}>{d.name}</div>
                    <dl style={{display:'grid', gridTemplateColumns:'auto 1fr', rowGap:4, columnGap:8, margin:0}}>
                      <dt>Overall</dt><dd>{d.overall}</dd>
                      <dt>Pace</dt><dd>{d.pace}</dd>
                      <dt>Racecraft</dt><dd>{d.racecraft}</dd>
                      <dt>Consistência</dt><dd>{d.consistency}</dd>
                      <dt>Experiência</dt><dd>{d.experience}</dd>
                    </dl>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
