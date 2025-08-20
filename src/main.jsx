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

function Home() {
  return (
    <>
      <h2>🏠 Home</h2>
      <p>Escolhe uma opção no menu.</p>
    </>
  )
}

function NewGame() {
  const { setSave } = useSave()
  function start() {
    setSave(db)
    alert('Carreira 1980 iniciada!')
    location.hash = '#/team'
  }
  return (
    <>
      <h2>🆕 Novo Jogo</h2>
      <button onClick={start}>Começar 1980</button>
    </>
  )
}

function Practice() {
  const { save } = useSave()
  if (!save) return <p>Cria um jogo em <a href="#/new">Novo Jogo</a> primeiro.</p>
  const track = save.tracks[0]
  const results = simulateSession(save.drivers, save.teams, track, { seed: 1980 })
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

function Layout() {
  return (
    <div style={{display:'grid', gridTemplateColumns:'240px 1fr', height:'100vh', fontFamily:'system-ui, sans-serif'}}>
      <aside style={{borderRight:'1px solid #ddd', padding:16}}>
        <h1 style={{fontSize:18, margin:0}}>F1 History Manager</h1>
        <nav style={{display:'grid', gap:8, marginTop:12}}>
          <Link to="/">🏠 Home</Link>
          <Link to="/new">🆕 Novo Jogo</Link>
          <Link to="/team">👥 Equipa</Link>
          <Link to="/staff">🧑‍🔧 Staff</Link>
          <Link to="/calendar">🗓️ Calendário</Link>
          <Link to="/sponsors">💼 Sponsors</Link>
          <Link to="/finances">💰 Finanças</Link>
          <Link to="/practice">🛠️ Treinos</Link>
        </nav>
      </aside>
      <main style={{padding:24}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewGame />} />
          <Route path="/team" element={<Team />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="/practice" element={<Practice />} />
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
