import { useState, useEffect } from 'react'

const TITLES = [
  { days: 0,    name: '本能の奴隷' },
  { days: 1,    name: '目覚めの朝' },
  { days: 3,    name: '意志の芽生え' },
  { days: 5,    name: '欲望との交渉人' },
  { days: 7,    name: '一週間の侍' },
  { days: 10,   name: '脳内革命者' },
  { days: 14,   name: '二週間の求道者' },
  { days: 21,   name: '三週間の哲学者' },
  { days: 30,   name: '月の修行僧' },
  { days: 45,   name: '欲を超えた者' },
  { days: 60,   name: '二ヶ月の賢者' },
  { days: 75,   name: '精神の錬金術師' },
  { days: 90,   name: '三ヶ月の仙人' },
  { days: 120,  name: '四季を越えた武人' },
  { days: 150,  name: '半年の覚醒者' },
  { days: 180,  name: '半年の伝説' },
  { days: 270,  name: '九ヶ月の神話' },
  { days: 365,  name: '一年の聖人' },
  { days: 500,  name: '時を超えた存在' },
  { days: 1000, name: '宇宙と同化した者' },
]

function getTitle(days: number) {
  let current = TITLES[0]
  for (const t of TITLES) { if (days >= t.days) current = t; else break }
  const nextIdx = TITLES.indexOf(current) + 1
  return { current, next: TITLES[nextIdx] || null }
}

type Rec = { startDate: string; endDate: string; days: number }
type ThemeKey = 'cyber' | 'dark' | 'light' | 'blue' | 'purple' | 'green' | 'space' | 'jungle' | 'vintage'
type Theme = { name: string; bg: string; bg2: string; card: string; text: string; sub: string; accent: string; accent2: string; border: string }

const THEMES: { [K in ThemeKey]: Theme } = {
  cyber:   { name: 'サイバー',   bg: '#050510', bg2: '#0a0a1f', card: '#0d0d28', text: '#e0f0ff', sub: '#5080a0', accent: '#00f0ff', accent2: '#ff00aa', border: '#00f0ff44' },
  dark:    { name: 'ダーク',     bg: '#111111', bg2: '#1a1a1a', card: '#1c1c1c', text: '#ffffff', sub: '#888888', accent: '#4a9eff', accent2: '#4aff80', border: '#ffffff22' },
  light:   { name: 'ライト',     bg: '#f0f4f8', bg2: '#ffffff', card: '#ffffff', text: '#111827', sub: '#6b7280', accent: '#2979ff', accent2: '#00c853', border: '#e5e7eb' },
  blue:    { name: 'ブルー',     bg: '#020b18', bg2: '#041428', card: '#0a2040', text: '#c8e6ff', sub: '#6fa8d0', accent: '#00b4ff', accent2: '#00ffcc', border: '#00b4ff33' },
  purple:  { name: 'パープル',   bg: '#0e0718', bg2: '#180d2e', card: '#1e1040', text: '#e8d5ff', sub: '#9b72cf', accent: '#c084fc', accent2: '#f472b6', border: '#c084fc33' },
  green:   { name: 'グリーン',   bg: '#071a0e', bg2: '#0d2b16', card: '#123320', text: '#d4f5d4', sub: '#6daf6d', accent: '#4ade80', accent2: '#a3e635', border: '#4ade8033' },
  space:   { name: '宇宙',       bg: '#04040f', bg2: '#0a0a1e', card: '#0f0f2e', text: '#e0e0ff', sub: '#7070bb', accent: '#818cf8', accent2: '#f472b6', border: '#818cf833' },
  jungle:  { name: 'ジャングル', bg: '#0a1208', bg2: '#121e0e', card: '#1a2a14', text: '#e0f0d0', sub: '#7a9a60', accent: '#86efac', accent2: '#fde047', border: '#86efac33' },
  vintage: { name: '古着',       bg: '#1a1510', bg2: '#231e17', card: '#2e2620', text: '#f0e6d0', sub: '#a09070', accent: '#d4a76a', accent2: '#c084a0', border: '#d4a76a33' },
}

export default function Zinyoku() {
  const [themeKey, setThemeKey] = useState<ThemeKey>(() => (localStorage.getItem('sz_theme') as ThemeKey) || 'cyber')
  const [startDate, setStartDate] = useState(() => localStorage.getItem('sz_start') || new Date().toISOString())
  const [goal, setGoal] = useState(() => Number(localStorage.getItem('sz_goal') || 10))
  const [records, setRecords] = useState<Rec[]>(() => JSON.parse(localStorage.getItem('sz_records') || '[]'))
  const [tab, setTab] = useState<'home' | 'calendar' | 'data' | 'title' | 'settings'>('home')
  const [now, setNow] = useState(Date.now())
  const [showGoal, setShowGoal] = useState(false)
  const [goalInput, setGoalInput] = useState(String(goal))
  const [calMonth, setCalMonth] = useState(new Date())

  const s = THEMES[themeKey]

  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])
  useEffect(() => { localStorage.setItem('sz_theme', themeKey) }, [themeKey])
  useEffect(() => { localStorage.setItem('sz_start', startDate) }, [startDate])
  useEffect(() => { localStorage.setItem('sz_goal', String(goal)) }, [goal])
  useEffect(() => { localStorage.setItem('sz_records', JSON.stringify(records)) }, [records])

  const elapsed = now - new Date(startDate).getTime()
  const days = Math.floor(elapsed / 86400000)
  const hours = Math.floor((elapsed % 86400000) / 3600000)
  const mins = Math.floor((elapsed % 3600000) / 60000)
  const secs = Math.floor((elapsed % 60000) / 1000)
  const { current: currentTitle, next: nextTitle } = getTitle(days)
  const progress = Math.min((days / goal) * 100, 100)
  const today = new Date()

  const reset = () => {
    if (!confirm('リセットしますか？記録に残ります。')) return
    setRecords(p => [...p, { startDate, endDate: new Date().toISOString(), days }])
    setStartDate(new Date().toISOString())
  }

  const failDates = new Set(records.map(r => r.endDate.slice(0, 10)))
  const successDates = new Set<string>()
  records.forEach(r => {
    for (let d = new Date(r.startDate); d <= new Date(r.endDate); d.setDate(d.getDate() + 1)) {
      const k = d.toISOString().slice(0, 10)
      if (!failDates.has(k)) successDates.add(k)
    }
  })
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1))
    successDates.add(d.toISOString().slice(0, 10))

  const glowStyle = { textShadow: `0 0 20px ${s.accent}, 0 0 40px ${s.accent}88` }
  const cardStyle = { background: s.card, border: `1px solid ${s.border}`, borderRadius: 16, padding: 16, marginBottom: 12 }

  const CyberButton = ({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) => (
    <button onClick={onClick} style={{
      background: 'transparent', border: `1px solid ${s.accent}88`, borderRadius: 8,
      padding: '14px 8px', cursor: 'pointer', color: s.text, fontSize: 11,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      position: 'relative', overflow: 'hidden', transition: 'all 0.2s',
    }}>
      <span style={{ fontSize: 24, filter: `drop-shadow(0 0 6px ${s.accent})` }}>{icon}</span>
      <span style={{ color: s.sub, letterSpacing: 1 }}>{label}</span>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)` }} />
    </button>
  )

  return (
    <div style={{ background: s.bg, minHeight: '100vh', color: s.text, fontFamily: "'Courier New', monospace", paddingBottom: 80 }}>

      {/* ヘッダー */}
      <div style={{ borderBottom: `1px solid ${s.border}`, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 11, color: s.accent, letterSpacing: 3 }}>ABSTINENCE.SYS</div>
        <div style={{ fontSize: 11, color: s.sub }}>v1.0</div>
      </div>

      <div style={{ padding: '1.5rem 1rem' }}>

        {/* ホーム */}
        {tab === 'home' && (
          <div>
            {/* メインカウンター */}
            <div style={{ ...cardStyle, textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ fontSize: 11, color: s.sub, letterSpacing: 4, marginBottom: 16 }}>DAYS // ELAPSED</div>
              <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1, color: s.accent, ...glowStyle, fontVariantNumeric: 'tabular-nums' }}>
                {String(days).padStart(2, '0')}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 12, fontSize: 13 }}>
                <span style={{ color: s.accent }}>{String(hours).padStart(2,'0')}</span>
                <span style={{ color: s.sub }}>:</span>
                <span style={{ color: s.accent }}>{String(mins).padStart(2,'0')}</span>
                <span style={{ color: s.sub }}>:</span>
                <span style={{ color: s.accent }}>{String(secs).padStart(2,'0')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 4 }}>
                {['HH','MM','SS'].map(l => <span key={l} style={{ fontSize: 9, color: s.sub, letterSpacing: 2 }}>{l}</span>)}
              </div>
            </div>

            {/* 称号 */}
            <div style={{ ...cardStyle, textAlign: 'center' }}>
              <div style={{ fontSize: 9, color: s.sub, letterSpacing: 3, marginBottom: 4 }}>CURRENT TITLE</div>
              <div style={{ fontSize: 22, color: s.accent2, fontWeight: 700 }}>{currentTitle.name}</div>
              {nextTitle && <div style={{ fontSize: 11, color: s.sub, marginTop: 4 }}>→ 「{nextTitle.name}」まであと {nextTitle.days - days} 日</div>}
            </div>

            {/* プログレスバー */}
            <div style={{ ...cardStyle }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: s.sub, marginBottom: 8 }}>
                <span>TARGET // {goal} DAYS</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div style={{ background: s.bg2, borderRadius: 2, height: 6, overflow: 'hidden' }}>
                <div style={{ background: `linear-gradient(90deg, ${s.accent}, ${s.accent2})`, width: `${progress}%`, height: '100%', borderRadius: 2, transition: 'width 1s', boxShadow: `0 0 8px ${s.accent}` }} />
              </div>
              <div style={{ fontSize: 11, color: s.sub, marginTop: 8, textAlign: 'center' }}>
                {days >= goal ? '[ MISSION COMPLETE ]' : `[ ${goal - days} DAYS REMAINING ]`}
              </div>
            </div>

            {/* ボタン */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 8 }}>
              <CyberButton icon="⏻" label="RESET" onClick={reset} />
              <CyberButton icon="◎" label="TARGET" onClick={() => setShowGoal(v => !v)} />
              <CyberButton icon="↗" label="SHARE" onClick={() => navigator.share?.({ text: `禁欲${days}日達成！` })} />
            </div>

            {showGoal && (
              <div style={{ ...cardStyle, marginTop: 12 }}>
                <div style={{ fontSize: 11, color: s.sub, letterSpacing: 2, marginBottom: 8 }}>SET TARGET DAYS</div>
                <input type="number" value={goalInput} onChange={e => setGoalInput(e.target.value)}
                  style={{ width: '100%', padding: 10, background: s.bg2, border: `1px solid ${s.border}`, borderRadius: 6, color: s.accent, fontSize: 18, textAlign: 'center', fontFamily: 'inherit' }} />
                <button onClick={() => { setGoal(Number(goalInput)); setShowGoal(false) }}
                  style={{ marginTop: 8, width: '100%', padding: 10, background: 'transparent', border: `1px solid ${s.accent}`, borderRadius: 6, color: s.accent, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: 2 }}>
                  [ CONFIRM ]
                </button>
              </div>
            )}
          </div>
        )}

        {/* カレンダー */}
        {tab === 'calendar' && (() => {
          const year = calMonth.getFullYear(), month = calMonth.getMonth()
          const first = new Date(year, month, 1).getDay()
          const dim = new Date(year, month + 1, 0).getDate()
          const cells: (number | null)[] = []
          for (let i = 0; i < first; i++) cells.push(null)
          for (let i = 1; i <= dim; i++) cells.push(i)
          const todayStr = today.toISOString().slice(0, 10)
          return (
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <button onClick={() => setCalMonth(new Date(year, month - 1))} style={{ background: 'none', border: 'none', color: s.accent, fontSize: 20, cursor: 'pointer' }}>‹</button>
                <span style={{ fontSize: 13, letterSpacing: 3, color: s.accent }}>{year}.{String(month+1).padStart(2,'0')}</span>
                <button onClick={() => setCalMonth(new Date(year, month + 1))} style={{ background: 'none', border: 'none', color: s.accent, fontSize: 20, cursor: 'pointer' }}>›</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center' }}>
                {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => (
                  <div key={d} style={{ color: s.sub, fontSize: 9, padding: '4px 0', letterSpacing: 1 }}>{d}</div>
                ))}
                {cells.map((day, i) => {
                  if (!day) return <div key={`e${i}`} />
                  const ds = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
                  const isToday = ds === todayStr
                  const isFail = failDates.has(ds)
                  const isSuccess = successDates.has(ds)
                  return (
                    <div key={day} style={{
                      height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 4, fontSize: 12,
                      background: isToday ? s.accent2 + '44' : isFail ? '#ff004422' : isSuccess ? s.accent + '22' : 'transparent',
                      border: isToday ? `1px solid ${s.accent2}` : isFail ? '1px solid #ff0044' : isSuccess ? `1px solid ${s.accent}88` : '1px solid transparent',
                      color: isToday ? s.accent2 : isFail ? '#ff6688' : isSuccess ? s.accent : s.sub,
                    }}>{day}</div>
                  )
                })}
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 10, color: s.sub }}>
                <span><span style={{ color: s.accent }}>■</span> 成功</span>
                <span><span style={{ color: '#ff6688' }}>■</span> 失敗</span>
                <span><span style={{ color: s.accent2 }}>■</span> 今日</span>
              </div>
            </div>
          )
        })()}

        {/* データ */}
        {tab === 'data' && (
          <div>
            <div style={cardStyle}>
              <div style={{ fontSize: 9, color: s.sub, letterSpacing: 3 }}>AVG DURATION</div>
              <div style={{ fontSize: 32, color: s.accent, marginTop: 4, ...glowStyle }}>
                {records.length ? (records.reduce((a,r) => a+r.days, 0)/records.length).toFixed(1) : '—'}
                <span style={{ fontSize: 14, color: s.sub }}> DAYS</span>
              </div>
            </div>
            {records.length > 0 && (
              <div style={cardStyle}>
                <div style={{ fontSize: 9, color: s.sub, letterSpacing: 3, marginBottom: 10 }}>TOP 5</div>
                {[...records].sort((a,b) => b.days-a.days).slice(0,5).map((r,i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${s.border}` }}>
                    <span style={{ color: s.accent }}>{String(r.days).padStart(3,'0')} DAYS</span>
                    <span style={{ color: s.sub, fontSize: 11 }}>{r.endDate.slice(0,10)}</span>
                  </div>
                ))}
              </div>
            )}
            <div style={cardStyle}>
              <div style={{ fontSize: 9, color: s.sub, letterSpacing: 3, marginBottom: 10 }}>ALL RECORDS</div>
              {records.length === 0 && <div style={{ color: s.sub, fontSize: 12 }}>// NO DATA</div>}
              {[...records].reverse().map((r,i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${s.border}` }}>
                  <span>{String(r.days).padStart(3,'0')} DAYS</span>
                  <span style={{ color: s.sub, fontSize: 11 }}>{r.endDate.slice(0,10)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 称号 */}
        {tab === 'title' && (
          <div>
            <div style={{ ...cardStyle, textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: 9, color: s.sub, letterSpacing: 4, marginBottom: 12 }}>CURRENT RANK</div>
              <div style={{ fontSize: 36, color: s.accent2, fontWeight: 700, textShadow: `0 0 20px ${s.accent2}` }}>{currentTitle.name}</div>
              {nextTitle && <div style={{ fontSize: 11, color: s.sub, marginTop: 8 }}>NEXT: 「{nextTitle.name}」 — {nextTitle.days - days} DAYS</div>}
            </div>
            <div style={cardStyle}>
              <div style={{ fontSize: 9, color: s.sub, letterSpacing: 3, marginBottom: 10 }}>UNLOCKED</div>
              {TITLES.filter(t => days >= t.days).map(t => (
                <div key={t.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${s.border}` }}>
                  <span style={{ color: s.accent }}>[ {t.name} ]</span>
                  <span style={{ color: s.sub, fontSize: 11 }}>{t.days} DAYS</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 設定 */}
        {tab === 'settings' && (
          <div>
            <div style={{ fontSize: 9, color: s.sub, letterSpacing: 4, marginBottom: 16 }}>// SELECT THEME</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {(Object.entries(THEMES) as [ThemeKey, Theme][]).map(([key, t]) => (
                <button key={key} onClick={() => setThemeKey(key)} style={{
                  background: t.bg, border: `1px solid ${themeKey === key ? t.accent : t.border}`,
                  borderRadius: 10, padding: 14, cursor: 'pointer', textAlign: 'left',
                  boxShadow: themeKey === key ? `0 0 12px ${t.accent}66` : 'none',
                }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                    {[t.accent, t.accent2, t.sub, t.bg2].map((c, i) => (
                      <div key={i} style={{ width: 12, height: 12, borderRadius: 2, background: c }} />
                    ))}
                  </div>
                  <div style={{ color: t.text, fontSize: 12, fontFamily: "'Courier New', monospace" }}>{t.name}</div>
                  {themeKey === key && <div style={{ color: t.accent, fontSize: 9, marginTop: 4, letterSpacing: 2 }}>ACTIVE</div>}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ボトムナビ */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: s.bg, borderTop: `1px solid ${s.border}`, display: 'flex' }}>
        {([
          { key: 'home', label: 'HOME', icon: '⬡' },
          { key: 'data', label: 'DATA', icon: '▤' },
          { key: 'calendar', label: 'LOG', icon: '▦' },
          { key: 'title', label: 'RANK', icon: '◈' },
          { key: 'settings', label: 'SYS', icon: '⚙' },
        ] as const).map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            flex: 1, padding: '10px 0', background: 'none', border: 'none',
            color: tab === t.key ? s.accent : s.sub, cursor: 'pointer', fontSize: 9,
            letterSpacing: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            borderTop: tab === t.key ? `2px solid ${s.accent}` : '2px solid transparent',
          }}>
            <span style={{ fontSize: 16 }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}