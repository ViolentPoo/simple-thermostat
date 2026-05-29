import { pathToFileURL } from 'node:url'

const runtimeModules =
  'C:/Users/Media/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'
const { chromium } = await import(
  pathToFileURL(`${runtimeModules}/playwright/index.js`).href
)

const root =
  'C:/mnt/c/Users/Media/Documents/Codex/2026-05-18/i-want-to-release-a-new/simple-thermostat-fan-work'

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
})
const page = await browser.newPage({
  viewport: { width: 1203, height: 1307 },
  deviceScaleFactor: 1,
})
await page.goto(pathToFileURL(`${root}/examples.preview.html`).href, {
  waitUntil: 'networkidle',
})
await page.screenshot({
  path: `${root}/examples.png`,
  fullPage: false,
})
await browser.close()
