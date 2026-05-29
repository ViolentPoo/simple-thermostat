import { render } from 'lit'
import renderModeType from '../components/modeType'
import { fanAdapter } from '../adapters/fan'

const baseOptions = {
  state: 'on',
  entity: {
    entity_id: 'fan.range_hood',
    state: 'off',
    attributes: {},
  },
  hass: {},
  adapter: fanAdapter,
  modeOptions: {},
  localize: (key: string) => key,
  setMode: () => undefined,
}

test('preset heading is hidden by default', () => {
  const result = renderModeType({
    ...baseOptions,
    mode: {
      type: 'preset',
      mode: 'off',
      list: [{ value: 'off', icon: 'mdi:power', name: 'off' }],
    },
  })

  render(result, document.body)

  expect(document.body.querySelector('.mode-title')).toBe(null)
})

test('preset heading shows fallback label when explicitly enabled', () => {
  const result = renderModeType({
    ...baseOptions,
    mode: {
      type: 'preset',
      mode: 'off',
      heading: true,
      list: [{ value: 'off', icon: 'mdi:power', name: 'off' }],
    },
  })

  render(result, document.body)

  expect(document.body.querySelector('.mode-title')?.textContent?.trim()).toBe(
    'Preset'
  )
})

test('hvac heading is hidden by default', () => {
  const result = renderModeType({
    ...baseOptions,
    mode: {
      type: 'hvac',
      mode: 'off',
      list: [{ value: 'off', icon: 'mdi:power', name: 'off' }],
    },
  })

  render(result, document.body)

  expect(document.body.querySelector('.mode-title')).toBe(null)
})

test('renders card-local fan speed icons', () => {
  const result = renderModeType({
    ...baseOptions,
    mode: {
      type: 'preset',
      mode: 'max',
      list: [{ value: 'max', icon: 'st:fan-speed-4', name: 'max' }],
    },
  })

  render(result, document.body)

  expect((document.body.querySelector('ha-icon.mode-icon') as any)?.icon).toBe(
    'st:fan-speed-4'
  )
  expect(window.customIconsets?.st).toBeDefined()
})

test('renders card-local fan speed 5 through Home Assistant icon pipeline', () => {
  const result = renderModeType({
    ...baseOptions,
    mode: {
      type: 'preset',
      mode: 'boost',
      list: [{ value: 'boost', icon: 'st:fan-speed-5', name: 'boost' }],
    },
  })

  render(result, document.body)

  expect((document.body.querySelector('ha-icon.mode-icon') as any)?.icon).toBe(
    'st:fan-speed-5'
  )
  expect(window.customIconsets?.st).toBeDefined()
})

test('fan preset tooltips describe the control purpose', () => {
  const result = renderModeType({
    ...baseOptions,
    entity: {
      ...baseOptions.entity,
      attributes: { friendly_name: 'Range Hood Fan' },
    },
    mode: {
      type: 'preset',
      mode: 'low',
      list: [{ value: 'low', icon: 'st:fan-speed-1', name: 'Low' }],
    },
  })

  render(result, document.body)

  expect(document.body.querySelector('.modes')?.getAttribute('title')).toBe(
    null
  )
  expect(
    document.body.querySelector('.modes')?.classList.contains('fan-preset')
  ).toBe(true)
  expect(document.body.querySelector('.mode-item')?.getAttribute('title')).toBe(
    null
  )
})

test('vane tooltips describe the control purpose', () => {
  const result = renderModeType({
    ...baseOptions,
    mode: {
      type: 'vane_horizontal',
      mode: 'center',
      list: [{ value: 'center', icon: '', name: 'Center' }],
    },
  })

  render(result, document.body)

  expect(document.body.querySelector('.modes')?.getAttribute('title')).toBe(
    null
  )
  expect(document.body.querySelector('.mode-item')?.getAttribute('title')).toBe(
    null
  )
})
