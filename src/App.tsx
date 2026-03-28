import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { supabase } from './supabase'
import Auth from './Auth.tsx'
import Zinyoku from './Zinyoku'

// ============ テーマ ============
const C = {
  bg: '#080810',
  bg2: '#0f0f1a',
  card: '#12121f',
  border: '#ffffff11',
  accent: '#e8c97a',
  accent2: '#7a9ae8',
  text: '#f0ece0',
  sub: '#7a7a8a',
  red: '#e87a7a',
}

// ============ 作品データ ============
const WORKS = [
  {
    id: 'zinyoku',
    title: '禁欲トラッカー',
    category: 'アプリ',
    desc: '継続日数・称号・カレンダーで禁欲をサポートするウェブアプリ。サイバー風UIとテーマ切替機能を搭載。',
    tags: ['React', 'TypeScript', 'Supabase'],
    link: '/apps/zinyoku',
    internal: true,
    color: '#00f0ff',
  },
]

// ============ ナビ ============
function Nav() {
  const location = useLocation()
  const links = [
    { to: '/', label: 'TOP' },
    { to: '/works', label: 'WORKS' },
    { to: '/about', label: 'ABOUT' },
    { to: '/contact', label: 'CONTACT' },
  ]
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: C.bg + 'ee', borderBottom: `1px solid ${C.border}`, backdropFilter: 'blur(10px)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <Link to="/" style={{ textDecoration: 'none', color: C.accent, fontFamily: 'serif', fontSize: 18, letterSpacing: 2 }}>asai</Link>
        <div style={{ display: 'flex', gap: 24 }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              textDecoration: 'none', fontSize: 11, letterSpacing: 3,
              color: location.pathname === l.to ? C.accent : C.sub,
              fontFamily: 'monospace',
              borderBottom: location.pathname === l.to ? `1px solid ${C.accent}` : '1px solid transparent',
              paddingBottom: 2,
            }}>{l.label}</Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

// ============ トップページ ============
function Home() {
  const [tick, setTick] = useState(0)
  useEffect(() => { const t = setInterval(() => setTick(v => v + 1), 1000); return () => clearInterval(t) }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 1.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
      {/* 背景グリッド */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(${C.accent}08 1px, transparent 1px), linear-gradient(90deg, ${C.accent}08 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 600 }}>
        {/* 装飾ライン */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ height: 1, width: 60, background: `linear-gradient(90deg, transparent, ${C.accent})` }} />
          <span style={{ fontSize: 10, color: C.accent, letterSpacing: 4, fontFamily: 'monospace' }}>PORTFOLIO</span>
          <div style={{ height: 1, width: 60, background: `linear-gradient(90deg, ${C.accent}, transparent)` }} />
        </div>

        <h1 style={{ fontFamily: 'serif', fontSize: 'clamp(40px, 10vw, 72px)', fontWeight: 400, color: C.text, margin: '0 0 8px', letterSpacing: 4, lineHeight: 1.2 }}>
          asai
        </h1>
        <div style={{ fontFamily: 'serif', fontSize: 14, color: C.accent, letterSpacing: 6, marginBottom: 24 }}>浅井</div>

        <p style={{ fontSize: 14, color: C.sub, lineHeight: 2, marginBottom: 32, fontFamily: 'sans-serif' }}>
          アプリ開発 / デザイン / 映像 / 音楽 / ゲーム
        </p>

        {/* CTAボタン */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/works" style={{
            textDecoration: 'none', padding: '12px 28px',
            border: `1px solid ${C.accent}`, color: C.accent,
            fontFamily: 'monospace', fontSize: 12, letterSpacing: 2,
            position: 'relative', overflow: 'hidden',
          }}>
            WORKS →
          </Link>
          <Link to="/contact" style={{
            textDecoration: 'none', padding: '12px 28px',
            border: `1px solid ${C.border}`, color: C.sub,
            fontFamily: 'monospace', fontSize: 12, letterSpacing: 2,
          }}>
            CONTACT
          </Link>
        </div>

        {/* ステータス */}
        <div style={{ marginTop: 48, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'WORKS', value: WORKS.length },
            { label: 'STATUS', value: 'ACTIVE' },
            { label: 'BASE', value: 'JAPAN' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, color: C.accent, fontFamily: 'monospace', fontWeight: 700 }}>{s.value}</div>
              <div style={{ fontSize: 9, color: C.sub, letterSpacing: 3, fontFamily: 'monospace', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* スクロール指示 */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', fontSize: 10, color: C.sub, letterSpacing: 3, fontFamily: 'monospace', animation: `fadeInOut ${tick % 2 === 0 ? 'visible' : 'visible'} 1s` }}>
        SCROLL ↓
      </div>
    </div>
  )
}

// ============ 作品一覧 ============
function Works() {
  return (
    <div style={{ minHeight: '100vh', padding: '100px 1.5rem 4rem', maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 10, color: C.accent, letterSpacing: 4, fontFamily: 'monospace', marginBottom: 8 }}>// WORKS</div>
        <h2 style={{ fontFamily: 'serif', fontSize: 32, fontWeight: 400, color: C.text, margin: 0 }}>作品一覧</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {WORKS.map(w => (
          <WorkCard key={w.id} work={w} />
        ))}
        {/* Coming Soon */}
        {[1, 2].map(i => (
          <div key={i} style={{
            background: C.card, border: `1px dashed ${C.border}`,
            borderRadius: 4, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 180,
          }}>
            <span style={{ fontSize: 11, color: C.sub, letterSpacing: 3, fontFamily: 'monospace' }}>COMING SOON</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function WorkCard({ work }: { work: typeof WORKS[0] }) {
  const [hover, setHover] = useState(false)
  const content = (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? C.bg2 : C.card,
        border: `1px solid ${hover ? work.color + '66' : C.border}`,
        borderRadius: 4, padding: 24, cursor: 'pointer',
        transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
      }}>
      {/* アクセントライン */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: work.color, opacity: hover ? 1 : 0.3, transition: 'opacity 0.2s' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <span style={{ fontSize: 10, color: work.color, letterSpacing: 2, fontFamily: 'monospace', background: work.color + '22', padding: '3px 8px' }}>{work.category}</span>
        <span style={{ fontSize: 16, color: C.sub }}>↗</span>
      </div>

      <h3 style={{ fontFamily: 'serif', fontSize: 20, fontWeight: 400, color: C.text, margin: '0 0 8px' }}>{work.title}</h3>
      <p style={{ fontSize: 12, color: C.sub, lineHeight: 1.8, margin: '0 0 16px', fontFamily: 'sans-serif' }}>{work.desc}</p>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {work.tags.map(tag => (
          <span key={tag} style={{ fontSize: 10, color: C.sub, border: `1px solid ${C.border}`, padding: '2px 8px', fontFamily: 'monospace' }}>{tag}</span>
        ))}
      </div>
    </div>
  )

  return work.internal
    ? <Link to={work.link} style={{ textDecoration: 'none' }}>{content}</Link>
    : <a href={work.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{content}</a>
}

// ============ 自己紹介 ============
function About() {
  const skills = [
    { cat: 'アプリ開発', items: ['React', 'TypeScript', 'Supabase', 'Vite'] },
    { cat: 'デザイン', items: ['UI/UX', 'Figma'] },
    { cat: 'その他', items: ['映像編集', '音楽制作', 'ゲーム開発'] },
  ]
  return (
    <div style={{ minHeight: '100vh', padding: '100px 1.5rem 4rem', maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 10, color: C.accent, letterSpacing: 4, fontFamily: 'monospace', marginBottom: 8 }}>// ABOUT</div>
        <h2 style={{ fontFamily: 'serif', fontSize: 32, fontWeight: 400, color: C.text, margin: 0 }}>自己紹介</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        <div>
          <div style={{ width: 120, height: 120, borderRadius: 4, background: C.card, border: `1px solid ${C.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, fontSize: 48 }}>
            👤
          </div>
          <h3 style={{ fontFamily: 'serif', fontSize: 24, fontWeight: 400, color: C.text, margin: '0 0 4px' }}>asai</h3>
          <div style={{ fontSize: 12, color: C.accent, fontFamily: 'monospace', letterSpacing: 2, marginBottom: 16 }}>浅井</div>
          <p style={{ fontSize: 13, color: C.sub, lineHeight: 2, fontFamily: 'sans-serif' }}>
            日本在住のクリエイター。アプリ開発、デザイン、映像、音楽、ゲームなど多分野で活動中。
          </p>
        </div>

        <div>
          {skills.map(s => (
            <div key={s.cat} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 10, color: C.accent, letterSpacing: 3, fontFamily: 'monospace', marginBottom: 10 }}>{s.cat}</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {s.items.map(item => (
                  <span key={item} style={{ fontSize: 11, color: C.text, border: `1px solid ${C.border}`, padding: '4px 10px', fontFamily: 'monospace' }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============ 連絡先 ============
function Contact() {
  const links = [
    { label: 'GitHub', value: 'github.com/asaitoshiki', href: 'https://github.com/asaitoshiki', icon: '◎' },
    { label: 'X (Twitter)', value: '@username', href: '#', icon: '◇' },
    { label: 'Email', value: 'your@email.com', href: 'mailto:your@email.com', icon: '◈' },
  ]
  return (
    <div style={{ minHeight: '100vh', padding: '100px 1.5rem 4rem', maxWidth: 600, margin: '0 auto' }}>
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 10, color: C.accent, letterSpacing: 4, fontFamily: 'monospace', marginBottom: 8 }}>// CONTACT</div>
        <h2 style={{ fontFamily: 'serif', fontSize: 32, fontWeight: 400, color: C.text, margin: 0 }}>連絡先</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {links.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{
            textDecoration: 'none', background: C.card, border: `1px solid ${C.border}`,
            padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16,
            transition: 'border-color 0.2s',
          }}>
            <span style={{ fontSize: 20, color: C.accent }}>{l.icon}</span>
            <div>
              <div style={{ fontSize: 10, color: C.sub, letterSpacing: 2, fontFamily: 'monospace', marginBottom: 2 }}>{l.label}</div>
              <div style={{ fontSize: 14, color: C.text, fontFamily: 'monospace' }}>{l.value}</div>
            </div>
            <span style={{ marginLeft: 'auto', color: C.sub }}>→</span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ============ Zinyokuラッパー ============
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

  return <Zinyoku userId={session?.user?.id || null} onLoginRequest={() => setShowAuth(true)} />
}

// ============ メイン ============
export default function App() {
  return (
    <div style={{ background: C.bg, minHeight: '100vh', color: C.text }}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apps/zinyoku" element={<ZinyokuWrapper />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}