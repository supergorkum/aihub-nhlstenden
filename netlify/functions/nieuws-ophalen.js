// Netlify Function — ESM module
// Haalt RSS feeds op en filtert met Claude op relevantie voor NHL Stenden

const RSS_FEEDS = [
  { naam: 'The Gradient',         url: 'https://thegradient.pub/rss/',                      label: 'The Gradient',    icon: '📊' },
  { naam: '80,000 Hours',         url: 'https://80000hours.org/feed/',                       label: '80,000 Hours',    icon: '💡' },
  { naam: 'Import AI',            url: 'https://importai.substack.com/feed',                 label: 'Import AI',       icon: '🤖' },
  { naam: 'Future of Life',       url: 'https://futureoflife.org/feed/',                     label: 'Future of Life',  icon: '🌍' },
  { naam: 'VentureBeat AI',       url: 'https://venturebeat.com/category/ai/feed/',          label: 'VentureBeat',     icon: '🚀' },
  { naam: 'AI Alignment Forum',   url: 'https://www.alignmentforum.org/feed.xml',            label: 'Alignment Forum', icon: '⚖️' },
]

function parseRSS(xml) {
  const items = []
  const patterns = [/<item>([\s\S]*?)<\/item>/g, /<entry>([\s\S]*?)<\/entry>/g]
  for (const pat of patterns) {
    for (const m of xml.matchAll(pat)) {
      const c = m[1]
      const titel = (
        c.match(/<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>/s)?.[1] ||
        c.match(/<title[^>]*>(.*?)<\/title>/s)?.[1] || ''
      ).trim().replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#\d+;/g, '')
      const beschrijving = (
        c.match(/<description[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] ||
        c.match(/<description[^>]*>([\s\S]*?)<\/description>/)?.[1] ||
        c.match(/<summary[^>]*>([\s\S]*?)<\/summary>/)?.[1] || ''
      ).replace(/<[^>]+>/g, '').trim().slice(0, 400)
      const link = (
        c.match(/<link>(.*?)<\/link>/)?.[1] ||
        c.match(/<link[^>]*href="([^"]+)"/)?.[1] || ''
      ).trim()
      if (titel) items.push({ titel, beschrijving, link })
    }
    if (items.length > 0) break
  }
  return items.slice(0, 5)
}

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'POST only' }), { status: 405 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({
      error: 'Geen Anthropic API key. Voeg ANTHROPIC_API_KEY toe als Netlify environment variable.'
    }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }

  const resultaten = []
  const fouten = []

  for (const feed of RSS_FEEDS) {
    try {
      const res = await fetch(feed.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; NHLStendenAIHUB/1.3)',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*',
        },
        signal: AbortSignal.timeout(10000),
      })
      if (!res.ok) { fouten.push(`${feed.naam}: HTTP ${res.status}`); continue }

      const xml = await res.text()
      const items = parseRSS(xml)
      if (items.length === 0) { fouten.push(`${feed.naam}: geen items`); continue }

      for (const item of items) {
        try {
          const r = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
              'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
              model: 'claude-haiku-4-5-20251001',
              max_tokens: 250,
              messages: [{
                role: 'user',
                content: `Beoordeel of dit nieuwsitem relevant is voor de AI-HUB van NHL Stenden (AI in onderwijs, AI-geletterdheid, EU AI Act, digitale soevereiniteit, AI-governance hoger onderwijs).\n\nTitel: ${item.titel}\nBeschrijving: ${item.beschrijving.slice(0, 200)}\n\nAntwoord ALLEEN met dit JSON (geen uitleg, geen markdown):\n{"relevant":true/false,"samenvatting":"1-2 zinnen Nederlands als relevant, anders leeg","doelgroep":"docenten/studenten/management/medewerkers/algemeen"}`
              }]
            })
          })
          if (!r.ok) continue
          const data = await r.json()
          const tekst = data.content?.[0]?.text || ''
          let b
          try { b = JSON.parse(tekst.replace(/```[\w]*|```/g, '').trim()) } catch { continue }
          if (b.relevant && b.samenvatting) {
            resultaten.push({
              id: Date.now() + Math.random(),
              type: 'ontwikkeling', icon: feed.icon,
              typelabel: 'Interessante ontwikkeling',
              rol: 'Auto-update', naam: feed.label,
              spoor: null, sporeDef: null, laag: null,
              titel: item.titel, tekst: b.samenvatting,
              url: item.link,
              trefwoorden: ['AI', 'Nieuws', feed.label],
              datum: new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }),
              nieuw: true, autoUpdate: true,
              doelgroep: b.doelgroep || 'algemeen',
            })
          }
          await new Promise(r => setTimeout(r, 150))
        } catch { /* sla item over */ }
      }
    } catch (err) {
      fouten.push(`${feed.naam}: ${err.message?.slice(0, 60)}`)
    }
  }

  return new Response(JSON.stringify({
    ok: true,
    aantalNieuw: resultaten.length,
    items: resultaten,
    fouten: fouten.length > 0 ? fouten : undefined,
    tijdstip: new Date().toISOString(),
  }), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
}

export const config = { path: '/.netlify/functions/nieuws-ophalen' }
