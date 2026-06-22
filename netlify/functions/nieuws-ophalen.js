// Netlify function: haalt RSS/Atom feeds op, filtert met Anthropic API op relevantie
// voor NHL Stenden AI-beleid, en geeft nieuwe items terug

const RSS_FEEDS = [
  {
    naam: 'EU Digital Strategy',
    url: 'https://digital-strategy.ec.europa.eu/en/rss.xml',
    label: 'Europese Commissie',
    icon: '🇪🇺',
  },
  {
    naam: 'EU AI Office',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai/rss.xml',
    label: 'EU AI Office',
    icon: '⚖️',
  },
  {
    naam: 'OECD AI Policy',
    url: 'https://oecd.ai/en/feed',
    label: 'OECD AI',
    icon: '🌍',
  },
  {
    naam: 'MIT Technology Review AI',
    url: 'https://www.technologyreview.com/feed/',
    label: 'MIT Tech Review',
    icon: '🔬',
  },
  {
    naam: 'EDUCAUSE',
    url: 'https://er.educause.edu/feed',
    label: 'EDUCAUSE',
    icon: '🎓',
  },
]

function parseRSS(xml) {
  const items = []
  // Probeer zowel RSS <item> als Atom <entry>
  const patterns = [
    /<item>([\s\S]*?)<\/item>/g,
    /<entry>([\s\S]*?)<\/entry>/g,
  ]
  for (const pattern of patterns) {
    const matches = [...xml.matchAll(pattern)]
    for (const match of matches) {
      const content = match[1]
      const titel =
        content.match(/<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>/s)?.[1] ||
        content.match(/<title[^>]*>(.*?)<\/title>/s)?.[1] || ''
      const beschrijving =
        content.match(/<description[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] ||
        content.match(/<description[^>]*>([\s\S]*?)<\/description>/)?.[1] ||
        content.match(/<summary[^>]*>([\s\S]*?)<\/summary>/)?.[1] || ''
      const link =
        content.match(/<link>(.*?)<\/link>/)?.[1] ||
        content.match(/<link[^>]*href="([^"]+)"/)?.[1] || ''
      if (titel.trim()) {
        items.push({
          titel: titel.trim().replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
          beschrijving: beschrijving.replace(/<[^>]+>/g, '').trim().slice(0, 400),
          link: link.trim(),
        })
      }
    }
    if (items.length > 0) break
  }
  return items.slice(0, 6)
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
          'User-Agent': 'NHL-Stenden-AIHUB/1.0 (educational; contact: aihub@nhlstenden.com)',
          'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml',
        },
        signal: AbortSignal.timeout(10000),
      })

      if (!res.ok) {
        fouten.push(`${feed.naam}: HTTP ${res.status}`)
        continue
      }

      const xml = await res.text()
      const items = parseRSS(xml)

      if (items.length === 0) {
        fouten.push(`${feed.naam}: geen items gevonden`)
        continue
      }

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
              max_tokens: 250,
              messages: [{
                role: 'user',
                content: `Beoordeel of dit nieuwsitem relevant is voor de AI-HUB van NHL Stenden Hogeschool. De hub richt zich op: AI in het onderwijs, AI-geletterdheid, EU AI Act compliance, digitale soevereiniteit, AI-governance in hoger onderwijs, studiesucces via AI.

Titel: ${item.titel}
Beschrijving: ${item.beschrijving.slice(0, 200)}

Antwoord ALLEEN met dit JSON (geen uitleg, geen markdown):
{"relevant":true/false,"samenvatting":"1-2 zinnen in het Nederlands als relevant, anders leeg","doelgroep":"docenten/studenten/management/medewerkers/algemeen"}`
              }]
            })
          })

          if (!beoordeelRes.ok) continue
          const data = await beoordeelRes.json()
          const tekst = data.content?.[0]?.text || ''

          let beoordeling
          try { beoordeling = JSON.parse(tekst.replace(/```[\w]*|```/g, '').trim()) }
          catch { continue }

          if (beoordeling.relevant && beoordeling.samenvatting) {
            resultaten.push({
              id: Date.now() + Math.random(),
              type: 'ontwikkeling',
              icon: feed.icon,
              typelabel: 'Interessante ontwikkeling',
              rol: 'Auto-update',
              naam: feed.label,
              spoor: null, sporeDef: null, laag: null,
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
          await new Promise(r => setTimeout(r, 150))
        } catch { /* sla dit item over */ }
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
  }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  })
}

export const config = { path: '/.netlify/functions/nieuws-ophalen' }
