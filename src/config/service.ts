export interface Service {
  domain: string
  service: string
  data?: {
    [key: string]: string
  }
}

const DEFAULT_SERVICES = {
  climate: 'set_temperature',
  fan: 'set_percentage',
  humidifier: 'set_humidity',
}

export default function parseServie(
  config: false | Service,
  entityDomain = 'climate'
): Service {
  if (!config) {
    return {
      domain: entityDomain,
      service: DEFAULT_SERVICES[entityDomain] ?? 'set_temperature',
    }
  }
  return config
}
