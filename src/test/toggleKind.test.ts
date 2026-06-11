import { getToggleKind } from '../toggleKind'

test('uses heat kind for water heater icons without reading labels', () => {
  expect(getToggleKind({ icon: 'mdi:water-boiler' })).toBe('heat')
})

test('uses domain kind for lights and fans', () => {
  expect(
    getToggleKind({
      entity: { entity_id: 'light.kitchen', state: 'on', attributes: {} },
    })
  ).toBe('lightbulb')
  expect(
    getToggleKind({
      entity: { entity_id: 'fan.bathroom', state: 'on', attributes: {} },
    })
  ).toBe('fan')
})

test('uses humidifier device class for dehumidifier toggles', () => {
  expect(
    getToggleKind({
      entity: {
        entity_id: 'humidifier.basement',
        state: 'on',
        attributes: { device_class: 'dehumidifier' },
      },
    })
  ).toBe('dry')
})

test('uses configured semantic words when metadata is absent', () => {
  expect(getToggleKind({ label: 'Heater' })).toBe('heat')
})

test('uses Home Assistant localized terms for configured labels', () => {
  expect(
    getToggleKind({
      label: 'Chauffage',
      hass: {
        localize: (key: string) =>
          key === 'component.climate.state._.heat' ? 'Chauffage' : key,
      },
    })
  ).toBe('heat')
})
