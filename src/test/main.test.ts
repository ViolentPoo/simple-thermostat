jest.mock('debounce-fn', () => ({
  __esModule: true,
  default: (fn: unknown) => Object.assign(fn as object, { cancel: jest.fn() }),
}))

import SimpleThermostat from '../main'

const tagName = 'simple-thermostat-main-test'

function createCard() {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, SimpleThermostat)
  }

  return document.createElement(tagName) as SimpleThermostat
}

test('fan controls use fan_mode attribute as active mode', () => {
  const card = createCard()
  card.setConfig({
    entity: 'climate.living_room',
    header: false,
    control: ['fan'],
    version: 3,
  })
  card.hass = {
    states: {
      'climate.living_room': {
        entity_id: 'climate.living_room',
        state: 'cool',
        attributes: {
          fan_modes: ['low', 'high'],
          fan_mode: 'high',
        },
      },
    },
    config: {
      unit_system: {
        temperature: '°C',
      },
    },
  }

  expect(card.modes).toHaveLength(1)
  expect(card.modes[0].type).toBe('fan')
  expect(card.modes[0].mode).toBe('high')
})

test('climate controls keep fan above hvac without moving swing first', () => {
  const card = createCard()
  card.setConfig({
    entity: 'climate.living_room',
    header: false,
    control: ['swing', 'fan', 'hvac'],
    version: 3,
  })
  card.hass = {
    states: {
      'climate.living_room': {
        entity_id: 'climate.living_room',
        state: 'cool',
        attributes: {
          hvac_modes: ['off', 'cool'],
          fan_modes: ['low', 'high'],
          fan_mode: 'high',
          swing_modes: ['off', 'vertical'],
          swing_mode: 'off',
        },
      },
    },
    config: {
      unit_system: {
        temperature: '°C',
      },
    },
  }

  expect(card.modes.map(({ type }) => type)).toEqual(['fan', 'hvac', 'swing'])
})

test('fan card does not fall back to climate current value or headings', async () => {
  document.body.innerHTML = ''
  const card = createCard()
  document.body.appendChild(card)
  card.setConfig({
    entity: 'fan.range_hood',
    header: { name: 'Range Hood Fan' },
    layout: {
      mode: {
        headings: false,
        names: true,
        icons: true,
      },
    },
  } as any)
  card.hass = {
    states: {
      'fan.range_hood': {
        entity_id: 'fan.range_hood',
        state: 'off',
        attributes: {
          friendly_name: 'Range Hood Fan',
          preset_modes: ['off', 'low', 'medium', 'high', 'max'],
          preset_mode: 'off',
        },
      },
    },
    config: {
      unit_system: {
        temperature: '°C',
      },
    },
    localize: (key: string) => key,
  }

  await card.updateComplete

  const text = card.shadowRoot?.textContent ?? ''
  expect(text).not.toContain('Currently')
  expect(text).not.toContain('N/A')
  expect(text).not.toContain('°C')
  expect(text).not.toContain('ui.card.climate.preset_mode')
  expect(card.shadowRoot?.querySelector('.mode-title')).toBe(null)
  expect(
    (card.shadowRoot?.querySelector('ha-icon.header__icon') as any)?.icon
  ).toBe('mdi:fan-off')
})

test('null climate setpoint disables decrease and seeds min temp on increase', async () => {
  document.body.innerHTML = ''
  const performAction = jest.fn()
  const card = createCard()
  document.body.appendChild(card)
  card.setConfig({
    entity: 'climate.comet_dect',
    header: false,
    control: false,
  } as any)
  card.hass = {
    states: {
      'climate.comet_dect': {
        entity_id: 'climate.comet_dect',
        state: 'off',
        attributes: {
          temperature: null,
          current_temperature: 18,
          min_temp: 7,
          max_temp: 30,
        },
      },
    },
    config: {
      unit_system: {
        temperature: '°C',
      },
    },
    localize: (key: string) => key,
    performAction,
  }

  await card.updateComplete

  const decrease = card.shadowRoot?.querySelector(
    'button.decrease'
  ) as HTMLButtonElement
  const increase = card.shadowRoot?.querySelector(
    'button.increase'
  ) as HTMLButtonElement

  expect(decrease.disabled).toBe(true)
  expect(increase.disabled).toBe(false)

  increase.click()

  expect(card._values.temperature).toBe(7)
  expect(performAction).toHaveBeenCalledWith({
    action: 'climate.set_temperature',
    data: {
      entity_id: 'climate.comet_dect',
      temperature: 7,
    },
  })
})

test('enhanced visuals off keeps legacy column setpoint layout by default', async () => {
  document.body.innerHTML = ''
  const card = createCard()
  document.body.appendChild(card)
  card.setConfig({
    entity: 'climate.living_room',
    header: false,
    control: false,
    enhanced_visuals: false,
  } as any)
  card.hass = {
    states: {
      'climate.living_room': {
        entity_id: 'climate.living_room',
        state: 'heat',
        attributes: {
          temperature: 20,
          current_temperature: 19,
          min_temp: 7,
          max_temp: 30,
        },
      },
    },
    config: {
      unit_system: {
        temperature: '°C',
      },
    },
    localize: (key: string) => key,
  }

  await card.updateComplete

  expect(
    card.shadowRoot
      ?.querySelector('ha-card')
      ?.classList.contains('standard-visuals')
  ).toBe(true)
  expect(
    card.shadowRoot
      ?.querySelector('.current-wrapper')
      ?.classList.contains('column')
  ).toBe(true)
  expect(
    (card.shadowRoot?.querySelector('button.increase ha-icon') as any)?.icon
  ).toBe('hass:chevron-up')
  expect(
    (card.shadowRoot?.querySelector('button.decrease ha-icon') as any)?.icon
  ).toBe('hass:chevron-down')
})

test('enhanced visuals off preserves explicitly configured row step layout', async () => {
  document.body.innerHTML = ''
  const card = createCard()
  document.body.appendChild(card)
  card.setConfig({
    entity: 'climate.living_room',
    header: false,
    control: false,
    enhanced_visuals: false,
    layout: { step: 'row' },
  } as any)
  card.hass = {
    states: {
      'climate.living_room': {
        entity_id: 'climate.living_room',
        state: 'heat',
        attributes: {
          temperature: 20,
          current_temperature: 19,
          min_temp: 7,
          max_temp: 30,
        },
      },
    },
    config: {
      unit_system: {
        temperature: '°C',
      },
    },
    localize: (key: string) => key,
  }

  await card.updateComplete

  expect(
    card.shadowRoot
      ?.querySelector('.current-wrapper')
      ?.classList.contains('row')
  ).toBe(true)
  expect(
    (card.shadowRoot?.querySelector('button.increase ha-icon') as any)?.icon
  ).toBe('mdi:plus')
  expect(
    (card.shadowRoot?.querySelector('button.decrease ha-icon') as any)?.icon
  ).toBe('mdi:minus')
  const children = Array.from(
    card.shadowRoot?.querySelector('.current-wrapper')?.children ?? []
  )
  expect(children.map((child) => child.className)).toEqual([
    expect.stringContaining('decrease'),
    expect.stringContaining('current--value'),
    expect.stringContaining('increase'),
  ])
})

test('temporarily missing main entity renders unavailable instead of throwing', async () => {
  document.body.innerHTML = ''
  const card = createCard()
  document.body.appendChild(card)
  card.setConfig({
    entity: 'climate.living_room',
    header: { name: 'Living Room' },
    control: ['hvac'],
  } as any)

  expect(() => {
    card.hass = {
      states: {},
      config: {
        unit_system: {
          temperature: '°C',
        },
      },
      localize: (key: string) => key,
    }
  }).not.toThrow()

  await card.updateComplete

  expect(card.shadowRoot?.textContent).toContain(
    'Entity not available: climate.living_room'
  )
})

test('temporarily missing configured entity attribute does not throw', async () => {
  document.body.innerHTML = ''
  const card = createCard()
  document.body.appendChild(card)
  card.setConfig({
    entity: 'climate.living_room',
    header: false,
    control: false,
    entities: [
      {
        entity: 'sensor.living_room_humidity',
        attribute: 'battery',
        name: 'Humidity Battery',
      },
    ],
  } as any)

  expect(() => {
    card.hass = {
      states: {
        'climate.living_room': {
          entity_id: 'climate.living_room',
          state: 'heat',
          attributes: {
            temperature: 20,
            current_temperature: 19,
            min_temp: 7,
            max_temp: 30,
          },
        },
      },
      config: {
        unit_system: {
          temperature: '°C',
        },
      },
      localize: (key: string) => key,
    }
  }).not.toThrow()

  await card.updateComplete

  expect((card.entities[0] as any).state).toBeUndefined()
  expect(card.shadowRoot?.textContent).not.toContain('Humidity Battery')
})

test('legacy aliases warn without warning for version 3 configs', () => {
  document.body.innerHTML = ''
  const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined)
  const card = createCard()

  card.setConfig({
    entity: 'climate.living_room',
    current_temperature_entity: 'sensor.living_room_temperature',
    sensors: [{ entity: 'sensor.living_room_humidity' }],
    layout: {
      sensors: { type: 'table', labels: true },
    },
    version: 3,
  } as any)

  expect(warn).toHaveBeenCalledWith(
    expect.stringContaining('"current_temperature_entity" is legacy but supported')
  )
  expect(warn).toHaveBeenCalledWith(
    expect.stringContaining('"sensors" is legacy but supported')
  )
  expect(warn).toHaveBeenCalledWith(
    expect.stringContaining('"layout.sensors" is legacy but supported')
  )
  expect(warn).not.toHaveBeenCalledWith(expect.stringContaining('version'))

  warn.mockRestore()
})

test('setpoint tap opens the configured entity more-info by default', async () => {
  jest.useFakeTimers()
  document.body.innerHTML = ''
  const card = createCard()
  document.body.appendChild(card)
  const moreInfo = jest.fn()
  card.addEventListener('hass-more-info', moreInfo)
  card.setConfig({
    entity: 'climate.living_room',
    header: false,
    control: false,
  } as any)
  card.hass = {
    states: {
      'climate.living_room': {
        entity_id: 'climate.living_room',
        state: 'heat',
        attributes: {
          temperature: 20,
          current_temperature: 19,
          min_temp: 7,
          max_temp: 30,
        },
      },
    },
    config: {
      unit_system: {
        temperature: '°C',
      },
    },
    localize: (key: string) => key,
  }

  await card.updateComplete
  ;(card.shadowRoot?.querySelector('.current--value') as HTMLElement).click()
  jest.advanceTimersByTime(SimpleThermostat.DOUBLE_TAP_MS)

  expect(moreInfo).toHaveBeenCalledTimes(1)
  expect(moreInfo.mock.calls[0][0].detail).toEqual({
    entityId: 'climate.living_room',
  })
  jest.useRealTimers()
})
