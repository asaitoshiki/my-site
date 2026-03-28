import { useState, useEffect } from 'react'

const MESSAGES = [
  "今日も一歩前進。積み重ねが大きな変化を生む。",
  "誘惑に勝つたびに、あなたは強くなっている。",
  "今の我慢が、未来の自分への最高の贈り物。",
  "小さな勝利を大切に。それが連鎖を作る。",
  "ここまで来られた自分を褒めてあげよう。",
]

const DEFAULT_HABITS = [
  { id: 1, name: "アルコール", icon: "🍺" },
  { id: 2, name: "SNS・スマホ", icon: "📱" },
  { id: 3, name: "ゲーム", icon: "🎮" },
  { id: 4, name: "甘いもの", icon: "🍰" },
]

export default function Zinyoku() {
  const [startDate] = useState<string>(() => {
    return localStorage.getItem('startDate') || new Date().toISOString()
  })
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits')
    return saved ? JSON.parse(saved) : DEFAULT_HABITS
  })
  const [newHabit, setNewHabit] = useState('')
  const [tab, setTab] = useState<'habits' | 'motivation'>('habits')
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  const streak = Math.floor(
    (Date.now() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
  )

  const addHabit = () => {
    if (!newHabit.trim()) return
    setHabits([...habits, { id: Date.now(), name: newHabit, icon: '🎯' }])
    setNewHabit('')
  }

  const removeHabit = (id: number) => {
    setHabits(habits.filter((h: any) => h.id !== id))
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', fontSize: 22 }}>禁欲トラッカー</h1>

      <div style={{ textAlign: 'center', background: '#f5f5f5', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem' }}>
        <div style={{ fontSize: 56, fontWeight: 500 }}>{streak}</div>
        <div style={{ color: '#888', fontSize: 13 }}>日 継続中</div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
        {(['habits', 'motivation'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #ddd',
              background: tab === t ? '#eee' : 'white', cursor: 'pointer', fontWeight: tab === t ? 500 : 400 }}>
            {t === 'habits' ? '習慣' : '応援'}
          </button>
        ))}
      </div>

      {tab === 'habits' && (
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input value={newHabit} onChange={e => setNewHabit(e.target.value)}
              placeholder="新しい項目を追加..."
              style={{ flex: 1, padding: '8px 10px', borderRadius: 8, border: '1px solid #ddd' }} />
            <button onClick={addHabit}
              style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #ddd', cursor: 'pointer' }}>
              追加
            </button>
          </div>
          {habits.map((h: any) => (
            <div key={h.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px', border: '1px solid #eee', borderRadius: 8, marginBottom: 8 }}>
              <span>{h.icon} {h.name}</span>
              <button onClick={() => removeHabit(h.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa' }}>✕</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'motivation' && (
        <div style={{ background: '#f5f5f5', borderRadius: 12, padding: '1.5rem' }}>
          <p style={{ fontSize: 16, lineHeight: 1.7 }}>{MESSAGES[msgIdx]}</p>
          <button onClick={() => setMsgIdx((msgIdx + 1) % MESSAGES.length)}
            style={{ marginTop: 12, width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', cursor: 'pointer' }}>
            別のメッセージ
          </button>
        </div>
      )}
    </div>
  )
}