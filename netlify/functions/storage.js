import { getStore } from '@netlify/blobs'

export default async (req, context) => {
  const store = getStore('aihub-data')

  if (req.method === 'GET') {
    const url = new URL(req.url)
    const key = url.searchParams.get('key')
    if (!key) return new Response(JSON.stringify({ error: 'No key' }), { status: 400 })
    try {
      const value = await store.get(key)
      return new Response(JSON.stringify({ value }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      })
    } catch {
      return new Response(JSON.stringify({ value: null }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      })
    }
  }

  if (req.method === 'POST') {
    const { key, value } = await req.json()
    if (!key) return new Response(JSON.stringify({ error: 'No key' }), { status: 400 })
    await store.set(key, value)
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }

  return new Response('Method not allowed', { status: 405 })
}

export const config = { path: '/.netlify/functions/storage' }
