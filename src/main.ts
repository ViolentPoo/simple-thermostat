import { LitElement, html } from 'lit'
import { property } from 'lit/decorators.js'
import { nothing } from 'lit'
import debounce from 'debounce-fn'
import { name as CARD_NAME } from '../package.json'

import isEqual from './isEqual'
import styles from './styles.css'

import formatNumber from './formatNumber'
import fireEvent from './fireEvent'
import renderHeader from './components/header'
import renderTemplated, { wrapEntities } from './components/templated'
import renderEntities from './components/entities'
import renderModeType from './components/modeType'

import parseHeader, { HeaderData, MODE_ICONS } from './config/header'
import parseSetpoints from './config/setpoints'
import parseService, { Service } from './config/service'

import { CardConfig, ModeValue, ModeControlObject, MODES } from './config/card'

import {
  ControlMode,
  ControlModeOption,
  LooseObject,
  Entity,
  PreparedEntity,
  HASS,
  HVAC_MODES,
} from './types'

interface HANode extends Element {
  hass: any
}

const DEBOUNCE_TIMEOUT = 500
const STEP_SIZE = 0.5
const DECIMALS = 1

const MODE_TYPES: Array<string> = Object.values(MODES)

const MODES_WITH_POSITIONS = [MODES.VANE_HORIZONTAL, MODES.VANE_VERTICAL]

function getModeOptionsKey(type: string): string {
  if (type === MODES.DIRECTION) return 'direction'
  if (type === MODES.OSCILLATING) return 'oscillating'
  if (type === MODES.MODE) return 'available_modes'

  return MODES_WITH_POSITIONS.includes(type as MODES)
    ? `${type}_positions`
    : `${type}_modes`
}

const DEFAULT_CONTROL = {
  climate: [MODES.HVAC, MODES.PRESET],
  fan: [MODES.PRESET, MODES.DIRECTION, MODES.OSCILLATING],
  humidifier: [MODES.MODE],
}

const ICONS = {
  UP: 'hass:chevron-up',
  DOWN: 'hass:chevron-down',
  PLUS: 'mdi:plus',
  MINUS: 'mdi:minus',
}

type ModeIcons = {
  [key: string]: string
}

interface ModeOptions {
  names?: boolean
  icons?: boolean
  headings?: boolean
}

const DEFAULT_HIDE = {
  temperature: false,
  state: false,
}

function getConfiguredEntities(config: CardConfig) {
  return config.entities ?? config.sensors ?? []
}

function shouldShowModeControl(
  type: string,
  modeOption: string | boolean,
  config: Partial<ModeControlObject>
) {
  const modeKey = String(modeOption)

  if (typeof config[modeKey] === 'object') {
    const obj = config[modeKey] as ModeValue
    return obj.include !== false
  }

  const hasExplicitConfig = Object.keys(config).some(
    (key) => !key.startsWith('_')
  )
  const hideUnlistedModes = type === MODES.PRESET

  return config?.[modeKey] ?? !(hideUnlistedModes && hasExplicitConfig)
}

function getModeList(
  type: string,
  attributes: LooseObject,
  specification: Partial<ModeControlObject> = {}
) {
  let modeOptions = attributes[getModeOptionsKey(type)]
  if (type === MODES.DIRECTION && attributes.direction) {
    modeOptions = ['forward', 'reverse']
  } else if (
    type === MODES.OSCILLATING &&
    typeof attributes.oscillating === 'boolean'
  ) {
    modeOptions = [false, true]
  }
  if (!Array.isArray(modeOptions)) {
    return []
  }

  return modeOptions
    .filter((modeOption) => shouldShowModeControl(type, modeOption, specification))
    .map((modeOption) => {
      const modeKey = String(modeOption)
      const values =
        typeof specification[modeKey] === 'object'
          ? specification[modeKey]
          : ({} as {})
      return {
        icon: MODE_ICONS[modeKey],
        value: modeKey,
        name: modeKey,
        ...values,
      }
    })
}

interface Values {
  [key: string]: number | string
}

export default class SimpleThermostat extends LitElement {
  static get styles() {
    return styles
  }

  @property()
  config: CardConfig
  @property()
  header: false | HeaderData
  @property()
  service: Service
  @property()
  modes: Array<ControlMode> = []
  _hass: HASS = {}
  @property()
  entity: LooseObject
  @property()
  entities: Array<Entity | PreparedEntity> = []
  @property()
  showEntities: boolean = true
  @property()
  name: string | false = ''
  stepSize = STEP_SIZE
  @property({
    type: Object,
  })
  _values: Values = {}
  @property()
  _updatingValues: boolean = false
  @property()
  _hide = DEFAULT_HIDE

  _debouncedSetTemperature = debounce(
    (values: object) => {
      const { domain, service, data = {} } = this.service
      this._hass.callService(domain, service, {
        entity_id: this.config.entity,
        ...data,
        ...values,
      })
    },
    {
      wait: DEBOUNCE_TIMEOUT,
    }
  )

  static getConfigElement() {
    return window.document.createElement(`${CARD_NAME}-editor`)
  }

  setConfig(config: CardConfig) {
    this.config = {
      decimals: DECIMALS,
      ...config,
    }
  }

  updated() {
    super.connectedCallback()
    const patchHass: Array<HANode> = Array.from(
      this.renderRoot.querySelectorAll('[with-hass]')
    )
    for (const child of Array.from(patchHass)) {
      // Forward attributes to properties
      Array.from(child.attributes).forEach((attr) => {
        if (attr.name.startsWith('fwd-')) {
          child[attr.name.replace('fwd-', '')] = attr.value
        }
      })
      // Always forward hass
      child.hass = this._hass
    }
  }

  set hass(hass: any) {
    if (!this.config.entity) {
      return
    }

    if (!hass?.states) {
      return
    }

    const entity = hass.states[this.config.entity]
    if (!entity) {
      return
    }

    this._hass = hass
    if (this.entity !== entity) {
      this.entity = entity
    }

    const entityDomain = this.config.entity.split('.')[0]

    this.header = parseHeader(this.config.header, entity, hass)
    this.service = parseService(this.config?.service ?? false, entityDomain)

    const attributes = entity.attributes

    let values = parseSetpoints(
      this.config?.setpoints ?? null,
      attributes,
      entityDomain
    )

    // If we are updating the values, and they are now equal
    // we can safely assume we've been able to update the set points
    // in HA and remove the updating flag
    // If we are not updating we take the values we get from HA
    // because it means they changed elsewhere
    if (this._updatingValues && isEqual(values, this._values)) {
      this._updatingValues = false
    } else if (!this._updatingValues) {
      this._values = values
    }

    const supportedModeType = (type: string) =>
      MODE_TYPES.includes(type) &&
      typeof attributes[getModeOptionsKey(type)] !== 'undefined'
    const buildBasicModes = (items: any) => {
      return items.filter(supportedModeType).map((type: string) => ({
        type,
        hide_when_off: false,
        list: getModeList(type, attributes),
      }))
    }

    let controlModes: Array<Partial<ControlMode>> = []
    if (this.config.control === false) {
      controlModes = []
    } else if (Array.isArray(this.config.control)) {
      controlModes = buildBasicModes(this.config.control)
    } else if (typeof this.config.control === 'object') {
      const entries = Object.entries(this.config.control)
      if (entries.length > 0) {
        controlModes = entries
          .filter(([type]) => supportedModeType(type))
          .map(([type, definition]: [string, ModeControlObject]) => {
            const { _name, _hide_when_off, _icons, ...controlField } = definition
            return {
              type,
              hide_when_off: _hide_when_off,
              icons: _icons,
              name: _name,
              list: getModeList(type, attributes, controlField),
            }
          })
      } else {
        controlModes = buildBasicModes(
          DEFAULT_CONTROL[entityDomain] ?? DEFAULT_CONTROL.climate
        )
      }
    } else {
      controlModes = buildBasicModes(
        DEFAULT_CONTROL[entityDomain] ?? DEFAULT_CONTROL.climate
      )
    }

    // Decorate mode types with active value and set to this.modes
    this.modes = controlModes.map((values) => {
      if (values.type === MODES.HVAC) {
        const sortedList: Array<Partial<ControlMode>> = []
        const hvacModeValues = Object.values(HVAC_MODES) as Array<string>
        values.list.forEach((item: ControlModeOption) => {
          const index = hvacModeValues.indexOf(item.value)
          sortedList[index] = item
        })
        return {
          ...values,
          list: sortedList,
          mode: entity.state,
        } as ControlMode
      }
      const modeKey = MODES_WITH_POSITIONS.includes(values.type as MODES)
        ? values.type
        : values.type === MODES.DIRECTION || values.type === MODES.OSCILLATING
          ? values.type
          : `${values.type}_mode`
      const mode = attributes[modeKey]
      return { ...values, mode } as ControlMode
    })

    if (this.config.step_size) {
      this.stepSize = +this.config.step_size
    }

    if (this.config.hide) {
      this._hide = { ...this._hide, ...this.config.hide }
    }

    const configuredEntities = getConfiguredEntities(this.config)

    if (configuredEntities === false) {
      this.showEntities = false
    } else if (this.config.version === 3) {
      this.entities = []
      const customEntities = configuredEntities.map((entity, index) => {
        const entityId = entity?.entity ?? this.config.entity
        let context = this.entity
        if (entity?.entity) {
          context = this._hass.states[entity.entity]
        }
        return {
          id: entity?.id ?? String(index),
          label: entity?.label,
          template: entity.template,
          show: entity?.show !== false,
          entityId,
          context,
        } as PreparedEntity
      })
      const ids = customEntities.map((entity) => entity.id)
      const builtins = []
      if (!ids.includes('state')) {
        builtins.push({
          id: 'state',
          label: '{{ui.operation}}',
          template: '{{state.text}}',
          entityId: this.config.entity,
          context: this.entity,
        })
      }
      if (!ids.includes('temperature')) {
        const tempEntityId =
          this.config.current_value_entity ??
          this.config.current_temperature_entity ??
          this.config.entity
        const tempContext =
          this.config.current_value_entity || this.config.current_temperature_entity
            ? this._hass.states[tempEntityId]
            : this.entity
        builtins.push({
          id: 'temperature',
          label: '{{ui.currently}}',
          template: '{{current_temperature|formatNumber}}',
          entityId: tempEntityId,
          context: tempContext,
        })
      }
      this.entities = [...builtins, ...customEntities]
    } else if (configuredEntities) {
      this.entities = configuredEntities.map(
        ({ name, entity, attribute, unit = '', ...rest }) => {
          let state
          const names = [name]
          if (entity) {
            state = hass.states[entity]
            names.push(state?.attributes?.friendly_name)
            if (attribute) {
              state = state.attributes[attribute]
            }
          } else if (attribute && attribute in this.entity.attributes) {
            state = this.entity.attributes[attribute]
            names.push(attribute)
          }
          names.push(entity)

          return {
            ...rest,
            name: names.find((n) => !!n),
            state,
            entity,
            unit,
          } as Entity
        }
      )
    }
  }

  localize = (label: string, prefix = '') => {
    const key = `${prefix}${label}`
    return this._hass.localize(key) || label
  }

  render({ _hide, _values, _updatingValues, config, entity } = this) {
    const warnings = []
    if (this.stepSize < 1 && this.config.decimals === 0) {
      warnings.push(html`
        <hui-warning>
          Decimals is set to 0 and step_size is lower than 1. Decrementing a
          setpoint will likely not work. Change one of the settings to clear
          this warning.
        </hui-warning>
      `)
    }

    if (!entity) {
      return html`
        <hui-warning> Entity not available: ${config.entity} </hui-warning>
      `
    }

    const entityDomain = config.entity.split('.')[0]

    const {
      attributes: {
        min_temp: minTemp = null,
        max_temp: maxTemp = null,
        min_humidity: minHumidity = null,
        max_humidity: maxHumidity = null,
        hvac_action: action,
      },
    } = entity

    const minValue = entityDomain === 'fan'
      ? 0
      : entityDomain === 'humidifier'
        ? minHumidity
        : minTemp
    const maxValue = entityDomain === 'fan'
      ? 100
      : entityDomain === 'humidifier'
        ? maxHumidity
        : maxTemp

    const unit = this.getUnit()

    const stepLayout = this.config?.layout?.step ?? 'column'
    const row = stepLayout === 'row'

    const classes = [!this.header && 'no-header', action].filter((cx) => !!cx)

    let entitiesHtml
    if (this.config.version === 3) {
      entitiesHtml = this.entities
        .filter((spec: PreparedEntity) => spec.show !== false)
        .map((spec: PreparedEntity) => {
          return renderTemplated({
            ...spec,
            variables: this.config.variables,
            hass: this._hass,
            config: this.config,
            localize: this.localize,
            openEntityPopover: this.openEntityPopover,
          })
        })
      entitiesHtml = wrapEntities(this.config, entitiesHtml)
    } else {
      entitiesHtml = this.showEntities
        ? renderEntities({
            _hide: this._hide,
            unit,
            hass: this._hass,
            entity: this.entity,
            entities: this.entities,
            config: this.config,
            localize: this.localize,
            openEntityPopover: this.openEntityPopover,
          })
        : ''
    }
    return html`
      <ha-card class="${classes.join(' ')}">
        ${warnings}
        ${renderHeader({
          header: this.header,
          toggleEntityChanged: this.toggleEntityChanged,
          entity: this.entity,
          openEntityPopover: this.openEntityPopover,
        })}
        <section class="body">
          ${entitiesHtml}
          ${Object.entries(_values).map(([field, value]) => {
            const hasValue = ['string', 'number'].includes(typeof value)
            const showUnit = unit !== false && hasValue
            return html`
              <div class="current-wrapper ${stepLayout}">
                <ha-icon-button
                  ?disabled=${maxValue !== null && value >= maxValue}
                  class="thermostat-trigger"
                  icon=${row ? ICONS.PLUS : ICONS.UP}
                  @click="${() => this.setTemperature(this.stepSize, field)}"
                >
                  <ha-icon .icon=${row ? ICONS.PLUS : ICONS.UP}></ha-icon>
                </ha-icon-button>

                <h3
                  @click=${() => this.openEntityPopover()}
                  class=${_updatingValues
                    ? 'current--value updating'
                    : 'current--value'}
                >
                  ${formatNumber(value, {
                    ...config,
                    fallback:
                      entity.state === HVAC_MODES.OFF
                        ? 'OFF'
                        : config.fallback,
                    locale: this._hass.locale,
                  })}
                  ${showUnit
                    ? html`<span class="current--unit">${unit}</span>`
                    : nothing}
                </h3>
                <ha-icon-button
                  ?disabled=${minValue !== null && value <= minValue}
                  class="thermostat-trigger"
                  icon=${row ? ICONS.MINUS : ICONS.DOWN}
                  @click="${() => this.setTemperature(-this.stepSize, field)}"
                >
                  <ha-icon .icon=${row ? ICONS.MINUS : ICONS.DOWN}></ha-icon>
                </ha-icon-button>
              </div>
            `
          })}
        </section>

        ${this.modes.map((mode) =>
          renderModeType({
            state: entity.state,
            mode,
            localize: this.localize,
            modeOptions: this.config?.layout?.mode ?? {},
            setMode: this.setMode,
          })
        )}
      </ha-card>
    `
  }

  toggleEntityChanged = (ev: Event, entityId?: string) => {
    if (!this.header || !entityId) return

    const el = ev.target as HTMLInputElement
    this._hass.callService(
      'homeassistant',
      el.checked ? 'turn_on' : 'turn_off',
      {
        entity_id: entityId,
      }
    )
  }

  setTemperature(change: number, field: string) {
    this._updatingValues = true
    const previousValue = this._values[field]
    const newValue = Number(previousValue) + change
    const { decimals } = this.config

    this._values = {
      ...this._values,
      [field]: +formatNumber(newValue, { decimals }),
    }
    this._debouncedSetTemperature(this._values)
  }

  setMode = (type: string, mode: string) => {
    if (type && mode) {
      if (type === MODES.DIRECTION || type === MODES.OSCILLATING) {
        this._hass.callService('fan', `set_${type}`, {
          entity_id: this.config.entity,
          [type]: type === MODES.OSCILLATING ? mode === 'true' : mode,
        })
      } else if (type === MODES.MODE) {
        this._hass.callService('humidifier', 'set_mode', {
          entity_id: this.config.entity,
          mode,
        })
      } else if (MODES_WITH_POSITIONS.includes(type as MODES)) {
        this._hass.callService('climate', `set_${type}`, {
          entity_id: this.config.entity,
          [`${type}`]: mode,
        })
      } else {
        this._hass.callService('climate', `set_${type}_mode`, {
          entity_id: this.config.entity,
          [`${type}_mode`]: mode,
        })
      }
      fireEvent(this, 'haptic', 'light')
    } else {
      fireEvent(this, 'haptic', 'failure')
    }
  }

  openEntityPopover = (entityId = null) => {
    fireEvent(this, 'hass-more-info', {
      entityId: entityId || this.config.entity,
    })
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3
  }

  getUnit(): string | boolean {
    if (['boolean', 'string'].includes(typeof this.config.unit)) {
      return this.config?.unit
    }

    const entityDomain = this.config.entity.split('.')[0]
    if (entityDomain === 'fan' || entityDomain === 'humidifier') {
      return '%'
    }

    return this._hass.config?.unit_system?.temperature ?? false
  }
}
