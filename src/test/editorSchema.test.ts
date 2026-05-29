import SimpleThermostatEditor, { buildSchema } from '../editor'

const performAction = () => undefined

function schemaNames(schema: Array<Record<string, any>>): Array<string> {
  return schema
    .flatMap((item) => [
      item.name,
      ...(Array.isArray(item.schema) ? schemaNames(item.schema) : []),
    ])
    .filter(Boolean)
}

test('fan editor does not show current value entity picker', () => {
  const names = schemaNames(
    buildSchema({ entity: 'fan.range_hood' } as any, {
      performAction,
      states: {
        'fan.range_hood': {
          entity_id: 'fan.range_hood',
          state: 'off',
          attributes: { percentage: 0, preset_modes: ['low', 'high'] },
        },
      },
    })
  )

  expect(names).not.toContain('current_value_entity')
})

test('visual editor exposes only simple card-owned action selectors', () => {
  const schema = buildSchema({ entity: 'climate.living_room' } as any, {
    performAction,
    states: {
      'climate.living_room': {
        entity_id: 'climate.living_room',
        state: 'heat',
        attributes: { hvac_modes: ['off', 'heat'], temperature: 20 },
      },
    },
  })
  const names = schemaNames(schema)

  expect(names).toEqual(
    expect.arrayContaining([
      'tap_action.action',
      'hold_action.action',
      'double_tap_action.action',
      'enhanced_visuals',
    ])
  )
  expect(names).not.toContain('styles')
})

test('fan editor only shows controls supported by the selected fan', () => {
  const names = schemaNames(
    buildSchema({ entity: 'fan.range_hood' } as any, {
      performAction,
      states: {
        'fan.range_hood': {
          entity_id: 'fan.range_hood',
          state: 'off',
          attributes: { preset_modes: ['low', 'high'] },
        },
      },
    })
  )

  expect(names).toEqual(
    expect.arrayContaining(['control.preset', 'control.state'])
  )
  expect(names).not.toEqual(
    expect.arrayContaining(['control.direction', 'control.oscillating'])
  )
})

test('setpoint controls are hidden when the selected fan has no percentage support', () => {
  const names = schemaNames(
    buildSchema({ entity: 'fan.basic' } as any, {
      performAction,
      states: {
        'fan.basic': {
          entity_id: 'fan.basic',
          state: 'off',
          attributes: {},
        },
      },
    })
  )

  expect(names).not.toContain('hide_setpoint')
  expect(names).not.toContain('layout.step')
  expect(names).not.toContain('step_size')
})

test('vane controls only show when the selected entity exposes vane attributes', () => {
  const baseHass = {
    performAction,
    states: {
      'climate.basic': {
        entity_id: 'climate.basic',
        state: 'cool',
        attributes: { hvac_modes: ['off', 'cool'] },
      },
      'climate.vanes': {
        entity_id: 'climate.vanes',
        state: 'cool',
        attributes: {
          hvac_modes: ['off', 'cool'],
          vane_horizontal_positions: ['left', 'right'],
          vane_vertical_positions: ['top', 'bottom'],
        },
      },
    },
  }

  expect(
    schemaNames(buildSchema({ entity: 'climate.basic' } as any, baseHass))
  ).not.toEqual(
    expect.arrayContaining(['control.vane_horizontal', 'control.vane_vertical'])
  )

  expect(
    schemaNames(buildSchema({ entity: 'climate.vanes' } as any, baseHass))
  ).toEqual(
    expect.arrayContaining(['control.vane_horizontal', 'control.vane_vertical'])
  )
})

test('entity layout controls only show when extra entities are configured', () => {
  const hass = {
    performAction,
    states: {
      'climate.living_room': {
        entity_id: 'climate.living_room',
        state: 'heat',
        attributes: { hvac_modes: ['off', 'heat'], temperature: 20 },
      },
    },
  }

  expect(
    schemaNames(buildSchema({ entity: 'climate.living_room' } as any, hass))
  ).not.toEqual(
    expect.arrayContaining(['layout.entities.type', 'layout.entities.labels'])
  )

  expect(
    schemaNames(
      buildSchema(
        {
          entity: 'climate.living_room',
          entities: [{ entity: 'sensor.temperature' }],
        } as any,
        hass
      )
    )
  ).toEqual(
    expect.arrayContaining(['layout.entities.type', 'layout.entities.labels'])
  )
})

test('toggle icon control only shows after a header toggle entity is configured', () => {
  const hass = {
    performAction,
    states: {
      'climate.living_room': {
        entity_id: 'climate.living_room',
        state: 'heat',
        attributes: { hvac_modes: ['off', 'heat'], temperature: 20 },
      },
    },
  }

  expect(
    schemaNames(buildSchema({ entity: 'climate.living_room' } as any, hass))
  ).not.toContain('toggle.icon')

  expect(
    schemaNames(
      buildSchema(
        {
          entity: 'climate.living_room',
          header: { toggle: { entity: 'switch.living_room' } },
        } as any,
        hass
      )
    )
  ).toContain('toggle.icon')
})

test('enhanced visuals toggle stays off from a partial form update', () => {
  if (!customElements.get('simple-thermostat-editor-test')) {
    customElements.define(
      'simple-thermostat-editor-test',
      SimpleThermostatEditor
    )
  }
  const editor = new SimpleThermostatEditor()
  editor.setConfig({
    entity: 'climate.living_room',
    header: { name: 'Living Room' },
    layout: {
      step: 'row',
      mode: { names: true, icons: true, headings: false },
    },
  } as any)
  editor.hass = {
    performAction,
    states: {
      'climate.living_room': {
        entity_id: 'climate.living_room',
        state: 'heat',
        attributes: { hvac_modes: ['off', 'heat'], temperature: 20 },
      },
    },
  } as any

  const updated = editor._applyFormChange({
    enhanced_visuals: false,
  } as any)

  expect(updated.enhanced_visuals).toBe(false)
  expect(updated.entity).toBe('climate.living_room')
  expect(updated.header).toEqual({ name: 'Living Room' })
  expect(updated.layout?.step).toBe('row')
})

test('editor updates its local form data when enhanced visuals changes', () => {
  if (!customElements.get('simple-thermostat-editor-test')) {
    customElements.define(
      'simple-thermostat-editor-test',
      SimpleThermostatEditor
    )
  }
  const editor = new SimpleThermostatEditor()
  const configChanged = jest.fn()
  editor.addEventListener('config-changed', configChanged)
  editor.setConfig({
    entity: 'climate.living_room',
    header: { name: 'Living Room' },
  } as any)
  editor.hass = {
    performAction,
    states: {
      'climate.living_room': {
        entity_id: 'climate.living_room',
        state: 'heat',
        attributes: { hvac_modes: ['off', 'heat'], temperature: 20 },
      },
    },
  } as any

  editor._valueChanged({
    detail: { value: { enhanced_visuals: false } },
  } as CustomEvent)

  expect(editor.config.enhanced_visuals).toBe(false)
  expect(editor._buildFormData().enhanced_visuals).toBe(false)
  expect(configChanged).toHaveBeenCalledWith(
    expect.objectContaining({
      detail: expect.objectContaining({
        config: expect.objectContaining({ enhanced_visuals: false }),
      }),
    })
  )
})
