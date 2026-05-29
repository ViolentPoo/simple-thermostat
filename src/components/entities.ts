import formatNumber from '../formatNumber'
import renderInfoItem from './infoItem'
import { wrapEntities } from './templated'
import { appendUnit } from '../unitFormat'

export default function renderEntities({
  _hide,
  entity,
  unit,
  hass,
  entities,
  config,
  localize,
  openEntityPopover,
  adapter,
}) {
  const {
    state,
    attributes: { hvac_action: action },
  } = entity

  const currentValueEntityId =
    config.current_value_entity ?? config.current_temperature_entity
  const currentValueEntity = currentValueEntityId
    ? hass.states[currentValueEntityId]
    : entity
  const current = currentValueEntityId
    ? currentValueEntity?.state
    : adapter.getCurrentValue(entity.attributes)

  const showLabels =
    (config?.layout?.entities ?? config?.layout?.sensors)?.labels ?? true
  let stateString =
    typeof hass.formatEntityState === 'function'
      ? hass.formatEntityState(entity)
      : localize(state, `component.${adapter.getLocalizationDomain()}.state._.`)
  if (action) {
    const actionString =
      typeof hass.formatEntityAttributeValue === 'function'
        ? hass.formatEntityAttributeValue(entity, 'hvac_action')
        : localize(action, 'state_attributes.climate.hvac_action.')
    stateString = actionString
  }
  const entityHtml = [
    renderInfoItem({
      hide: _hide.temperature || current === null || typeof current === 'undefined',
      state: appendUnit(formatNumber(current, {
        ...config,
        locale: hass.locale,
      }), unit),
      hass,
      openEntityPopover,
      details: {
        heading: showLabels
          ? config?.label?.temperature ?? localize('ui.card.climate.currently')
          : false,
        tooltip: currentValueEntity?.attributes?.friendly_name ?? currentValueEntityId,
        entity: currentValueEntityId ?? config.entity,
      },
    }),
    renderInfoItem({
      hide: _hide.state,
      state: stateString,
      hass,
      openEntityPopover,
      details: {
        heading: showLabels
          ? config?.label?.state ??
            localize('ui.panel.lovelace.editor.card.generic.state')
          : false,
        entity: config.entity,
      },
    }),
    ...(entities.map(({ name, state, ...rest }) => {
      return renderInfoItem({
        state,
        hass,
        localize,
        openEntityPopover,
        details: {
          ...rest,
          heading: showLabels && name,
          tooltip: name,
        },
      })
    }) || null),
  ].filter((it) => it !== null)

  return wrapEntities(config, entityHtml)
}
