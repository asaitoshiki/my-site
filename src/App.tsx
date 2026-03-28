import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Zinyoku from './Zinyoku'

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>私のサイト</h1>
      <p>ここに自己紹介や説明が入ります。</p>
      <Link to="/apps/zinyoku">禁欲アプリを使う →</Link>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apps/zinyoku" element={<Zinyoku />} />
      </Routes>
    </BrowserRouter>
  )
}