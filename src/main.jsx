import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import db from './data/f1_manager_1980.json'
import { simulateSession, msToTime } from './utils/simulation.js'

/** “Estado” do jogo guardado de forma simples no localStorage **/
function useSave() {
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

function Home() {
  return (
    <>
      <h2>🏠 Home</h2>
      <p>Escolhe uma opção:</p>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/new">🆕 Novo Jogo</Link></li>
        <li><Link to="/practice">🛠️ Treinos</Link></li>
      </ul>
    </>
  )
}

function NewGame() {
  const { setSave } = useSave()
  const navigate = useNavigate()
  function start() {
    setSave(db)               // usa o JSON incluído
    alert('Carreira 1980 iniciada!')
    navigate('/practice')
  }
  return (
    <>
      <h2>🆕 Novo Jogo</h2>
      <p>Base de dados 1980 incluída.</p>
      <button onClick={start}>Começar 1980</button>
    </>
  )
}

function Practice() {
  const { save } = useSave()
  if (!save) return <p>Cria um jogo em <Link to="/new">Novo Jogo</Link> primeiro.</p>
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
    <div style={{display:'grid', gridTemplateColumns:'220px 1fr', height:'100vh', fontFamily:'system-ui, sans-serif'}}>
      <aside style={{borderRight:'1px solid #ddd', padding:16}}>
        <h1 style={{fontSize:18}}>F1 History Manager</h1>
        <nav style={{display:'grid', gap:8}}>
          <Link to="/">🏠 Home</Link>
          <Link to="/new">🆕 Novo Jogo</Link>
          <Link to="/practice">🛠️ Treinos</Link>
        </nav>
      </aside>
      <main style={{padding:24}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewGame />} />
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
