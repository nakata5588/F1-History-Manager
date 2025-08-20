import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import useSave from './hooks/useSave.js'
import db from './data/f1_manager_1980.json'
import { simulateSession, msToTime } from './utils/simulation.js'

import Team from './pages/Team.jsx'
import Staff from './pages/Staff.jsx'
import Calendar from './pages/Calendar.jsx'
import Sponsors from './pages/Sponsors.jsx'
import Finances from './pages/Finances.jsx'
import LoadGame from './pages/LoadGame.jsx'
import Settings from './pages/Settings.jsx'

/** ---------- HOME (Main Screen) ---------- **/
function Home() {
  const { save, setSave, clear } = useSave()
  const hasSave = !!save

  function newGame() {
    setSave(db)
    location.hash = '#/team'
  }
  function continueGame() {
    if (hasSave) location.hash = '#/team'
  }

  return (
    <div style={{
      minHeight:'100vh',
      display:'grid',
      placeItems:'center',
      padding:24
    }}>
      <div className="glass" style={{padding:28, width:'min(920px, 92vw)'}}>
        <div style={{display:'flex', alignItems:'center', gap:18, marginBottom:18}}>
          <img src="./logo.svg" alt="logo" height="54"/>
          <div style={{flex:1}} />
          {hasSave && (
            <button className="btn ghost" onClick={clear} title="Apagar save local">🗑️ Clear Save</button>
          )}
        </div>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',
          gap:12
        }}>
          <button className="btn primary" onClick={newGame}>🆕 New Game</button>
          <button className="btn" onClick={continueGame} disabled={!hasSave}>▶️ Continue</button>
          <Link className="btn" style={{textDecoration:'none', display:'inline-block', textAlign:'center', lineHeight:'36px', border:'1px solid #cfd5df', borderRadius:10}} to="/load">📂 Load Game</Link>
          <Link className="btn" style={{textDecoration:'none', display:'inline-block', textAlign:'center', lineHeight:'36px', border:'1px solid #cfd5df', borderRadius:10}} to="/settings">⚙️ Settings</Link>
        </div>

        <div style={{marginTop:18, fontSize:13, color:'#555'}}>
          <strong>Dica:</strong> o jogo guarda o progresso no <code>localStorage</code> do browser. “Continue” fica ativo assim que iniciares um New Game.
        </div>
      </div>
    </div>
  )
}

/** ---------- Treinos (continua igual) ---------- **/
function Practice() {
  const { save } = useSave()
  if (!save) return <p>Cria um jogo em <a href="#/">Home</a> → <strong>New Game</strong> primeiro.</p>
  const track = save.tracks[0]
  const seed = parseInt(localStorage.getItem('sim_seed') || '1980', 10)
  const results = simulateSession(save.drivers, save.teams, track, { seed })

  return (
    <>
      <h2>🛠️ Treinos — {track.name}</h2>
      <table>
        <thead><tr><th>#</th><th>Piloto</th><th>Tempo</th></tr></thead>
        <tbody>
          {results.map((r, i) => {
            const d = save.drivers.find(x => x.id === r.driverId)
            return <tr key={d.id}><td>{i + 1}</td><td>{d.name}</td><td>{msToTime(r.bestLapMs)}</td></tr>
          })}
        </tbody>
      </table>
    </>
  )
}

/** ---------- Layout com sidebar (estilo FM) ---------- **/
function Layout() {
  return (
    <div style={{display:'grid', gridTemplateColumns:'240px 1fr', minHeight:'100vh', fontFamily:'system-ui, sans-serif'}}>
      <aside style={{borderRight:'1px solid #ddd', padding:16, background:'rgba(255,255,255,0.7)'}}>
        <h1 style={{fontSize:18, margin:0}}>F1 History Manager</h1>
        <nav style={{display:'grid', gap:8, marginTop:12}}>
          <Link to="/">🏠 Home</Link>
          <Link to="/team">👥 Equipa</Link>
          <Link to="/staff">🧑‍🔧 Staff</Link>
          <Link to="/calendar">🗓️ Calendário</Link>
          <Link to="/sponsors">💼 Sponsors</Link>
          <Link to="/finances">💰 Finanças</Link>
          <Link to="/practice">🛠️ Treinos</Link>
          <Link to="/load">📂 Load</Link>
          <Link to="/settings">⚙️ Settings</Link>
        </nav>
      </aside>
      <main style={{padding:24}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/load" element={<LoadGame />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Layout />
    </HashRouter>
  </React.StrictMode>
)
