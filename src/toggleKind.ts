function safeClass(value: unknown) {
  return String(value ?? '').replace(/[^a-z0-9_-]/gi, '')
}

const SEMANTIC_KIND_PATTERNS: Array<[string, RegExp]> = [
  ['heat', /\b(heat|heater|furnace|radiator|boiler|water[_ -]?heater)\b/],
  ['cool', /\b(cool|cooling|ac|a\/c|air[_ -]?conditioner|snowflake)\b/],
  ['dry', /\b(dry|drying|dehumidifier|dehumidify)\b/],
  ['water-percent', /\b(humidifier|humidify|humidity)\b/],
  ['fan', /\b(fan|blower)\b/],
  ['lightbulb', /\b(light|lamp|bulb)\b/],
]

const LOCALIZED_KIND_KEYS: Record<string, string[]> = {
  heat: [
    'component.climate.state._.heat',
    'state_attributes.climate.hvac_action.heating',
  ],
  cool: [
    'component.climate.state._.cool',
    'state_attributes.climate.hvac_action.cooling',
  ],
  dry: [
    'component.climate.state._.dry',
    'state_attributes.humidifier.action.drying',
  ],
  fan: ['component.fan.entity_component._.name'],
  lightbulb: ['component.light.entity_component._.name'],
  'water-percent': [
    'component.humidifier.entity_component._.name',
    'state_attributes.humidifier.action.humidifying',
  ],
}

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[.:]/g, ' ')
}

function getLocalizedKindTerms(hass): Array<[string, string]> {
  if (typeof hass?.localize !== 'function') return []

  return Object.entries(LOCALIZED_KIND_KEYS).flatMap(([kind, keys]) =>
    keys
      .map((key) => hass.localize(key))
      .filter((value) => value && !keys.includes(value))
      .map((value) => [kind, normalizeText(String(value))] as [string, string])
  )
}

function getKindFromText(text: string, hass?): string {
  const normalized = text.toLowerCase().replace(/[.:]/g, ' ')
  const localizedMatch = getLocalizedKindTerms(hass).find(([, term]) => {
    if (!term) return false
    return normalized === term || normalized.includes(term)
  })

  if (localizedMatch) return localizedMatch[0]

  const match = SEMANTIC_KIND_PATTERNS.find(([, pattern]) =>
    pattern.test(normalized)
  )

  return match?.[0] ?? ''
}

function getKindFromIcon(icon?: string | false): string {
  if (typeof icon !== 'string' || !icon) return ''

  const kind = safeClass(icon.replace(/^[a-z]+:/, ''))
  const semanticKind = getKindFromText(kind.replace(/-/g, ' '))

  if (semanticKind) return semanticKind

  if (
    [
      'fire',
      'radiator',
      'heat-wave',
      'heating-coil',
      'water-boiler',
      'water-boiler-auto',
      'water-boiler-off',
    ].includes(kind)
  ) {
    return 'heat'
  }

  if (['snowflake', 'air-conditioner'].includes(kind)) return 'cool'
  if (kind === 'fan') return 'fan'
  if (kind.includes('light')) return 'lightbulb'
  if (['water-percent', 'air-humidifier'].includes(kind)) return 'water-percent'
  if (['air-humidifier-off'].includes(kind)) return 'water-percent'

  return kind
}

function getKindFromEntity(entity?: any): string {
  const entityId = entity?.entity_id
  const domain = typeof entityId === 'string' ? entityId.split('.')[0] : ''
  const deviceClass = entity?.attributes?.device_class

  if (domain === 'light') return 'lightbulb'
  if (domain === 'fan') return 'fan'

  if (domain === 'humidifier') {
    if (deviceClass === 'dehumidifier') return 'dry'
    return 'water-percent'
  }

  if (deviceClass === 'heat' || deviceClass === 'heater') return 'heat'
  if (deviceClass === 'cold' || deviceClass === 'cooling') return 'cool'
  if (deviceClass === 'moisture' || deviceClass === 'humidity')
    return 'water-percent'

  return ''
}

export function getToggleKind({
  icon,
  label,
  entity,
  hass,
}: {
  icon?: string | false
  label?: string
  entity?: any
  hass?: any
}): string {
  const iconKind = getKindFromIcon(icon)
  if (iconKind) return iconKind

  const entityKind = getKindFromEntity(entity)
  if (entityKind) return entityKind

  const text = [label, entity?.entity_id, entity?.attributes?.friendly_name]
    .filter(Boolean)
    .join(' ')

  return getKindFromText(text, hass)
}

export function getToggleKindClass(kind: string): string {
  return kind ? `toggle-${kind}` : ''
}
