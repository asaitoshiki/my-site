import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { supabase } from './supabase'
import Auth from './Auth.tsx'
import Zinyoku from './Zinyoku'

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem', fontFamily: 'sans-serif' }}>
      <h1>私のサイト</h1>
      <p>ここに自己紹介や説明が入ります。</p>
      <Link to="/apps/zinyoku">禁欲アプリを使う →</Link>
    </div>
  )
}

function ZinyokuWrapper() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s)
      setShowAuth(false)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return (
    <div style={{ background: '#050510', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00f0ff', fontFamily: 'monospace' }}>
      LOADING...
    </div>
  )

  if (showAuth) return <Auth onLogin={() => setShowAuth(false)} onBack={() => setShowAuth(false)} />

  return <Zinyoku
    userId={session?.user?.id || null}
    onLoginRequest={() => setShowAuth(true)}
  />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apps/zinyoku" element={<ZinyokuWrapper />} />
      </Routes>
    </BrowserRouter>
  )
}