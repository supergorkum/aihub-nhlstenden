// Netlify Function — snel: max 3 feeds, parallel Anthropic calls, timeout 8s

const RSS_FEEDS = [
  { naam: 'The Gradient',   url: 'https://thegradient.pub/rss/',              label: 'The Gradient',   icon: '📊' },
  { naam: '80,000 Hours',   url: 'https://80000hours.org/feed/',               label: '80,000 Hours',   icon: '💡' },
  { naam: 'Import AI',      url: 'https://importai.substack.com/feed',         label: 'Import AI',      icon: '🤖' },
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
      ).replace(/<[^>]+>/g, '').trim().slice(0, 300)
      const link = (
        c.match(/<link>(.*?)<\/link>/)?.[1] ||
        c.match(/<link[^>]*href="([^"]+)"/)?.[1] || ''
      ).trim()
      if (titel) items.push({ titel, beschrijving, link })
    }
    if (items.length > 0) break
  }
  return items.slice(0, 3) // max 3 per feed
}

async function beoordeelItem(item, feed, apiKey) {
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
        max_tokens: 150,
        messages: [{
          role: 'user',
          content: `Relevant voor NHL Stenden AI-HUB (AI onderwijs, AI Act, digitale soevereiniteit, hoger onderwijs)?\n\nTitel: ${item.titel}\nBeschrijving: ${item.beschrijving.slice(0, 150)}\n\nThema's: 1=AI & Leren (onderwijs, didactiek, studenten), 2=AI & Werken (bedrijfsvoering, medewerkers, organisatie), 3=AI & Verantwoordelijkheid (AI Act, governance, ethiek, soevereiniteit), 4=AI-Geletterdheid (vaardigheden, bewustzijn, training)\n\nJSON alleen:\n{"relevant":true/false,"samenvatting":"max 1 zin Nederlands","doelgroep":"docenten/studenten/management/algemeen","spoor":1/2/3/4}`
        }]
      }),
      signal: AbortSignal.timeout(5000),
    })
    if (!r.ok) return null
    const data = await r.json()
    const tekst = data.content?.[0]?.text || ''
    let b
    try { b = JSON.parse(tekst.replace(/```[\w]*|```/g, '').trim()) } catch { return null }
    if (!b.relevant || !b.samenvatting) return null
    return {
      id: Date.now() + Math.random(),
      type: 'ontwikkeling', icon: feed.icon,
      typelabel: 'Interessante ontwikkeling',
      rol: 'Auto-update', naam: feed.label,
      spoor: b.spoor || null,
              sporeDef: b.spoor ? [
                null,
                { titel: 'AI & Leren', icon: '🎓' },
                { titel: 'AI & Werken', icon: '⚙️' },
                { titel: 'AI & Verantwoordelijkheid', icon: '⚖️' },
                { titel: 'AI-Geletterdheid', icon: '📖' },
              ][b.spoor] || null : null,
              laag: null,
      titel: item.titel, tekst: b.samenvatting,
      url: item.link,
      trefwoorden: ['AI', 'Nieuws', feed.label],
      datum: new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }),
      nieuw: true, autoUpdate: true,
      doelgroep: b.doelgroep || 'algemeen',
    }
  } catch { return null }
}

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'POST only' }), {
      status: 405, headers: { 'Content-Type': 'application/json' }
    })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({
      error: 'Geen Anthropic API key. Voeg ANTHROPIC_API_KEY toe als Netlify environment variable.'
    }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }

  const fouten = []
  const alleItems = []

  // Feeds parallel ophalen
  const feedResults = await Promise.allSettled(
    RSS_FEEDS.map(async (feed) => {
      const res = await fetch(feed.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NHLStendenAIHUB/1.3)', Accept: 'application/rss+xml, */*' },
        signal: AbortSignal.timeout(6000),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const xml = await res.text()
      const items = parseRSS(xml)
      if (items.length === 0) throw new Error('geen items')
      return { feed, items }
    })
  )

  for (let i = 0; i < feedResults.length; i++) {
    const result = feedResults[i]
    if (result.status === 'rejected') {
      fouten.push(`${RSS_FEEDS[i].naam}: ${result.reason?.message?.slice(0, 50)}`)
    } else {
      alleItems.push(result.value)
    }
  }

  // Alle Anthropic beoordelingen parallel
  const beoordelingen = await Promise.allSettled(
    alleItems.flatMap(({ feed, items }) =>
      items.map(item => beoordeelItem(item, feed, apiKey))
    )
  )

  const resultaten = beoordelingen
    .filter(r => r.status === 'fulfilled' && r.value !== null)
    .map(r => r.value)

  return new Response(JSON.stringify({
    ok: true,
    aantalNieuw: resultaten.length,
    items: resultaten,
    fouten: fouten.length > 0 ? fouten : undefined,
    tijdstip: new Date().toISOString(),
  }), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
}

export const config = { path: '/.netlify/functions/nieuws-ophalen' }
