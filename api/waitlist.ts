import type { IncomingMessage, ServerResponse } from 'node:http';

type Request = IncomingMessage & { body?: unknown };
type Entry = { kind: string; option: string; name: string; email: string; detail: string; consent: boolean; website: string; page_url: string; turnstileToken: string; [key: string]: unknown };

export default async function handler(req: Request, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.statusCode = 405; res.setHeader('Allow', 'POST'); return res.end('{"error":"method_not_allowed"}'); }
  let data: Entry;
  try { data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body as Entry; }
  catch { res.statusCode = 400; return res.end('{"error":"invalid_json"}'); }
  if (!data || typeof data !== 'object') { res.statusCode = 400; return res.end('{"error":"invalid_body"}'); }
  if (data.website) { res.statusCode = 200; return res.end('{"ok":true}'); }
  const { kind, option, name, email, detail, consent } = data;
  if (!['creatives', 'teams', 'academy'].includes(kind) ||
      (kind === 'creatives' && !['single', 'four'].includes(option)) ||
      (kind !== 'creatives' && option !== '') ||
      typeof name !== 'string' || !name.trim() || name.length > 120 ||
      typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof detail !== 'string' || detail.length > 1000 || consent !== true ||
      typeof data.turnstileToken !== 'string' || !data.turnstileToken || data.turnstileToken.length > 2048) {
    res.statusCode = 400; return res.end('{"error":"invalid_entry"}');
  }
  // Existing production forms keep their current behavior until the server
  // secret is configured. Once present, every waitlist token is verified.
  if (process.env.TURNSTILE_SECRET_KEY) {
    try {
      const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY, response: data.turnstileToken }),
        signal: AbortSignal.timeout(5000),
      });
      if (!verification.ok || (await verification.json() as { success?: boolean }).success !== true) {
        res.statusCode = 400; return res.end('{"error":"verification_failed"}');
      }
    } catch {
      res.statusCode = 503; return res.end('{"error":"verification_unavailable"}');
    }
  }
  const base = process.env.DIRECTUS_PROD_URL;
  const token = process.env.DIRECTUS_WAITLIST_TOKEN || process.env.DIRECTUS_BUILD_TOKEN;
  if (!base || !token) { res.statusCode = 503; return res.end('{"error":"waitlist_unavailable"}'); }
  const headers: Record<string, string> = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
  if (process.env.DIRECTUS_ACCESS_CLIENT_ID && process.env.DIRECTUS_ACCESS_CLIENT_SECRET) {
    headers['CF-Access-Client-Id'] = process.env.DIRECTUS_ACCESS_CLIENT_ID;
    headers['CF-Access-Client-Secret'] = process.env.DIRECTUS_ACCESS_CLIENT_SECRET;
  }
  const utm = Object.fromEntries(Object.entries(data).filter(([key, value]) => /^utm_(source|medium|campaign|content|term)$/.test(key) && typeof value === 'string').map(([key, value]) => [key, String(value).slice(0, 200)]));
  try {
    const response = await fetch(new URL('/items/gvl_waitlist_entries', base), {
      method: 'POST', headers, body: JSON.stringify({ kind, option, name: name.trim(), email: email.trim().toLowerCase(), detail: detail.trim(), consent_at: new Date().toISOString(), page_url: typeof data.page_url === 'string' ? data.page_url.slice(0, 500) : '', ...utm }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) { console.error('Directus waitlist write failed:', response.status); res.statusCode = 502; return res.end('{"error":"storage_failed"}'); }
    res.statusCode = 201; return res.end('{"ok":true}');
  } catch (error) {
    console.error('Waitlist storage unavailable:', error instanceof Error ? error.message : 'unknown');
    res.statusCode = 502; return res.end('{"error":"storage_failed"}');
  }
}
