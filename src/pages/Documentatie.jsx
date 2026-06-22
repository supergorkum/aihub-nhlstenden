import { useState } from 'react'
import PageHeader from '../components/PageHeader'

const CATEGORIEEN = [
  { id: 'strategie', label: 'Strategie & Beleid', icon: '🧭', kleur: '#1E3A8A' },
  { id: 'onderwijs', label: 'Onderwijs & Didactiek', icon: '🎓', kleur: '#0F766E' },
  { id: 'techniek', label: 'Techniek & Infrastructuur', icon: '⚙️', kleur: '#7C3AED' },
  { id: 'governance', label: 'Governance & Compliance', icon: '⚖️', kleur: '#E91E8C' },
  { id: 'inspiratie', label: 'Inspiratie & Onderzoek', icon: '💡', kleur: '#D97706' },
  { id: 'overig', label: 'Overig', icon: '📁', kleur: '#64748B' },
]

const SPOREN_OPTIES = ['AI & Onderwijs', 'AI & Organisatie', 'AI & Verantwoordelijkheid', 'AI-Geletterdheid', 'Overkoepelend']

const VOORBEELDDOCS = [
  { id: 1, titel: 'AI Kompas NHL Stenden', categorie: 'strategie', spoor: 'Overkoepelend', type: 'pdf', datum: 'Juni 2026', omschrijving: 'Strategisch overzicht van de AI-architectuur en vijf lagen model.', icon: '📄' },
  { id: 2, titel: 'AI-HUB Fundament v1.2', categorie: 'strategie', spoor: 'Overkoepelend', type: 'pdf', datum: 'Juni 2026', omschrijving: 'Fundament document met opzet, sporen en netwerkorganisatie.', icon: '📄' },
  { id: 3, titel: 'Blueprint AI-HUB presentatie', categorie: 'strategie', spoor: 'Overkoepelend', type: 'pptx', datum: 'Juni 2026', omschrijving: 'Visuele presentatie van de architectuur en werking van de AI-HUB.', icon: '📊' },
]

const typeKleur = {
  pdf:  'bg-red-50 text-red-600',
  pptx: 'bg-orange-50 text-orange-600',
  docx: 'bg-blue-50 text-blue-600',
  png:  'bg-purple-50 text-purple-600',
  jpg:  'bg-green-50 text-green-600',
  overig: 'bg-gray-100 text-gray-600',
}

export default function Documentatie({ docs, setDocs }) {
  const [filterCat, setFilterCat] = useState(null)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [uploadStap, setUploadStap] = useState(0)
  const [bestand, setBestand] = useState(null)
  const [uploadForm, setUploadForm] = useState({ titel: '', categorie: '', spoor: '', omschrijving: '' })
  const [fout, setFout] = useState('')

  const gefilterd = filterCat ? docs.filter(d => d.categorie === filterCat) : docs

  const handleBestand = (file) => {
    if (!file) return
    if (file.size > 50 * 1024 * 1024) { setFout('Bestand mag maximaal 50 MB zijn.'); return }
    setFout('')
    setBestand(file)
    const ext = file.name.split('.').pop().toLowerCase()
    setUploadForm(f => ({ ...f, titel: file.name.replace(`.${ext}`, '') }))
  }

  const verstuurUpload = () => {
    if (!bestand || !uploadForm.titel || !uploadForm.categorie) return
    const ext = bestand.name.split('.').pop().toLowerCase()
    const icon = ext === 'pdf' ? '📄' : ['png','jpg','jpeg'].includes(ext) ? '🖼️' : ext === 'pptx' ? '📊' : '📝'
    setDocs(prev => [{
      id: Date.now(),
      ...uploadForm,
      type: ext,
      datum: new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }),
      icon,
      nieuw: true,
    }, ...prev])
    setUploadOpen(false)
    setUploadStap(0)
    setBestand(null)
    setUploadForm({ titel: '', categorie: '', spoor: '', omschrijving: '' })
  }

  const kanVersturen = bestand && uploadForm.titel && uploadForm.categorie

  return (
    <div className="min-h-screen pt-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
          <PageHeader label="Kennis & materiaal" title="Documentatie" subtitle="Presentaties, rapporten, beleidsdocumenten en andere materialen over AI bij NHL Stenden." />
          <button onClick={() => setUploadOpen(true)} className="btn-roze flex-shrink-0 self-start">
            + Document uploaden
          </button>
        </div>

        {/* Categorie filter */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
          <button
            onClick={() => setFilterCat(null)}
            className={`rounded-xl p-3 text-center border-2 transition-colors ${!filterCat ? 'border-nhl-blauw bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
          >
            <div className="text-xl mb-1">📚</div>
            <div className="text-xs font-medium text-gray-700">Alles</div>
            <div className="text-xs text-gray-400">{docs.length}</div>
          </button>
          {CATEGORIEEN.map(cat => {
            const n = docs.filter(d => d.categorie === cat.id).length
            return (
              <button key={cat.id} onClick={() => setFilterCat(filterCat === cat.id ? null : cat.id)}
                className={`rounded-xl p-3 text-center border-2 transition-colors ${filterCat === cat.id ? 'border-transparent text-white' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                style={filterCat === cat.id ? { backgroundColor: cat.kleur } : {}}>
                <div className="text-xl mb-1">{cat.icon}</div>
                <div className={`text-xs font-medium ${filterCat === cat.id ? 'text-white' : 'text-gray-700'}`}>{cat.label}</div>
                <div className={`text-xs ${filterCat === cat.id ? 'text-white/70' : 'text-gray-400'}`}>{n}</div>
              </button>
            )
          })}
        </div>

        {/* Document grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gefilterd.map(doc => {
            const cat = CATEGORIEEN.find(c => c.id === doc.categorie)
            return (
              <div key={doc.id} className="card card-hover p-5 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{doc.icon}</div>
                  <div className="flex gap-2">
                    {doc.nieuw && <span className="text-xs bg-nhl-roze/10 text-nhl-roze px-2 py-0.5 rounded-full font-medium">Nieuw</span>}
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${typeKleur[doc.type] || typeKleur.overig}`}>{doc.type?.toUpperCase()}</span>
                  </div>
                </div>
                <div className="font-bold text-nhl-blauw mb-1 leading-snug">{doc.titel}</div>
                {doc.omschrijving && <p className="text-gray-500 text-sm leading-relaxed mb-3 flex-1">{doc.omschrijving}</p>}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100 mt-auto">
                  {cat && (
                    <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium" style={{ backgroundColor: cat.kleur }}>
                      {cat.icon} {cat.label}
                    </span>
                  )}
                  {doc.spoor && <span className="text-xs text-gray-400">· {doc.spoor}</span>}
                  <span className="text-xs text-gray-400 ml-auto">{doc.datum}</span>
                </div>
              </div>
            )
          })}
        </div>

        {gefilterd.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">📁</div>
            <div className="font-medium">Geen documenten in deze categorie.</div>
          </div>
        )}
      </div>

      {/* Upload modal */}
      {uploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-bold text-nhl-blauw text-lg">Document uploaden</h2>
              <button onClick={() => { setUploadOpen(false); setUploadStap(0); setBestand(null) }} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            <div className="p-6 space-y-4">
              {/* Stap 1: bestand */}
              {uploadStap === 0 && (
                <div>
                  <div
                    onClick={() => document.getElementById('doc-upload').click()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => { e.preventDefault(); handleBestand(e.dataTransfer.files[0]) }}
                    className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-nhl-blauw hover:bg-blue-50 transition-colors"
                  >
                    {bestand ? (
                      <div>
                        <div className="text-4xl mb-2">{bestand.type.includes('pdf') ? '📄' : bestand.type.includes('image') ? '🖼️' : '📝'}</div>
                        <div className="font-medium text-nhl-blauw">{bestand.name}</div>
                        <div className="text-xs text-gray-400 mt-1">{(bestand.size / 1024).toFixed(0)} KB</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-4xl mb-3">📤</div>
                        <div className="font-medium text-gray-700 mb-1">Klik of sleep een bestand hierheen</div>
                        <div className="text-sm text-gray-400">PDF, Word, PowerPoint, PNG of JPEG · max 50 MB</div>
                      </div>
                    )}
                  </div>
                  <input id="doc-upload" type="file" className="hidden" accept=".pdf,.doc,.docx,.pptx,.png,.jpg,.jpeg" onChange={e => handleBestand(e.target.files[0])} />
                  {fout && <div className="text-red-500 text-xs mt-2">{fout}</div>}
                  {bestand && (
                    <button onClick={() => setUploadStap(1)} className="btn-primary w-full mt-4">Volgende: Rubriceren →</button>
                  )}
                </div>
              )}

              {/* Stap 2: rubricering */}
              {uploadStap === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Titel <span className="text-red-400">*</span></label>
                    <input type="text" value={uploadForm.titel} onChange={e => setUploadForm(f => ({ ...f, titel: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Categorie <span className="text-red-400">*</span></label>
                    <div className="grid grid-cols-2 gap-2">
                      {CATEGORIEEN.map(cat => (
                        <button key={cat.id} onClick={() => setUploadForm(f => ({ ...f, categorie: cat.id }))}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm border-2 transition-colors ${uploadForm.categorie === cat.id ? 'border-transparent text-white' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}
                          style={uploadForm.categorie === cat.id ? { backgroundColor: cat.kleur } : {}}>
                          <span>{cat.icon}</span><span className="font-medium text-xs">{cat.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Gerelateerd spoor</label>
                    <select value={uploadForm.spoor} onChange={e => setUploadForm(f => ({ ...f, spoor: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw">
                      <option value="">Kies een spoor...</option>
                      {SPOREN_OPTIES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Korte omschrijving</label>
                    <textarea value={uploadForm.omschrijving} onChange={e => setUploadForm(f => ({ ...f, omschrijving: e.target.value }))} rows={3}
                      placeholder="Waar gaat dit document over?"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw resize-none" />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setUploadStap(0)} className="btn-ghost flex-1">← Terug</button>
                    <button onClick={verstuurUpload} disabled={!kanVersturen}
                      className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-colors ${kanVersturen ? 'bg-nhl-roze text-white hover:bg-nhl-roze-dark' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}>
                      Document toevoegen ✓
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
