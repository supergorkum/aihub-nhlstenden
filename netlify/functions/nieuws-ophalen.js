// Netlify function: haalt RSS feeds op, filtert met Anthropic API op relevantie
// voor NHL Stenden AI-beleid, en geeft nieuwe items terug

const RSS_FEEDS = [
  {
    naam: 'SURF nieuws',
    url: 'https://www.surf.nl/rss/nieuws',
    label: 'SURF',
    icon: '🌐',
  },
  {
    naam: 'Rathenau Instituut',
    url: 'https://www.rathenau.nl/nl/rss.xml',
    label: 'Rathenau',
    icon: '🔬',
  },
  {
    naam: 'EU AI Act nieuws',
    url: 'https://digital-strategy.ec.europa.eu/en/rss.xml',
    label: 'Europese Commissie',
    icon: '🇪🇺',
  },
  {
    naam: 'Rijksoverheid AI',
    url: 'https://www.rijksoverheid.nl/onderwerpen/kunstmatige-intelligentie-ai/rss',
    label: 'Rijksoverheid',
    icon: '🇳🇱',
  },
]

// Parse simpele RSS XML naar items
function parseRSS(xml) {
  const items = []
  const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g)
  for (const match of itemMatches) {
    const content = match[1]
    const titel = content.match(/<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>|<title[^>]*>(.*?)<\/title>/)?.[1] || content.match(/<title[^>]*>(.*?)<\/title>/)?.[1] || ''
    const beschrijving = content.match(/<description[^>]*><!\[CDATA\[(.*?)\]\]><\/description>|<description[^>]*>(.*?)<\/description>/)?.[1] || ''
    const link = content.match(/<link>(.*?)<\/link>/)?.[1] || content.match(/<link[^/]*href="([^"]+)"/)?.[1] || ''
    const datum = content.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || ''
    if (titel) items.push({ titel: titel.trim(), beschrijving: beschrijving.replace(/<[^>]+>/g, '').trim().slice(0, 300), link: link.trim(), datum })
  }
  return items.slice(0, 8) // Max 8 per feed
}

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'POST only' }), { status: 405 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Geen Anthropic API key geconfigureerd. Voeg ANTHROPIC_API_KEY toe als Netlify environment variable.' }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    })
  }

  const resultaten = []
  const fouten = []

  // Haal feeds op
  for (const feed of RSS_FEEDS) {
    try {
      const res = await fetch(feed.url, {
        headers: { 'User-Agent': 'NHL-Stenden-AIHUB/1.0' },
        signal: AbortSignal.timeout(8000),
      })
      if (!res.ok) { fouten.push(`${feed.naam}: HTTP ${res.status}`); continue }
      const xml = await res.text()
      const items = parseRSS(xml)

      // Beoordeel elk item met Anthropic API
      for (const item of items) {
        try {
          const beoordeelRes = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
              'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
              model: 'claude-haiku-4-5-20251001',
              max_tokens: 300,
              messages: [{
                role: 'user',
                content: `Beoordeel of dit nieuwsitem relevant is voor een AI-HUB van NHL Stenden Hogeschool. 
De hub richt zich op: AI in het onderwijs, AI-geletterdheid, AI Act compliance, digitale soevereiniteit, AI-governance in hoger onderwijs.

Titel: ${item.titel}
Beschrijving: ${item.beschrijving}

Antwoord ALLEEN in dit JSON formaat (geen uitleg, geen markdown):
{"relevant": true/false, "samenvatting": "Nederlandse samenvatting van 1-2 zinnen als het relevant is, anders leeg", "doelgroep": "docenten/studenten/management/medewerkers/algemeen"}`
              }]
            })
          })

          if (!beoordeelRes.ok) continue
          const data = await beoordeelRes.json()
          const tekst = data.content?.[0]?.text || ''

          let beoordeling
          try {
            beoordeling = JSON.parse(tekst.replace(/```json|```/g, '').trim())
          } catch { continue }

          if (beoordeling.relevant && beoordeling.samenvatting) {
            resultaten.push({
              id: Date.now() + Math.random(),
              type: 'ontwikkeling',
              icon: feed.icon,
              typelabel: 'Interessante ontwikkeling',
              rol: 'Auto-update',
              naam: feed.label,
              spoor: null,
              sporeDef: null,
              laag: null,
              titel: item.titel,
              tekst: beoordeling.samenvatting,
              url: item.link,
              trefwoorden: ['AI', 'Nieuws', feed.label],
              datum: new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }),
              nieuw: true,
              autoUpdate: true,
              doelgroep: beoordeling.doelgroep || 'algemeen',
            })
          }

          // Klein pauze tussen API calls
          await new Promise(r => setTimeout(r, 200))
        } catch { /* sla dit item over */ }
      }
    } catch (err) {
      fouten.push(`${feed.naam}: ${err.message}`)
    }
  }

  return new Response(JSON.stringify({
    ok: true,
    aantalNieuw: resultaten.length,
    items: resultaten,
    fouten: fouten.length > 0 ? fouten : undefined,
    tijdstip: new Date().toISOString(),
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
}

export const config = { path: '/.netlify/functions/nieuws-ophalen' }
