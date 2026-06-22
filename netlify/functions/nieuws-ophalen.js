// Netlify function: haalt RSS feeds op, filtert met Anthropic API op relevantie
// Feeds gekozen op basis van serverside bereikbaarheid (geen Bot-blokkering)

const RSS_FEEDS = [
  {
    naam: 'The Gradient',
    url: 'https://thegradient.pub/rss/',
    label: 'The Gradient',
    icon: '📊',
    fallback: false,
  },
  {
    naam: '80,000 Hours AI',
    url: 'https://80000hours.org/feed/',
    label: '80,000 Hours',
    icon: '💡',
    fallback: false,
  },
  {
    naam: 'MIT Technology Review',
    url: 'https://www.technologyreview.com/feed/',
    label: 'MIT Tech Review',
    icon: '🔬',
    fallback: false,
  },
  {
    naam: 'VentureBeat AI',
    url: 'https://venturebeat.com/category/ai/feed/',
    label: 'VentureBeat',
    icon: '🚀',
    fallback: false,
  },
  {
    naam: 'AI Alignment Forum',
    url: 'https://www.alignmentforum.org/feed.xml',
    label: 'Alignment Forum',
    icon: '⚖️',
    fallback: false,
  },
  {
    naam: 'Import AI (Jack Clark)',
    url: 'https://importai.substack.com/feed',
    label: 'Import AI',
    icon: '🤖',
    fallback: false,
  },
  {
    naam: 'Future of Life Institute',
    url: 'https://futureoflife.org/feed/',
    label: 'Future of Life',
    icon: '🌍',
    fallback: false,
  },
]

const BROWSER_UA = 'Mozilla/5.0 (compatible; NHLStendenAIHUB/1.3; +https://aihub-nhlstenden.netlify.app)'

function parseRSS(xml) {
  const items = []
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
      const cleanTitel = titel.trim()
        .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#\d+;/g, '')
      if (cleanTitel) {
        items.push({
          titel: cleanTitel,
          beschrijving: beschrijving.replace(/<[^>]+>/g, '').trim().slice(0, 400),
          link: link.trim(),
        })
      }
    }
    if (items.length > 0) break
  }
  return items.slice(0, 5)
}

async function fetchFeed(feed) {
  const headers = {
    'User-Agent': BROWSER_UA,
    'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml, */*',
    'Accept-Language': 'nl,en;q=0.9',
  }

  // Directe poging
  const res = await fetch(feed.url, {
    headers,
    signal: AbortSignal.timeout(12000),
  })

  if (res.ok) return res.text()

  throw new Error(`HTTP ${res.status}`)
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
      const result = await fetchFeed(feed)

      const items = parseRSS(result)

      if (items.length === 0) {
        fouten.push(`${feed.naam}: geen items gevonden`)
        continue
      }

      for (const item of items) {
        if (!item.titel) continue
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
                content: `Beoordeel of dit nieuwsitem relevant is voor de AI-HUB van NHL Stenden Hogeschool. De hub richt zich op: AI in het onderwijs, AI-geletterdheid, EU AI Act compliance, digitale soevereiniteit, AI-governance in hoger onderwijs, studiesucces via AI.\n\nTitel: ${item.titel}\nBeschrijving: ${item.beschrijving.slice(0, 200)}\n\nAntwoord ALLEEN met dit JSON (geen uitleg, geen markdown):\n{"relevant":true/false,"samenvatting":"1-2 zinnen in het Nederlands als relevant, anders leeg","doelgroep":"docenten/studenten/management/medewerkers/algemeen"}`
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
