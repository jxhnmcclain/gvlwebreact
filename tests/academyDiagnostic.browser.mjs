import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import puppeteer from 'puppeteer';
import { getQuestionFlow, questions } from '../lib/academyDiagnostic.ts';

const base = process.env.GVL_PREVIEW_URL ?? 'http://127.0.0.1:4173';
const captures = path.join(os.tmpdir(), 'gvl-academy-diagnostic-captures');
await fs.mkdir(captures, { recursive: true });
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });

async function clickText(page, text) {
  const didClick = await page.evaluate(label => {
    const button = [...document.querySelectorAll('button')].find(element => element.textContent?.trim().includes(label));
    button?.click();
    return Boolean(button);
  }, text);
  assert.ok(didClick, `Button missing: ${text}`);
}

async function runCase(name, viewport, answers) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewport(viewport);
  await page.goto(`${base}/academia/diagnostico?utm_source=instagram&utm_medium=social`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('button');
  await page.screenshot({ path: path.join(captures, `${name}-intro.png`), fullPage: true });
  await clickText(page, 'Empezar');
  await page.waitForSelector('#diagnostic-question');
  await page.screenshot({ path: path.join(captures, `${name}-question.png`), fullPage: true });

  const flow = getQuestionFlow(answers);
  for (let index = 0; index < flow.length; index++) {
    const id = flow[index];
    const choice = questions[id].choices.find(item => item.value === answers[id]);
    assert.ok(choice, `Missing answer for ${id}`);
    await page.waitForFunction(expected => document.querySelector('#diagnostic-question')?.textContent === expected, {}, questions[id].title);
    await clickText(page, choice.label);
    await clickText(page, index === flow.length - 1 ? 'Ver mi resultado' : 'Seguir');
  }

  await page.waitForFunction(() => document.querySelector('h1')?.textContent?.startsWith('Nivel '));
  const result = await page.evaluate(() => ({
    title: document.querySelector('h1')?.textContent,
    exercise: document.querySelector('ol')?.textContent,
    overflow: document.documentElement.scrollWidth > innerWidth,
    consent: document.querySelector('input[type="checkbox"]')?.required,
    utm: window.location.search.includes('utm_source=instagram'),
  }));
  assert.ok(!result.overflow, `${name}: horizontal overflow`);
  assert.ok(result.exercise?.length > 100, `${name}: missing exercise`);
  assert.ok(result.consent, `${name}: consent not required`);
  assert.ok(result.utm, `${name}: UTM lost`);
  assert.deepEqual(errors, [], `${name}: browser errors`);
  await page.screenshot({ path: path.join(captures, `${name}-result.png`), fullPage: true });
  console.log(`${name}: ${result.title}; ${flow.length} questions; no overflow or page errors`);
  await page.close();
}

try {
  const landing = await browser.newPage();
  await landing.goto(`${base}/academia?utm_source=instagram`, { waitUntil: 'domcontentloaded' });
  const diagnosticHref = await landing.$eval('a[href*="/academia/diagnostico"]', element => element.getAttribute('href'));
  assert.equal(diagnosticHref, '/academia/diagnostico?utm_source=instagram');
  await landing.close();
  await runCase('beginner-375', { width: 375, height: 812, deviceScaleFactor: 1, isMobile: true }, {
    role: 'design', goal: 'tool', startingPoint: 'repeated', built: 'nothing', tools: 'chat', testing: 'notYet', blocker: 'scope', time: '20', beginnerInput: 'rough', beginnerMaterial: 'text',
  });
  await runCase('published-390', { width: 390, height: 844, deviceScaleFactor: 1, isMobile: true }, {
    role: 'marketing', goal: 'automation', startingPoint: 'prototype', built: 'published', tools: 'codeAgent', capability: 'flow', testing: 'errors', blocker: 'advanced', time: 'long', publishedUsers: 'yes', publishedErrors: 'logs',
  });
  await runCase('prototype-desktop', { width: 1280, height: 800, deviceScaleFactor: 1 }, {
    role: 'content', goal: 'app', startingPoint: 'prototype', built: 'prototype', tools: 'builder', capability: 'answer', testing: 'one', blocker: 'publish', time: '45', prototypeData: 'nowhere', prototypeAccess: 'preview',
  });
} finally {
  await browser.close();
}
console.log(`Captures: ${captures}`);
