import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'

function Home(){ return <h2>🏠 Home</h2> }
function NewGame(){ return <h2>🆕 Novo Jogo (placeholder)</h2> }
function Practice(){ return <h2>🛠️ Treinos (placeholder)</h2> }

function Layout(){
  return (
    <div style={{display:'grid', gridTemplateColumns:'220px 1fr', height:'100vh', fontFamily:'system-ui, sans-serif'}}>
      <aside style={{borderRight:'1px solid #ddd', padding:16}}>
        <h1 style={{fontSize:18}}>F1 Manager (Starter)</h1>
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
