import assert from 'node:assert/strict';
import test from 'node:test';
import handler from '../api/waitlist.ts';
import { serializeDiagnostic } from '../lib/academyDiagnostic.ts';

const payload = {
  kind: 'academy', option: '', name: 'Prueba', email: 'test@example.org',
  detail: serializeDiagnostic({ role: 'design', goal: 'tool', built: 'nothing', time: '20' }),
  consent: true, website: '', page_url: 'https://growthvideolab.com/academia/diagnostico',
  turnstileToken: 'test-token', utm_source: 'instagram',
};

async function request(body) {
  const response = { statusCode: 200, headers: {}, setHeader(name, value) { this.headers[name] = value; }, end(value) { this.body = value; } };
  await handler({ method: 'POST', body }, response);
  return response;
}

test('validates Turnstile before saving an academy diagnosis', async () => {
  const oldFetch = global.fetch;
  const oldSecret = process.env.TURNSTILE_SECRET_KEY;
  const oldUrl = process.env.DIRECTUS_PROD_URL;
  const oldToken = process.env.DIRECTUS_WAITLIST_TOKEN;
  process.env.TURNSTILE_SECRET_KEY = 'test-secret';
  process.env.DIRECTUS_PROD_URL = 'https://directus.example.org';
  process.env.DIRECTUS_WAITLIST_TOKEN = 'test-directus-token';
  const requests = [];
  global.fetch = async (url, options) => {
    requests.push({ url: String(url), options });
    if (String(url).includes('siteverify')) return Response.json({ success: true });
    return Response.json({ data: { id: 1 } }, { status: 201 });
  };
  try {
    const response = await request(payload);
    assert.equal(response.statusCode, 201);
    assert.equal(requests.length, 2);
    const saved = JSON.parse(requests[1].options.body);
    assert.equal(saved.kind, 'academy');
    assert.equal(saved.utm_source, 'instagram');
    assert.equal(JSON.parse(saved.detail).exercise, 'tool_1');
    assert.ok(saved.consent_at);

    requests.length = 0;
    global.fetch = async () => { requests.push(1); return Response.json({ success: false }); };
    const rejected = await request(payload);
    assert.equal(rejected.statusCode, 400);
    assert.equal(requests.length, 1);
  } finally {
    global.fetch = oldFetch;
    if (oldSecret === undefined) delete process.env.TURNSTILE_SECRET_KEY; else process.env.TURNSTILE_SECRET_KEY = oldSecret;
    if (oldUrl === undefined) delete process.env.DIRECTUS_PROD_URL; else process.env.DIRECTUS_PROD_URL = oldUrl;
    if (oldToken === undefined) delete process.env.DIRECTUS_WAITLIST_TOKEN; else process.env.DIRECTUS_WAITLIST_TOKEN = oldToken;
  }
});
