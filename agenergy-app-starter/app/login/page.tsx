'use client'
import { useState } from 'react'
import { createBrowserSupabase } from '../../lib/supabaseBrowser'

export default function Login() {
  const supabase = createBrowserSupabase()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState<string|null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message) }
    else { window.location.href = '/app' }
    setLoading(false)
  }

  return (
    <main style={{padding:24, maxWidth:400, margin:'0 auto'}}>
      <h1>Accedi</h1>
      <form onSubmit={onSubmit} style={{display:'grid', gap:8}}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <label style={{display:'flex', alignItems:'center', gap:6}}>
          <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} />
          Ricordami
        </label>
        {error && <p style={{color:'crimson'}}>{error}</p>}
        <button disabled={loading} style={{padding:'8px 12px'}}>Entra</button>
      </form>
    </main>
  )
}
