import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Start from './pages/Start'
import Themas from './pages/Themas'
import Fundament from './pages/Fundament'
import Netwerk from './pages/Netwerk'
import Initiatieven from './pages/Initiatieven'
import Pilots from './pages/Pilots'
import Documentatie from './pages/Documentatie'
import Video from './pages/Video'
import Evenementen from './pages/Evenementen'
import Linkjes from './pages/Linkjes'
import Meld from './pages/Meld'
import Inspiratie from './pages/Inspiratie'
import Over from './pages/Over'
import Beheer from './pages/Beheer'
import Geletterdheid from './pages/Geletterdheid'
import Beleid from './pages/Beleid'
import {
  INIT_VIDEOS, INIT_PILOTS, INIT_DOCS,
  INIT_EVENEMENTEN, INIT_LINKJES, INIT_INSPIRATIES
} from './initialData'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppInner() {
  const [berichten, setBerichten] = useState([])
  const [videos, setVideos] = useState(INIT_VIDEOS)
  const [actiefVideoId, setActiefVideoId] = useState(null)
  const [pilots, setPilots] = useState(INIT_PILOTS)
  const [docs, setDocs] = useState(INIT_DOCS)
  const [evenementen, setEvenementen] = useState(INIT_EVENEMENTEN)
  const [linkjes, setLinkjes] = useState(INIT_LINKJES)
  const [inspiraties, setInspiraties] = useState(INIT_INSPIRATIES)

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <ScrollToTop />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            <Start
              videos={videos}
              pilots={pilots}
              evenementen={evenementen}
            />
          } />
          <Route path="/themas" element={<Themas />} />
          <Route path="/fundament" element={<Fundament />} />
          <Route path="/netwerk" element={<Netwerk />} />
          <Route path="/initiatieven" element={<Initiatieven />} />
          <Route path="/pilots" element={
            <Pilots pilots={pilots} setPilots={setPilots} />
          } />
          <Route path="/documentatie" element={
            <Documentatie docs={docs} setDocs={setDocs} />
          } />
          <Route path="/video" element={
            <Video videos={videos} setVideos={setVideos} actiefVideoId={actiefVideoId} setActiefVideoId={setActiefVideoId} />
          } />
          <Route path="/evenementen" element={
            <Evenementen evenementen={evenementen} setEvenementen={setEvenementen} />
          } />
          <Route path="/linkjes" element={
            <Linkjes linkjes={linkjes} setLinkjes={setLinkjes} />
          } />
          <Route path="/meld" element={
            <Meld onNieuwBericht={(b) => setBerichten(prev => [b, ...prev])} />
          } />
          <Route path="/inspiratie" element={
            <Inspiratie inspiraties={inspiraties} setInspiraties={setInspiraties} />
          } />
          <Route path="/over" element={<Over />} />
          <Route path="/geletterdheid" element={<Geletterdheid />} />
          <Route path="/beleid" element={<Beleid docs={docs} />} />
          <Route path="/beheer" element={
            <Beheer
              berichten={berichten} setBerichten={setBerichten}
              videos={videos} setVideos={setVideos}
              actiefVideoId={actiefVideoId} setActiefVideoId={setActiefVideoId}
              pilots={pilots} setPilots={setPilots}
              docs={docs} setDocs={setDocs}
              inspiraties={inspiraties} setInspiraties={setInspiraties}
            />
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return <BrowserRouter><AppInner /></BrowserRouter>
}
