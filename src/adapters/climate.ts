import { LooseObject } from '../types'
import getEntityType, { DUAL, SINGLE } from '../getEntityType'
import { EntityAdapter, Range, SetpointService } from './types'

export const climateAdapter: EntityAdapter = {
  getSetpoints(attributes: LooseObject): Record<string, any> {
    if (getEntityType(attributes) === DUAL) {
      return {
        target_temp_low:
          attributes.target_temp_low ?? attributes.target_temperature_low,
        target_temp_high:
          attributes.target_temp_high ?? attributes.target_temperature_high,
      }
    }

    return {
      temperature: attributes.temperature,
    }
  },

  getRange(attributes: LooseObject): Range {
    return {
      min: attributes?.min_temp ?? null,
      max: attributes?.max_temp ?? null,
      step: attributes?.target_temp_step ?? null,
    }
  },

  getCurrentValue(attributes: LooseObject) {
    return attributes?.current_temperature ?? null
  },

  getCurrentValueTemplate(): string {
    return '{{current_temperature|formatNumber}}'
  },

  getSetpointService(): SetpointService {
    return { domain: 'climate', service: 'set_temperature' }
  },

  getModeService(type: string): string {
    if (type === 'vane_horizontal' || type === 'vane_vertical') {
      return `set_${type}`
    }
    return `set_${type}_mode`
  },

  getModePayloadKey(type: string): string {
    if (type === 'vane_horizontal' || type === 'vane_vertical') return type
    return `${type}_mode`
  },

  getModeAttribute(type: string): string {
    if (type === 'vane_horizontal' || type === 'vane_vertical') {
      return `${type}_positions`
    }
    return `${type}_modes`
  },

  getDefaultControl(): string[] {
    return ['hvac', 'preset']
  },

  getLocalizationDomain(): string {
    return 'climate'
  },
}
