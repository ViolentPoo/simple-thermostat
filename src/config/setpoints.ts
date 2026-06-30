import { EntityAdapter } from '../adapters'
import { climateAdapter } from '../adapters/climate'

export interface Setpoint {
  hide?: boolean
}

export type Setpoints = Record<string, Setpoint>

export default function parseSetpoints(
  setpoints: Setpoints | false | undefined,
  attributes: any,
  adapter: EntityAdapter = climateAdapter
) {
  if (setpoints === false) {
    console.log('[simple-thermostat debug]', {
      source: 'parseSetpoints',
      setpoints,
      attributes,
      adapterSetpoints: {},
      parsedValues: {},
    })
    return {}
  }

  // Always use adapter as base structure
  const base = adapter.getSetpoints(attributes)
  const mode = attributes?.hvac_mode

  const hasExplicitSetpoints = setpoints && Object.keys(setpoints).length > 0

  // 🔥 FORCE MODE-BASED BEHAVIOR (NO temperature fallback anywhere)
  if (!hasExplicitSetpoints) {
    let result: Record<string, any> = {}

    if (mode === 'heat') {
      result = {
        target_temp_low: attributes?.target_temp_low ?? base?.target_temp_low,
      }
    } else if (mode === 'cool') {
      result = {
        target_temp_high: attributes?.target_temp_high ?? base?.target_temp_high,
      }
    } else if (mode === 'heat_cool') {
      result = {
        target_temp_low: attributes?.target_temp_low ?? base?.target_temp_low,
        target_temp_high: attributes?.target_temp_high ?? base?.target_temp_high,
      }
    } else {
      result = base?.temperature
        ? { temperature: base.temperature }
        : {}
    }

    console.log('[simple-thermostat debug]', {
      source: 'parseSetpoints (mode-based, no temperature fallback)',
      mode,
      attributes,
      adapterSetpoints: base,
      parsedValues: result,
    })

    return result
  }

  // Explicit user-defined setpoints (unchanged behavior but no temperature fallback)
  if (setpoints) {
    const parsedValues = Object.entries(setpoints).reduce((result, [name, sp]) => {
      if (sp?.hide) return result

      // Prefer target_temp_* or adapter values ONLY
      result[name] = base?.[name] ?? attributes?.[name]
      return result
    }, {} as Record<string, any>)

    console.log('[simple-thermostat debug]', {
      source: 'parseSetpoints (explicit mode)',
      setpoints,
      attributes,
      adapterSetpoints: base,
      parsedValues,
    })

    return parsedValues
  }

  console.log('[simple-thermostat debug]', {
    source: 'parseSetpoints (fallback base)',
    setpoints,
    attributes,
    adapterSetpoints: base,
    parsedValues: base,
  })

  return base
}