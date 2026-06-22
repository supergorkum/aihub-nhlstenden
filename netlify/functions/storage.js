import { getStore } from '@netlify/blobs'

export default async (req, context) => {
  // Controleer of Netlify Blobs beschikbaar is
  if (!process.env.NETLIFY_SITE_ID && !context?.site?.id) {
    return new Response(JSON.stringify({
      error: 'Netlify Blobs niet beschikbaar. Voeg NETLIFY_SITE_ID toe als environment variable in Netlify dashboard (Site settings → Environment variables).',
      tip: 'Je vindt je Site ID onder Site settings → General → Site details.'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }

  let store
  try {
    store = getStore('aihub-data')
  } catch (err) {
    return new Response(JSON.stringify({
      error: `Blobs initialisatie mislukt: ${err.message}. Controleer NETLIFY_SITE_ID en zorg dat de site minimaal één keer is gedeployed via Netlify (niet via CLI).`
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }

  if (req.method === 'GET') {
    const url = new URL(req.url)
    const key = url.searchParams.get('key')
    if (!key) return new Response(JSON.stringify({ error: 'No key' }), { status: 400 })
    try {
      const value = await store.get(key)
      return new Response(JSON.stringify({ value }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      })
    } catch (err) {
      return new Response(JSON.stringify({ value: null, error: err.message }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      })
    }
  }

  if (req.method === 'POST') {
    try {
      const { key, value } = await req.json()
      if (!key) return new Response(JSON.stringify({ error: 'No key' }), { status: 400 })
      await store.set(key, value)
      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      })
    } catch (err) {
      return new Response(JSON.stringify({
        error: `Opslaan mislukt: ${err.message}`
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      })
    }
  }

  return new Response('Method not allowed', { status: 405 })
}

export const config = { path: '/.netlify/functions/storage' }
