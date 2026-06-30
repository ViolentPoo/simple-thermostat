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

  // Always use adapter as the base source of truth
  const base = adapter.getSetpoints(attributes)

  // 🔥 FIX: prevent unintended dual-setpoint rendering when user did not configure setpoints
  const hasExplicitSetpoints = setpoints && Object.keys(setpoints).length > 0

  if (!hasExplicitSetpoints) {
    const temperature =
      base.temperature ??
      base.target_temp_high ??
      base.target_temp_low ??
      attributes?.temperature ?? null

    const singleValues = temperature !== null && temperature !== undefined
      ? { temperature }
      : {}

    console.log('[simple-thermostat debug]', {
      source: 'parseSetpoints (forced single mode)',
      attributes,
      adapterSetpoints: base,
      parsedValues: singleValues,
    })

    return singleValues
  }

  if (setpoints) {
    const parsedValues = Object.entries(setpoints).reduce((result, [name, sp]) => {
      if (sp?.hide) return result

      // Prefer adapter values, fallback to raw attributes only if needed
      result[name] = base?.[name] ?? attributes?.[name]
      return result
    }, {} as Record<string, any>)

    console.log('[simple-thermostat debug]', {
      source: 'parseSetpoints',
      setpoints,
      attributes,
      adapterSetpoints: base,
      parsedValues,
    })

    return parsedValues
  }

  console.log('[simple-thermostat debug]', {
    source: 'parseSetpoints',
    setpoints,
    attributes,
    adapterSetpoints: base,
    parsedValues: base,
  })

  return base
}