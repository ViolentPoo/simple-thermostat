export interface Service {
  domain: string
  service: string
  data?: {
    [key: string]: any
  }
}

import { EntityAdapter } from '../adapters'
import { climateAdapter } from '../adapters/climate'

export default function parseService(
  config: false | Service,
  adapter: EntityAdapter = climateAdapter
): Service {
  if (!config) {
    return adapter.getSetpointService()
  }
  return config
}
