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
    return {}
  }

  // Always use adapter as the base source of truth
  const base = adapter.getSetpoints(attributes)

  if (setpoints) {
    return Object.entries(setpoints).reduce((result, [name, sp]) => {
      if (sp?.hide) return result

      // Prefer adapter values, fallback to raw attributes only if needed
      result[name] = base?.[name] ?? attributes?.[name]
      return result
    }, {} as Record<string, any>)
  }

  return base
}