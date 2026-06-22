// Netlify Function — ESM module
// Vereist @netlify/blobs (zit in netlify/functions/package.json)

import { getStore } from '@netlify/blobs'

export default async (req, context) => {
  let store
  try {
    store = getStore('aihub-data')
  } catch (err) {
    return new Response(JSON.stringify({
      error: `Netlify Blobs niet beschikbaar: ${err.message}. Controleer of NETLIFY_SITE_ID is ingesteld als environment variable in het Netlify dashboard.`
    }), { status: 503, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
  }

  if (req.method === 'GET') {
    const key = new URL(req.url).searchParams.get('key')
    if (!key) return new Response(JSON.stringify({ error: 'No key' }), { status: 400 })
    try {
      const value = await store.get(key)
      return new Response(JSON.stringify({ value }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      })
    } catch (err) {
      return new Response(JSON.stringify({ value: null }), {
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
      return new Response(JSON.stringify({ error: `Opslaan mislukt: ${err.message}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      })
    }
  }

  return new Response('Method not allowed', { status: 405 })
}

export const config = { path: '/.netlify/functions/storage' }
