import { CardConfig } from './card'

type LayoutConfig = NonNullable<CardConfig['layout']>

type ImportableLayout = LayoutConfig & {
  sensors?: LayoutConfig['entities']
}

type ImportableCardConfig = CardConfig & {
  current_temperature_entity?: CardConfig['current_value_entity']
  sensors?: CardConfig['entities']
  version?: number
  layout?: ImportableLayout
}

export default function normalizeConfig(
  config: ImportableCardConfig
): CardConfig {
  const normalized: ImportableCardConfig = {
    ...config,
    layout: config.layout ? { ...config.layout } : undefined,
  }

  if (
    !normalized.current_value_entity &&
    normalized.current_temperature_entity
  ) {
    normalized.current_value_entity = normalized.current_temperature_entity
  }

  if (
    typeof normalized.entities === 'undefined' &&
    typeof normalized.sensors !== 'undefined'
  ) {
    normalized.entities = normalized.sensors
  }

  if (
    normalized.layout &&
    typeof normalized.layout.entities === 'undefined' &&
    typeof normalized.layout.sensors !== 'undefined'
  ) {
    normalized.layout.entities = normalized.layout.sensors
  }

  delete normalized.current_temperature_entity
  delete normalized.sensors
  delete normalized.layout?.sensors
  delete normalized.version

  return normalized as CardConfig
}
