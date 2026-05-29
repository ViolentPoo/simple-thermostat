import parseHeader, { DOMAIN_STATE_ICONS } from '../config/header'

const hass = { states: {}, performAction: () => undefined }

test('uses entity icon before domain fallback', () => {
  const result = parseHeader(
    {},
    {
      entity_id: 'fan.attic',
      state: 'off',
      attributes: {
        friendly_name: 'Attic Fan',
        icon: 'mdi:custom-fan',
      },
    },
    hass
  )

  expect(result && result.icon).toBe('mdi:custom-fan')
  expect(result && result.slashOffIcon).toBe(true)
})

test('uses fan state icon fallback', () => {
  const result = parseHeader(
    {},
    {
      entity_id: 'fan.attic',
      state: 'off',
      attributes: { friendly_name: 'Attic Fan' },
    },
    hass
  )

  expect(result && result.icon).toBe(DOMAIN_STATE_ICONS.fan.off)
  expect(result && result.slashOffIcon).toBe(false)
})

test('slashes custom climate icons when off', () => {
  const result = parseHeader(
    {},
    {
      entity_id: 'climate.garage',
      state: 'off',
      attributes: {
        friendly_name: 'Garage Heat',
        icon: 'mdi:garage',
      },
    },
    hass
  )

  expect(result && result.icon).toBe('mdi:garage')
  expect(result && result.slashOffIcon).toBe(true)
})

test('uses humidifier state icon fallback', () => {
  const result = parseHeader(
    {},
    {
      entity_id: 'humidifier.basement',
      state: 'on',
      attributes: { friendly_name: 'Basement Humidifier' },
    },
    hass
  )

  expect(result && result.icon).toBe(DOMAIN_STATE_ICONS.humidifier.on)
})

test('ignores configured faults that do not exist', () => {
  const result = parseHeader(
    {
      faults: [
        { entity: 'binary_sensor.exists', icon: 'mdi:alert' },
        { entity: 'binary_sensor.missing', icon: 'mdi:alert' },
      ],
    },
    {
      entity_id: 'climate.thermostat',
      state: 'heat',
      attributes: { friendly_name: 'Thermostat' },
    },
    {
      performAction: () => undefined,
      states: {
        'binary_sensor.exists': {
          entity_id: 'binary_sensor.exists',
          state: 'on',
          attributes: {},
        },
      },
    }
  )

  expect(result && result.faults).toHaveLength(1)
  expect(result && result.faults?.[0].entity).toBe('binary_sensor.exists')
})

test('ignores configured header toggles that do not exist yet', () => {
  const result = parseHeader(
    {
      toggle: { entity: 'switch.missing', icon: 'mdi:fire' },
      toggles: [{ entity: 'fan.missing', icon: 'mdi:fan' }],
    },
    {
      entity_id: 'climate.thermostat',
      state: 'heat',
      attributes: { friendly_name: 'Thermostat' },
    },
    {
      performAction: () => undefined,
      states: {},
    }
  )

  expect(result && result.toggle).toBe(null)
  expect(result && result.toggles).toEqual([])
})
