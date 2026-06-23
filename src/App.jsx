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

const INIT_ROADMAP = [
  {
    id: 1, titel: 'AI-geletterdheid basistraining voor alle medewerkers',
    omschrijving: 'Verplichte introductiecursus AI voor alle NHL Stenden medewerkers en docenten. Wat is AI, hoe werkt het, wat mag wel en niet?',
    status: 'lopend', prioriteit: 'hoog', verantwoordelijke: 'HR & OO&I',
    aiActKoppeling: 'aa1', datum: 'Q3 2026', toegevoegdDoor: 'Kernteam AI-HUB',
    pendingAfgerond: false, pendingReopen: false,
  },
  {
    id: 2, titel: 'Inventarisatie hoog-risico AI-systemen',
    omschrijving: 'Welke AI-systemen die we gebruiken vallen onder de "hoog-risico" categorie van de AI Act? ProctorExam en mogelijke profileringssystemen als eerste te onderzoeken.',
    status: 'te-starten', prioriteit: 'hoog', verantwoordelijke: 'AI Compliance Groep',
    aiActKoppeling: 'aa2', datum: 'Q4 2026', toegevoegdDoor: 'Kernteam AI-HUB',
    pendingAfgerond: false, pendingReopen: false,
  },
  {
    id: 3, titel: 'Beleidskader generatieve AI voor studenten',
    omschrijving: 'Helder beleid over wat studenten wel en niet mogen met AI bij opdrachten en toetsing. Inclusief transparantieverplichting conform AI Act art. 50.',
    status: 'te-starten', prioriteit: 'hoog', verantwoordelijke: 'OO&I',
    aiActKoppeling: 'aa4', datum: 'Q3 2026', toegevoegdDoor: 'Kernteam AI-HUB',
    pendingAfgerond: false, pendingReopen: false,
  },
  {
    id: 4, titel: 'AI-desk operationeel',
    omschrijving: 'Centraal loket voor medewerkers die AI willen inzetten. Toetst of het systeem veilig, AVG-compliant en AI Act-conform is voordat breed gebruik wordt toegestaan.',
    status: 'in-ontwikkeling', prioriteit: 'hoog', verantwoordelijke: 'Prog. Digitale Transitie',
    aiActKoppeling: 'aa5', datum: 'Q4 2026', toegevoegdDoor: 'Kernteam AI-HUB',
    pendingAfgerond: false, pendingReopen: false,
  },
  {
    id: 5, titel: 'Toetsen menselijk toezicht ProctorExam',
    omschrijving: 'Nagaan of onze inzet van ProctorExam voldoet aan de AI Act-eisen voor menselijk toezicht, transparantie naar studenten en dataminimalisatie.',
    status: 'te-starten', prioriteit: 'hoog', verantwoordelijke: 'DLWO & Academies',
    aiActKoppeling: 'aa3', datum: 'Q1 2027', toegevoegdDoor: 'AI Compliance Groep',
    pendingAfgerond: false, pendingReopen: false,
  },
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppInner() {
  const [berichten, setBerichten] = useState(() => {
    try {
      const opgeslagen = localStorage.getItem('aihub-berichten')
      return opgeslagen ? JSON.parse(opgeslagen) : []
    } catch { return [] }
  })

  // Berichten automatisch opslaan bij wijziging
  const setBerichten_ = (fn) => {
    setBerichten(prev => {
      const nieuw = typeof fn === 'function' ? fn(prev) : fn
      try { localStorage.setItem('aihub-berichten', JSON.stringify(nieuw)) } catch {}
      return nieuw
    })
  }
  const [videos, setVideos] = useState(() => {
    try {
      const opgeslagen = localStorage.getItem('aihub-videos')
      return opgeslagen ? JSON.parse(opgeslagen) : INIT_VIDEOS
    } catch { return INIT_VIDEOS }
  })
  const [actiefVideoId, setActiefVideoId] = useState(null)

  const setVideos_ = (fn) => {
    setVideos(prev => {
      const nieuw = typeof fn === 'function' ? fn(prev) : fn
      try { localStorage.setItem('aihub-videos', JSON.stringify(nieuw)) } catch {}
      return nieuw
    })
  }
  const [pilots, setPilots] = useState(INIT_PILOTS)
  const [docs, setDocs] = useState(INIT_DOCS)
  const [evenementen, setEvenementen] = useState(INIT_EVENEMENTEN)
  const [linkjes, setLinkjes] = useState(INIT_LINKJES)
  const [inspiraties, setInspiraties] = useState(INIT_INSPIRATIES)
  const [roadmap, setRoadmap] = useState(INIT_ROADMAP)

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <ScrollToTop />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Start videos={videos} pilots={pilots} evenementen={evenementen} />} />
          <Route path="/themas" element={<Themas />} />
          <Route path="/fundament" element={<Fundament />} />
          <Route path="/netwerk" element={<Netwerk />} />
          <Route path="/initiatieven" element={<Initiatieven roadmap={roadmap} setRoadmap={setRoadmap} />} />
          <Route path="/pilots" element={<Pilots pilots={pilots} setPilots={setPilots} />} />
          <Route path="/documentatie" element={<Documentatie docs={docs} setDocs={setDocs} />} />
          <Route path="/video" element={<Video videos={videos} setVideos={setVideos_} actiefVideoId={actiefVideoId} setActiefVideoId={setActiefVideoId} />} />
          <Route path="/evenementen" element={<Evenementen evenementen={evenementen} setEvenementen={setEvenementen} />} />
          <Route path="/linkjes" element={<Linkjes linkjes={linkjes} setLinkjes={setLinkjes} />} />
          <Route path="/meld" element={<Meld onNieuwBericht={(b) => setBerichten_(prev => [b, ...prev])} berichten={berichten} />} />
          <Route path="/inspiratie" element={<Inspiratie inspiraties={inspiraties} setInspiraties={setInspiraties} />} />
          <Route path="/over" element={<Over />} />
          <Route path="/geletterdheid" element={<Geletterdheid />} />
          <Route path="/beleid" element={<Beleid />} />
          <Route path="/beheer" element={
            <Beheer
              berichten={berichten} setBerichten={setBerichten_}
              videos={videos} setVideos={setVideos_}
              actiefVideoId={actiefVideoId} setActiefVideoId={setActiefVideoId}
              pilots={pilots} setPilots={setPilots}
              docs={docs} setDocs={setDocs}
              inspiraties={inspiraties} setInspiraties={setInspiraties}
              roadmap={roadmap} setRoadmap={setRoadmap}
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
