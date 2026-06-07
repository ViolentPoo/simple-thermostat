import { name as CARD_NAME, version } from '../package.json'
import SimpleThermostatEditor from './editor'
import SimpleThermostat from './main'

if (!customElements.get(CARD_NAME)) {
  customElements.define(CARD_NAME, SimpleThermostat)
}

if (!customElements.get(`${CARD_NAME}-editor`)) {
  customElements.define(`${CARD_NAME}-editor`, SimpleThermostatEditor)
}

console.info(
  `%c SIMPLE-THERMOSTAT %c v${version} `,
  'color: white; background: #6f4cff; font-weight: 700; padding: 2px 6px; border-radius: 3px 0 0 3px;',
  'color: #6f4cff; background: #1f1f1f; font-weight: 700; padding: 2px 6px; border-radius: 0 3px 3px 0;'
)
const w = window as any
w.customCards = w.customCards || []
if (!w.customCards.find((c: any) => c.type === CARD_NAME)) {
  w.customCards.push({
    type: CARD_NAME,
    name: 'Simple Thermostat',
    preview: true,
    description: 'A different take on the thermostat card',
    documentationURL: 'https://github.com/Wheemer/simple-thermostat',
  })
}
