import React from 'react'
import useSave from '../hooks/useSave.js'

export default function Staff() {
  const { save } = useSave()
  if (!save) return <p>Cria um jogo em <a href="#/new">Novo Jogo</a> primeiro.</p>

  return (
    <div>
      <h2>Staff</h2>
      <p>Este ecrã mostra chefes de equipa, diretores técnicos, etc.</p>
      <p><em>Placeholder:</em> a tua base de dados ainda não tem staff. Quando adicionares ao JSON (ex.: <code>save.staff</code>), eu listo aqui com atributos (Liderança, Técnica, Estratégia, Motivação, Salário).</p>
    </div>
  )
}
