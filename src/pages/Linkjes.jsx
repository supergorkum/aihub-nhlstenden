import { useState } from 'react'
import { sporen, lagen } from '../data'
import PageHeader from '../components/PageHeader'

const CATEGORIEEN = [
  { id: 'intranet', label: 'Intranet & Organisatie', icon: '🏛️' },
  { id: 'onderwijs', label: 'Onderwijs & Leren', icon: '🎓' },
  { id: 'onderzoek', label: 'Onderzoek & Innovatie', icon: '🔬' },
  { id: 'tools', label: 'Tools & Systemen', icon: '🛠️' },
  { id: 'beleid', label: 'Beleid & Governance', icon: '⚖️' },
  { id: 'extern', label: 'Externe partners', icon: '🌐' },
]

const TREFWOORDEN_SUGGESTIES = ['AI', 'Beleid', 'Onderwijs', 'Studenten', 'Medewerkers', 'Innovatie', 'Data', 'Digitalisering', 'NHL Stenden', 'SURF', 'Geletterdheid', 'Toetsing']

const INIT_LINKJES = [
  { id: 1, titel: 'Intranet NHL Stenden', url: 'https://nhlstenden.sharepoint.com', omschrijving: 'Het centrale intranet van NHL Stenden voor medewerkers.', categorie: 'intranet', spoor: null, laag: null, trefwoorden: ['Intranet', 'Medewerkers', 'NHL Stenden'], toegevoegdDoor: 'Kernteam AI-HUB', datum: 'Juni 2026' },
  { id: 2, titel: 'NHL Stenden AI Beleidspagina', url: 'https://www.nhlstenden.com', omschrijving: 'Het AI-beleid van NHL Stenden voor studenten en medewerkers.', categorie: 'beleid', spoor: 3, laag: 4, trefwoorden: ['Beleid', 'AI', 'Governance'], toegevoegdDoor: 'Kernteam AI-HUB', datum: 'Juni 2026' },
  { id: 3, titel: 'SURF AI-HUB voor onderwijs', url: 'https://www.surf.nl/aihub', omschrijving: 'Veilige toegang tot AI-modellen voor het hoger onderwijs via SURF.', categorie: 'extern', spoor: 3, laag: 3, trefwoorden: ['SURF', 'AI', 'Soevereiniteit'], toegevoegdDoor: 'Kernteam AI-HUB', datum: 'Juni 2026' },
]

function isNHLUrl(url) {
  try {
    const u = new URL(url)
    return u.hostname.endsWith('nhlstenden.com') || u.hostname.endsWith('nhlstenden.nl') || u.hostname.includes('sharepoint.com')
  } catch { return false }
}

export default function Linkjes({ linkjes, setLinkjes }) {
  const [filterCat, setFilterCat] = useState(null)
  const [zoek, setZoek] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [form, setForm] = useState({ titel: '', url: '', omschrijving: '', categorie: '', spoor: '', laag: '', trefwoorden: [], toegevoegdDoor: '' })
  const [trefwoordInput, setTrefwoordInput] = useState('')
  const [fout, setFout] = useState('')
  const [toegevoegd, setToegevoegd] = useState(false)

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const voegToe = () => {
    if (!form.titel || !form.url || !form.categorie) { setFout('Vul naam, URL en categorie in.'); return }
    // Domeincheck - optioneel, waarschuwen maar niet blokkeren
    const nieuw = {
      id: Date.now(), ...form,
      spoor: form.spoor ? parseInt(form.spoor) : null,
      laag: form.laag ? parseInt(form.laag) : null,
      toegevoegdDoor: form.toegevoegdDoor || 'Anoniem',
      datum: new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }),
      nieuw: true,
    }
    setLinkjes(prev => [nieuw, ...prev])
    setToegevoegd(true)
    setFout('')
  }

  const voegTrefwoordToe = (w) => {
    const woord = w.trim()
    if (!woord || form.trefwoorden.includes(woord)) return
    upd('trefwoorden', [...form.trefwoorden, woord])
    setTrefwoordInput('')
  }

  const gefilterd = linkjes.filter(l => {
    if (filterCat && l.categorie !== filterCat) return false
    if (zoek && !l.titel.toLowerCase().includes(zoek.toLowerCase()) && !l.omschrijving?.toLowerCase().includes(zoek.toLowerCase())) return false
    return true
  })

  const catKleur = {
    intranet: 'bg-blue-50 text-blue-700', onderwijs: 'bg-green-50 text-green-700',
    onderzoek: 'bg-purple-50 text-purple-700', tools: 'bg-orange-50 text-orange-700',
    beleid: 'bg-pink-50 text-pink-700', extern: 'bg-teal-50 text-teal-700',
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
          <PageHeader label="NHL Stenden" title="Bronnen & Handige links"
            subtitle="Een overzichtelijke verzameling van relevante links voor medewerkers en studenten rondom AI, onderwijs en organisatie bij NHL Stenden." />
          <button onClick={() => { setAddOpen(true); setToegevoegd(false); setFout(''); setForm({ titel:'',url:'',omschrijving:'',categorie:'',spoor:'',laag:'',trefwoorden:[],toegevoegdDoor:'' }) }}
            className="btn-roze flex-shrink-0 self-start">+ Link toevoegen</button>
        </div>

        {/* Zoek */}
        <input type="text" value={zoek} onChange={e => setZoek(e.target.value)}
          placeholder="Zoek op naam of omschrijving..."
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-nhl-blauw bg-white shadow-sm" />

        {/* Categorie filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setFilterCat(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${!filterCat ? 'bg-nhl-blauw text-white border-nhl-blauw' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
            Alles ({linkjes.length})
          </button>
          {CATEGORIEEN.map(cat => {
            const n = linkjes.filter(l => l.categorie === cat.id).length
            if (!n) return null
            return (
              <button key={cat.id} onClick={() => setFilterCat(filterCat === cat.id ? null : cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filterCat === cat.id ? 'bg-nhl-blauw text-white border-nhl-blauw' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                {cat.icon} {cat.label} ({n})
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gefilterd.map(link => {
            const cat = CATEGORIEEN.find(c => c.id === link.categorie)
            const thema = sporen.find(s => s.id === link.spoor)
            return (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                className="bg-white rounded-2xl border border-gray-200 p-5 card-hover flex flex-col group">
                <div className="flex items-start justify-between mb-3">
                  <div className={`text-xs px-2.5 py-1 rounded-full font-medium ${catKleur[link.categorie] || 'bg-gray-100 text-gray-600'}`}>
                    {cat?.icon} {cat?.label}
                  </div>
                  {link.nieuw && <span className="text-xs bg-nhl-roze/10 text-nhl-roze px-2 py-0.5 rounded-full font-medium">Nieuw</span>}
                </div>
                <div className="font-bold text-nhl-blauw mb-1 group-hover:text-nhl-roze transition-colors leading-snug flex items-center gap-1.5">
                  {link.titel}
                  <span className="text-gray-300 group-hover:text-nhl-roze text-xs">↗</span>
                </div>
                <div className="text-xs text-gray-400 mb-2 truncate">{link.url}</div>
                {link.omschrijving && <p className="text-gray-500 text-sm leading-relaxed mb-3 flex-1">{link.omschrijving}</p>}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {thema && (
                    <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium" style={{ backgroundColor: thema.kleur }}>
                      {thema.icon} {thema.titel}
                    </span>
                  )}
                  {link.laag && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Laag {link.laag}</span>}
                  {(link.trefwoorden || []).slice(0, 2).map(t => (
                    <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>
                  ))}
                </div>
              </a>
            )
          })}
        </div>

        {gefilterd.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🔗</div>
            <div>Geen linkjes gevonden.</div>
          </div>
        )}
      </div>

      {/* Modal */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="font-bold text-nhl-blauw text-lg">Link toevoegen</h2>
              <button onClick={() => setAddOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
            </div>

            {toegevoegd ? (
              <div className="p-8 text-center">
                <div className="text-5xl mb-4">🔗</div>
                <h3 className="font-bold text-nhl-blauw text-xl mb-2">Link toegevoegd!</h3>
                <p className="text-gray-600 text-sm mb-6">De link is direct zichtbaar in het overzicht.</p>
                <button onClick={() => setAddOpen(false)} className="btn-primary">Sluiten</button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Naam van de link <span className="text-red-400">*</span></label>
                  <input type="text" value={form.titel} onChange={e => upd('titel', e.target.value)}
                    placeholder="Bijv. NHL Stenden Intranet"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">URL <span className="text-red-400">*</span></label>
                  <input type="url" value={form.url} onChange={e => upd('url', e.target.value)}
                    placeholder="https://www.nhlstenden.com/..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                  {form.url && !isNHLUrl(form.url) && (
                    <div className="mt-1.5 text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">
                      💡 Tip: dit is geen NHL Stenden domein. Dat mag, maar check of de link relevant is voor de organisatie.
                    </div>
                  )}
                  {form.url && isNHLUrl(form.url) && (
                    <div className="mt-1.5 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                      ✓ NHL Stenden domein herkend
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Korte omschrijving</label>
                  <textarea value={form.omschrijving} onChange={e => upd('omschrijving', e.target.value)} rows={2}
                    placeholder="Wat vind je op deze pagina?"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Categorie <span className="text-red-400">*</span></label>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIEEN.map(cat => (
                      <button key={cat.id} onClick={() => upd('categorie', cat.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs border-2 transition-colors ${form.categorie === cat.id ? 'border-nhl-blauw bg-blue-50 text-nhl-blauw font-semibold' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                        <span>{cat.icon}</span><span>{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Gerelateerd thema</label>
                    <select value={form.spoor} onChange={e => upd('spoor', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw">
                      <option value="">Kies...</option>
                      {sporen.map(s => <option key={s.id} value={s.id}>{s.icon} {s.titel}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Gerelateerde laag</label>
                    <select value={form.laag} onChange={e => upd('laag', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw">
                      <option value="">Kies...</option>
                      {lagen.map(l => <option key={l.nr} value={l.nr}>Laag {l.nr}: {l.naam}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Trefwoorden</label>
                  <div className="flex gap-2 mb-2">
                    <input type="text" value={trefwoordInput} onChange={e => setTrefwoordInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); voegTrefwoordToe(trefwoordInput) } }}
                      placeholder="Trefwoord + Enter"
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                    <button onClick={() => voegTrefwoordToe(trefwoordInput)} className="px-3 py-2 bg-nhl-blauw text-white rounded-lg text-xs font-medium">+</button>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {TREFWOORDEN_SUGGESTIES.filter(s => !form.trefwoorden.includes(s)).slice(0, 8).map(s => (
                      <button key={s} onClick={() => voegTrefwoordToe(s)}
                        className="px-2 py-0.5 text-xs border border-gray-200 text-gray-500 hover:border-nhl-blauw hover:text-nhl-blauw rounded-full bg-white transition-colors">
                        + {s}
                      </button>
                    ))}
                  </div>
                  {form.trefwoorden.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {form.trefwoorden.map(w => (
                        <span key={w} className="inline-flex items-center gap-1 bg-nhl-blauw text-white px-2 py-0.5 rounded-full text-xs">
                          {w} <button onClick={() => upd('trefwoorden', form.trefwoorden.filter(t => t !== w))} className="hover:text-red-200">✕</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Toegevoegd door (optioneel)</label>
                  <input type="text" value={form.toegevoegdDoor} onChange={e => upd('toegevoegdDoor', e.target.value)}
                    placeholder="Jouw naam of afdeling"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                </div>
                {fout && <div className="text-red-500 text-xs bg-red-50 p-3 rounded-lg">{fout}</div>}
                <button onClick={voegToe} className="btn-roze w-full">Link toevoegen →</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
