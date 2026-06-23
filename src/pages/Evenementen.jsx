import GradientHeader from '../components/GradientHeader'
import { useState } from 'react'
import { sporen } from '../data'
import PageHeader from '../components/PageHeader'

function formatDatum(datum) {
  if (!datum) return ''
  return new Date(datum).toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

function formatTijd(datum, tijd) {
  if (!datum || !tijd) return ''
  return new Date(`${datum}T${tijd}`).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
}

function maakICS(event) {
  const start = new Date(`${event.datum}T${event.startTijd}:00`)
  const eind = new Date(`${event.datum}T${event.eindTijd}:00`)

  const pad = n => String(n).padStart(2, '0')
  const fmt = d => `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AI-HUB NHL Stenden//NL',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART;TZID=Europe/Amsterdam:${fmt(start)}`,
    `DTEND;TZID=Europe/Amsterdam:${fmt(eind)}`,
    `SUMMARY:${event.naam}`,
    `LOCATION:${event.locatie}`,
    `DESCRIPTION:${event.omschrijving}\\nGeorganiseerd door: ${event.organisator || 'NHL Stenden AI-HUB'}\\nMeer info: https://aihub-nhlstenden.netlify.app`,
    `STATUS:CONFIRMED`,
    `BEGIN:VALARM`,
    `TRIGGER:-PT30M`,
    `ACTION:DISPLAY`,
    `DESCRIPTION:Herinnering: ${event.naam}`,
    `END:VALARM`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${event.naam.replace(/\s+/g, '-')}.ics`
  a.click()
  URL.revokeObjectURL(url)
}

const VOORBEELD = [
  {
    id: 1,
    naam: 'AI-HUB Kick-off Bijeenkomst',
    locatie: 'NHL Stenden Leeuwarden, Rengerslaan 8',
    datum: '2026-09-10',
    startTijd: '13:00',
    eindTijd: '16:00',
    omschrijving: 'Officiële lancering van de AI-HUB. Kennismaking met het kernteam, presentatie van de plannen en netwerken.',
    organisator: 'Kernteam AI-HUB',
    sporen: [1, 2, 3, 4],
    kleur: '#1E3A8A',
  },
  {
    id: 2,
    naam: 'SURF Denktank Bijeenkomst AI in Onderwijs',
    locatie: 'SURF Utrecht, Kantoorlocatie',
    datum: '2026-09-24',
    startTijd: '10:00',
    eindTijd: '15:00',
    omschrijving: 'Strategische sessie over de koers van AI in het Nederlandse hoger onderwijs. NHL Stenden levert actief input.',
    organisator: 'SURF',
    sporen: [1, 3],
    kleur: '#065F46',
  },
  {
    id: 3,
    naam: 'Workshop AI-Geletterdheid voor Docenten',
    locatie: 'NHL Stenden Leeuwarden, Lokaal B2.04',
    datum: '2026-10-07',
    startTijd: '09:00',
    eindTijd: '12:00',
    omschrijving: 'Praktische workshop over AI-geletterdheid voor docenten. Onderdeel van de BDB-verrijking met AI-componenten.',
    organisator: 'OO&I',
    sporen: [4],
    kleur: '#7C3AED',
  },
]

const MAANDEN = ['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec']

export default function Evenementen({ evenementen, setEvenementen }) {
  const [addOpen, setAddOpen] = useState(false)
  const [filterSpoor, setFilterSpoor] = useState(null)
  const [form, setForm] = useState({
    naam: '', locatie: '', datum: '', startTijd: '09:00', eindTijd: '12:00',
    omschrijving: '', organisator: '', sporen: [],
  })
  const [fout, setFout] = useState('')
  const [toegevoegd, setToegevoegd] = useState(false)

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const toggleSpoor = (id) => setForm(f => ({
    ...f,
    sporen: f.sporen.includes(id) ? f.sporen.filter(s => s !== id) : [...f.sporen, id]
  }))

  const voegToe = () => {
    if (!form.naam || !form.locatie || !form.datum || !form.startTijd || !form.eindTijd) {
      setFout('Vul alle verplichte velden in.'); return
    }
    const kleurSpoor = sporen.find(s => s.id === form.sporen[0])?.kleur || '#1E3A8A'
    setEvenementen(prev => [...prev, { id: Date.now(), ...form, kleur: kleurSpoor }]
      .sort((a, b) => new Date(a.datum) - new Date(b.datum)))
    setToegevoegd(true)
    setFout('')
  }

  const gefilterd = filterSpoor
    ? evenementen.filter(e => e.sporen?.includes(filterSpoor))
    : evenementen

  const toekomstig = gefilterd.filter(e => new Date(`${e.datum}T${e.eindTijd}`) >= new Date())
  const verleden = gefilterd.filter(e => new Date(`${e.datum}T${e.eindTijd}`) < new Date())

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <GradientHeader label="Agenda" title="Evenementen" subtitle="Bijeenkomsten, workshops en conferenties rond AI bij NHL Stenden en partners.">
        <div className="mt-5">
          <button
            onClick={() => setAddOpen(true)}
            className="inline-flex items-center gap-2 bg-nhl-roze hover:bg-nhl-roze-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
          >
            + Evenement toevoegen
          </button>
        </div>
      </GradientHeader>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Thema filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setFilterSpoor(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${!filterSpoor ? 'bg-nhl-blauw text-white border-nhl-blauw' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
            Alle thema's
          </button>
          {sporen.map(s => (
            <button key={s.id} onClick={() => setFilterSpoor(filterSpoor === s.id ? null : s.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${filterSpoor === s.id ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
              style={filterSpoor === s.id ? { backgroundColor: s.kleur } : {}}>
              {s.icon} {s.titel}
            </button>
          ))}
        </div>

        {/* Evenementen grid */}
        {toekomstig.length > 0 && (
          <div className="mb-12">
            <h2 className="font-bold text-nhl-blauw text-lg mb-4">Aankomende evenementen</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {toekomstig.map(ev => {
                const d = new Date(ev.datum)
                return (
                  <div key={ev.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden card-hover">
                    {/* Kleur accent + datum */}
                    <div className="flex items-stretch">
                      <div className="w-16 flex flex-col items-center justify-center py-4 text-white flex-shrink-0" style={{ backgroundColor: ev.kleur }}>
                        <div className="text-2xl font-extrabold leading-none">{d.getDate()}</div>
                        <div className="text-xs font-medium mt-0.5">{MAANDEN[d.getMonth()]}</div>
                        <div className="text-xs opacity-70">{d.getFullYear()}</div>
                      </div>
                      <div className="flex-1 p-4">
                        <div className="font-bold text-nhl-blauw text-sm leading-snug mb-1">{ev.naam}</div>
                        <div className="text-xs text-gray-500 mb-1">🕐 {ev.startTijd} – {ev.eindTijd}</div>
                        <div className="text-xs text-gray-500 mb-3">📍 {ev.locatie}</div>
                        <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">{ev.omschrijving}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {(ev.sporen || []).map(sid => {
                            const s = sporen.find(sp => sp.id === sid)
                            return s ? (
                              <span key={sid} className="text-xs px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: s.kleur }}>
                                {s.icon}
                              </span>
                            ) : null
                          })}
                        </div>
                        <button
                          onClick={() => maakICS(ev)}
                          className="w-full text-xs bg-nhl-blauw hover:bg-nhl-blauw-dark text-white py-1.5 rounded-lg font-medium transition-colors"
                        >
                          📅 Toevoegen aan agenda
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {toekomstig.length === 0 && (
          <div className="text-center py-12 text-gray-400 mb-8">
            <div className="text-4xl mb-3">📅</div>
            <div className="font-medium">Geen aankomende evenementen</div>
            <p className="text-sm mt-1">Ken jij een relevant evenement? Voeg het toe!</p>
          </div>
        )}

        {/* Verleden */}
        {verleden.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-400 text-sm mb-3 uppercase tracking-wider">Eerder plaatsgevonden</h2>
            <div className="space-y-2">
              {verleden.map(ev => (
                <div key={ev.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 opacity-60">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: ev.kleur }}>
                    {new Date(ev.datum).getDate()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-600 text-sm">{ev.naam}</div>
                    <div className="text-xs text-gray-400">{formatDatum(ev.datum)} · {ev.locatie}</div>
                  </div>
                  <button onClick={() => maakICS(ev)} className="text-xs text-gray-400 hover:text-gray-600 flex-shrink-0">📅</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Evenement toevoegen modal */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="font-bold text-nhl-blauw text-lg">Evenement toevoegen</h2>
              <button onClick={() => setAddOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            {toegevoegd ? (
              <div className="p-8 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-bold text-nhl-blauw text-xl mb-2">Evenement toegevoegd!</h3>
                <p className="text-gray-600 text-sm mb-6">Het evenement is zichtbaar in de agenda en kan worden gedownload als agenda-afspraak.</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={() => { setAddOpen(false); setForm({ naam:'',locatie:'',datum:'',startTijd:'09:00',eindTijd:'12:00',omschrijving:'',organisator:'',sporen:[] }) }} className="btn-primary">Sluiten</button>
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Naam evenement <span className="text-red-400">*</span></label>
                  <input value={form.naam} onChange={e => upd('naam', e.target.value)}
                    placeholder="Bijv. Workshop AI & Toetsing"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Datum <span className="text-red-400">*</span></label>
                    <input type="date" value={form.datum} onChange={e => upd('datum', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Organisator</label>
                    <input value={form.organisator} onChange={e => upd('organisator', e.target.value)}
                      placeholder="Bijv. OO&I"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Starttijd <span className="text-red-400">*</span></label>
                    <input type="time" value={form.startTijd} onChange={e => upd('startTijd', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Eindtijd <span className="text-red-400">*</span></label>
                    <input type="time" value={form.eindTijd} onChange={e => upd('eindTijd', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Locatie <span className="text-red-400">*</span></label>
                  <input value={form.locatie} onChange={e => upd('locatie', e.target.value)}
                    placeholder="Bijv. NHL Stenden Leeuwarden, Rengerslaan 8"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Omschrijving</label>
                  <textarea value={form.omschrijving} onChange={e => upd('omschrijving', e.target.value)} rows={3}
                    placeholder="Wat is het doel van dit evenement?"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gerelateerde thema's</label>
                  <div className="grid grid-cols-2 gap-2">
                    {sporen.map(s => (
                      <button key={s.id} onClick={() => toggleSpoor(s.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs border-2 transition-colors ${form.sporen.includes(s.id) ? 'border-transparent text-white' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}
                        style={form.sporen.includes(s.id) ? { backgroundColor: s.kleur } : {}}>
                        <span>{s.icon}</span><span className="font-medium">{s.titel}</span>
                      </button>
                    ))}
                  </div>
                </div>
                {fout && <div className="text-red-500 text-xs">{fout}</div>}
                <button onClick={voegToe} className="btn-roze w-full">Evenement toevoegen →</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
