import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Start from './pages/Start'
import Sporen from './pages/Sporen'
import Netwerk from './pages/Netwerk'
import Initiatieven from './pages/Initiatieven'
import Documentatie from './pages/Documentatie'
import Meld from './pages/Meld'
import Inspiratie from './pages/Inspiratie'
import Beheer from './pages/Beheer'
import Over from './pages/Over'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppInner() {
  const [berichten, setBerichten] = useState([])
  const [extraInitiatieven, setExtraInitiatieven] = useState([])

  const voegBerichtToe = (b) => setBerichten(prev => [b, ...prev])

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <ScrollToTop />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/over" element={<Over />} />
          <Route path="/sporen" element={<Sporen />} />
          <Route path="/netwerk" element={<Netwerk />} />
          <Route path="/initiatieven" element={<Initiatieven />} />
          <Route path="/documentatie" element={<Documentatie />} />
          <Route path="/meld" element={<Meld onNieuwBericht={voegBerichtToe} />} />
          <Route path="/inspiratie" element={<Inspiratie berichten={berichten} />} />
          <Route path="/beheer" element={<Beheer berichten={berichten} setBerichten={setBerichten} extraInitiatieven={extraInitiatieven} setExtraInitiatieven={setExtraInitiatieven} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return <BrowserRouter><AppInner /></BrowserRouter>
}
