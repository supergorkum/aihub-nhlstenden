import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Lagen from './components/Lagen'
import Sporen from './components/Sporen'
import Netwerk from './components/Netwerk'
import Initiatieven from './components/Initiatieven'
import MeldJeIn from './components/MeldJeIn'
import Inspiratie from './components/Inspiratie'
import Footer from './components/Footer'

export default function App() {
  const [berichten, setBerichten] = useState([])

  const voegBerichtToe = (bericht) => {
    setBerichten(prev => [bericht, ...prev])
  }

  return (
    <div className="min-h-screen font-sans">
      <Nav />
      <Hero />
      <Lagen />
      <Sporen />
      <Netwerk />
      <Initiatieven />
      <MeldJeIn onNieuwBericht={voegBerichtToe} />
      <Inspiratie berichten={berichten} />
      <Footer />
    </div>
  )
}
