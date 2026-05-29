import { LitElement, html, nothing } from 'lit'
import { state } from 'lit/decorators.js'
import debounce from 'debounce-fn'
import { name as CARD_NAME } from '../package.json'

import { getAdapter, EntityAdapter } from './adapters'
import isEqual from './isEqual'
import styles from './styles.css'
import sortHvacModes from './sortHvacModes'
import sortFanModes from './sortFanModes'

import formatNumber from './formatNumber'
import fireEvent from './fireEvent'
import renderHeader from './components/header'
import renderTemplated, { wrapEntities } from './components/templated'
import renderEntities from './components/entities'
import renderModeType from './components/modeType'
import { appendUnit } from './unitFormat'

import parseHeader, {
  getModeIcon,
  getModeName,
  HeaderData,
} from './config/header'
import parseSetpoints from './config/setpoints'
import parseService, { Service } from './config/service'

import { CardConfig, ModeValue, ModeControlObject, MODES } from './config/card'

import {
  ControlMode,
  LooseObject,
  Entity,
  PreparedEntity,
  HASS,
  HVAC_MODES,
} from './types'

interface HANode extends Element {
  hass: HASS
}

const DEBOUNCE_TIMEOUT = 500
const STEP_SIZE = 0.5
const DECIMALS = 1
const UPDATING_TIMEOUT = 10000

const MODE_TYPES: Array<string> = Object.values(MODES)

const ICONS = {
  UP: 'hass:chevron-up',
  DOWN: 'hass:chevron-down',
  PLUS: 'mdi:plus',
  MINUS: 'mdi:minus',
}

const DEFAULT_HIDE = {
  temperature: false,
  state: false,
}

const CONTROL_ORDER = [
  MODES.PRESET,
  MODES.FAN,
  MODES.HVAC,
  MODES.SWING,
  MODES.SWING_HORIZONTAL,
  MODES.SWING_VERTICAL,
  MODES.VANE_HORIZONTAL,
  MODES.VANE_VERTICAL,
  MODES.DIRECTION,
  MODES.OSCILLATING,
  MODES.STATE,
]

function getConfiguredEntities(config: CardConfig) {
  return config.entities ?? config.sensors ?? []
}

function getTrackedEntityIds(config: CardConfig): Array<string> {
  const configuredEntities = getConfiguredEntities(config)
  const ids = [
    config.entity,
    config.current_value_entity ?? config.current_temperature_entity,
  ]

  if (Array.isArray(configuredEntities)) {
    ids.push(
      ...configuredEntities
        .map((entity) => entity?.entity)
        .filter((entityId) => !!entityId)
    )
  }

  if (config.header && typeof config.header === 'object') {
    ids.push(config.header.toggle?.entity)
    ids.push(
      ...(config.header.toggles ?? [])
        .map((toggle) => toggle?.entity)
        .filter((entityId) => !!entityId)
    )
    ids.push(
      ...(config.header.faults ?? [])
        .map((fault) => fault?.entity)
        .filter((entityId) => !!entityId)
    )
  }

  return Array.from(new Set(ids.filter((entityId) => !!entityId)))
}

const warnedLegacyConfigKeys = new Set<string>()

function warnLegacyConfigKey(key: string, replacement: string) {
  if (warnedLegacyConfigKeys.has(key)) return
  warnedLegacyConfigKeys.add(key)
  console.warn(
    `[simple-thermostat] "${key}" is legacy but supported. Prefer "${replacement}" for new configs.`
  )
}

function warnLegacyConfigAliases(config: CardConfig) {
  if (config.current_temperature_entity) {
    warnLegacyConfigKey('current_temperature_entity', 'current_value_entity')
  }
  if (typeof config.sensors !== 'undefined') {
    warnLegacyConfigKey('sensors', 'entities')
  }
  if (typeof config.layout?.sensors !== 'undefined') {
    warnLegacyConfigKey('layout.sensors', 'layout.entities')
  }
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
  adapter,
  specification: Partial<ModeControlObject> = {}
) {
  let modeOptions = attributes[adapter.getModeAttribute(type)]
  if (type === MODES.STATE) {
    modeOptions = ['off', 'on']
  } else if (type === MODES.DIRECTION && attributes.direction) {
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
    .filter((modeOption) =>
      shouldShowModeControl(type, modeOption, specification)
    )
    .map((modeOption) => {
      const modeKey = String(modeOption)
      const normalizedModeKey = modeKey.toLowerCase().replace(/\s+/g, '_')
      const values: ModeValue =
        typeof specification[modeKey] === 'object'
          ? specification[modeKey]
          : typeof specification[normalizedModeKey] === 'object'
            ? specification[normalizedModeKey]
            : {}
      return {
        ...values,
        icon: values.icon ?? getModeIcon(modeKey),
        value: modeKey,
        name:
          values.name === false
            ? modeKey
            : (values.name ?? getModeName(modeKey)),
      }
    })
}

function getCardStyle(entityDomain: string, attributes: LooseObject) {
  if (entityDomain !== 'fan') return ''

  const percentage = Number(attributes?.percentage)
  if (Number.isNaN(percentage)) return ''

  const normalizedPercentage = Math.min(Math.max(percentage, 0), 100)
  const fanSpinDuration = Math.max(
    0.9,
    3.2 - (normalizedPercentage / 100) * 2.1
  )

  return `--st-fan-spin-duration: ${fanSpinDuration.toFixed(2)}s;`
}

function supportsModeType(
  type: string,
  entityDomain: string,
  attributes: LooseObject,
  adapter: EntityAdapter
) {
  return (
    MODE_TYPES.includes(type) &&
    (type === MODES.STATE
      ? entityDomain === 'fan' || entityDomain === 'humidifier'
      : typeof attributes[adapter.getModeAttribute(type)] !== 'undefined')
  )
}

function buildBasicControlModes(
  items: Array<string>,
  entityDomain: string,
  attributes: LooseObject,
  adapter: EntityAdapter
) {
  return items
    .filter((type) => supportsModeType(type, entityDomain, attributes, adapter))
    .map((type: string) => ({
      type,
      hide_when_off: false,
      list: getModeList(type, attributes, adapter),
    }))
}

function buildConfiguredControlModes(
  config: CardConfig,
  entityDomain: string,
  attributes: LooseObject,
  adapter: EntityAdapter
): Array<Partial<ControlMode>> {
  if (config.control === false) return []

  if (Array.isArray(config.control)) {
    return buildBasicControlModes(
      config.control,
      entityDomain,
      attributes,
      adapter
    )
  }

  if (config.control && typeof config.control === 'object') {
    const entries = Object.entries(config.control)
    if (entries.length > 0) {
      return entries
        .filter(([type]) =>
          supportsModeType(type, entityDomain, attributes, adapter)
        )
        .map(([type, definition]: [string, ModeControlObject]) => {
          const { _name, _hide_when_off, _icons, _heading, ...controlField } =
            definition
          return {
            type,
            hide_when_off: _hide_when_off,
            icons: _icons,
            heading: _heading,
            name: _name,
            list: getModeList(type, attributes, adapter, controlField),
          }
        })
    }
  }

  return buildBasicControlModes(
    adapter.getDefaultControl(),
    entityDomain,
    attributes,
    adapter
  )
}

function removeOffFromSecondaryModes(
  controlModes: Array<Partial<ControlMode>>
) {
  if (!controlModes.some(({ type }) => type === MODES.STATE)) {
    return controlModes
  }

  return controlModes.map((mode) =>
    mode.type && mode.type !== MODES.STATE
      ? {
          ...mode,
          list: mode.list?.filter(({ value }) => value !== 'off') ?? [],
        }
      : mode
  )
}

function sortControlModes(
  controlModes: Array<Partial<ControlMode>>,
  entityDomain: string
) {
  if (entityDomain !== 'fan' && entityDomain !== 'climate') return controlModes

  const getControlOrder = (type: string) => {
    const index = CONTROL_ORDER.indexOf(type as MODES)
    return index === -1 ? CONTROL_ORDER.length : index
  }

  return [...controlModes].sort(
    (a, b) => getControlOrder(a.type) - getControlOrder(b.type)
  )
}

interface Values {
  [key: string]: number | string | null
}

interface SetpointRenderOptions {
  field: string
  value: number | string | null
  minValue: number | null
  maxValue: number | null
  unit: string | boolean
  row: boolean
  stepLayout: string
  isOff: boolean
}

export default class SimpleThermostat extends LitElement {
  static get styles() {
    return styles
  }

  @state()
  config: CardConfig
  @state()
  header: false | HeaderData
  @state()
  service: Service
  @state()
  modes: Array<ControlMode> = []
  _hass: HASS = {
    states: {},
    performAction: () => undefined,
  }
  @state()
  entity: LooseObject
  @state()
  entities: Array<Entity | PreparedEntity> = []
  @state()
  showEntities: boolean = true
  @state()
  name: string | false = ''
  stepSize = STEP_SIZE
  @state()
  _values: Values = {}
  @state()
  _updatingValues: boolean = false
  @state()
  _hide = DEFAULT_HIDE
  _updatingValuesTimeout: ReturnType<typeof setTimeout> | null = null
  _trackedStateRefs: Record<string, unknown> = {}
  _trackedEntityIdsSignature = ''
  _holdTimer: ReturnType<typeof setTimeout> | null = null
  _holdFired = false
  _clickCount = 0
  _clickTimer: ReturnType<typeof setTimeout> | null = null
  static HOLD_MS = 500
  static DOUBLE_TAP_MS = 250

  _debouncedSetTemperature = debounce(
    (values: object) => {
      const { domain, service, data = {} } = this.service
      this._callAction(`${domain}.${service}`, {
        entity_id: this.config.entity,
        ...data,
        ...values,
      })
    },
    {
      wait: DEBOUNCE_TIMEOUT,
    }
  )

  _callAction(action: string, data: object) {
    if (typeof this._hass.performAction === 'function') {
      this._hass.performAction({ action, data })
    } else {
      const [domain, service] = action.split('.')
      this._hass.callService(domain, service, data)
    }
  }

  static getConfigElement() {
    return window.document.createElement(`${CARD_NAME}-editor`)
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass.states ?? {}).find(
      (id) =>
        id.startsWith('climate.') ||
        id.startsWith('fan.') ||
        id.startsWith('humidifier.')
    )
    return { entity: entity ?? '' }
  }

  setConfig(config: CardConfig) {
    warnLegacyConfigAliases(config)
    this.config = {
      decimals: DECIMALS,
      ...config,
    }
    this._trackedStateRefs = {}
    this._trackedEntityIdsSignature = ''
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this._debouncedSetTemperature.cancel()
    if (this._updatingValuesTimeout) {
      clearTimeout(this._updatingValuesTimeout)
      this._updatingValuesTimeout = null
    }
    if (this._holdTimer) {
      clearTimeout(this._holdTimer)
      this._holdTimer = null
    }
    if (this._clickTimer) {
      clearTimeout(this._clickTimer)
      this._clickTimer = null
    }
  }

  updated() {
    const patchHass: Array<HANode> = Array.from(
      this.renderRoot.querySelectorAll('[with-hass]')
    )
    for (const child of Array.from(patchHass)) {
      Array.from(child.attributes).forEach((attr) => {
        if (attr.name.startsWith('fwd-')) {
          child[attr.name.replace('fwd-', '')] = attr.value
        }
      })
      child.hass = this._hass
    }
  }

  set hass(hass: HASS) {
    if (!this.config.entity) {
      return
    }

    if (!hass?.states) {
      return
    }

    this._hass = hass
    const trackedEntityIds = getTrackedEntityIds(this.config)
    const trackedEntityIdsSignature = trackedEntityIds.join('|')
    const trackedStatesUnchanged =
      trackedEntityIdsSignature === this._trackedEntityIdsSignature &&
      trackedEntityIds.every(
        (entityId) => this._trackedStateRefs[entityId] === hass.states[entityId]
      )

    if (trackedStatesUnchanged) {
      return
    }

    this._trackedEntityIdsSignature = trackedEntityIdsSignature
    this._trackedStateRefs = trackedEntityIds.reduce((result, entityId) => {
      result[entityId] = hass.states[entityId]
      return result
    }, {})

    const entity = hass.states[this.config.entity]
    if (!entity) {
      if (this.entity !== undefined) {
        this.entity = undefined
      }
      return
    }

    if (this.entity !== entity) {
      this.entity = entity
    }

    const adapter = getAdapter(this.config.entity)
    this.header = parseHeader(
      this.config.header,
      entity,
      hass,
      this.config.enhanced_visuals !== false
    )
    this.service = parseService(this.config?.service ?? false, adapter)

    const attributes = entity.attributes
    let values = parseSetpoints(
      this.config?.setpoints ?? null,
      attributes,
      adapter
    )

    if (this._updatingValues && isEqual(values, this._values)) {
      this._updatingValues = false
      if (this._updatingValuesTimeout) {
        clearTimeout(this._updatingValuesTimeout)
        this._updatingValuesTimeout = null
      }
    } else if (!this._updatingValues) {
      this._values = values
    }

    const entityDomain = this.config.entity.split('.')[0]
    const controlModes = sortControlModes(
      removeOffFromSecondaryModes(
        buildConfiguredControlModes(
          this.config,
          entityDomain,
          attributes,
          adapter
        )
      ),
      entityDomain
    )

    this.modes = controlModes.map((values) => {
      const list =
        values.type === MODES.HVAC
          ? sortHvacModes(values.list)
          : values.type === MODES.FAN
            ? sortFanModes(values.list)
            : values.list
      const mode =
        values.type === MODES.HVAC || values.type === MODES.STATE
          ? entity.state
          : attributes[adapter.getModePayloadKey(values.type)]

      return { ...values, list, mode } as ControlMode
    })

    const { step: rangeStep } = adapter.getRange(attributes)
    this.stepSize = Number(this.config.step_size ?? rangeStep ?? STEP_SIZE)

    this._hide = { ...DEFAULT_HIDE, ...(this.config.hide ?? {}) }

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
          unit: entity?.unit ?? '',
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
      const currentValueId = adapter
        .getSetpointService()
        .service.replace('set_', '')
      const currentValueTemplate = adapter.getCurrentValueTemplate()
      const hasExplicitCurrentValueEntity = Boolean(
        this.config.current_value_entity ||
        this.config.current_temperature_entity
      )
      const hasDefaultCurrentValue =
        adapter.getCurrentValue(attributes) !== null
      if (
        !ids.includes(currentValueId) &&
        (hasExplicitCurrentValueEntity || hasDefaultCurrentValue)
      ) {
        const currentValueEntityId =
          this.config.current_value_entity ??
          this.config.current_temperature_entity ??
          this.config.entity
        const currentValueContext =
          this.config.current_value_entity ||
          this.config.current_temperature_entity
            ? this._hass.states[currentValueEntityId]
            : this.entity
        builtins.push({
          id: currentValueId,
          label: '{{ui.currently}}',
          template: currentValueTemplate,
          entityId: currentValueEntityId,
          context: currentValueContext,
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
        <ha-alert alert-type="warning">
          Decimals is set to 0 and step_size is lower than 1. Decrementing a
          setpoint will likely not work. Change one of the settings to clear
          this warning.
        </ha-alert>
      `)
    }

    if (!entity) {
      if (!this._hass?.states) {
        return html`<ha-card
          class="loading ${config.enhanced_visuals === false
            ? 'standard-visuals'
            : ''}"
        ></ha-card>`
      }
      return html`
        <ha-alert alert-type="error">
          Entity not available: ${config.entity}
        </ha-alert>
      `
    }

    const adapter = getAdapter(config.entity)
    const {
      attributes: { hvac_action: action },
    } = entity
    const { min: minValue, max: maxValue } = adapter.getRange(entity.attributes)
    const unit = this.getUnit()
    const stepLayout =
      this.config.enhanced_visuals === false
        ? (this.config?.layout?.step ?? 'column')
        : (this.config?.layout?.step ?? 'row')
    const row = stepLayout === 'row'
    const entityDomain = config.entity.split('.')[0]
    const isUnavailable = ['unavailable', 'unknown'].includes(entity.state)
    const safeClass = (value: unknown) =>
      typeof value === 'string' ? value.replace(/[^a-z0-9_-]/gi, '') : ''
    const classes = [
      !this.header && 'no-header',
      `domain-${safeClass(entityDomain)}`,
      `state-${safeClass(entity.state)}`,
      this.config.enhanced_visuals === false && 'standard-visuals',
      safeClass(action),
      isUnavailable && safeClass(entity.state),
    ].filter((cx) => !!cx)
    const cardStyle = getCardStyle(entityDomain, entity.attributes)

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
            _hide,
            unit,
            hass: this._hass,
            entity: this.entity,
            entities: this.entities,
            config: this.config,
            adapter,
            localize: this.localize,
            openEntityPopover: this.openEntityPopover,
          })
        : ''
    }
    return html`
      <ha-card class="${classes.join(' ')}" style=${cardStyle}>
        ${config.styles
          ? html`<style>
              ${config.styles}
            </style>`
          : nothing}
        ${warnings}
        ${renderHeader({
          header: this.header,
          toggleEntityChanged: this.toggleEntityChanged,
          entity: this.entity,
          openEntityPopover: this.openEntityPopover,
        })}
        <section class="body">
          ${entitiesHtml}
          ${this.renderSetpoints({
            values: _values,
            minValue,
            maxValue,
            unit,
            row,
            stepLayout,
            isOff: entity.state === HVAC_MODES.OFF,
          })}
        </section>

        ${this.modes.length
          ? html`
              <section class="controls">
                ${this.modes.map((mode) =>
                  renderModeType({
                    state: entity.state,
                    entity,
                    hass: this._hass,
                    mode,
                    adapter,
                    localize: this.localize,
                    modeOptions: this.config?.layout?.mode ?? {},
                    setMode: this.setMode,
                  })
                )}
              </section>
            `
          : nothing}
      </ha-card>
    `
  }

  toggleEntityChanged = (ev: Event, entityId?: string) => {
    if (!this.header || !entityId) return

    const el = ev.target as HTMLInputElement
    this._callAction(`homeassistant.turn_${el.checked ? 'on' : 'off'}`, {
      entity_id: entityId,
    })
  }

  renderSetpoints({
    values,
    minValue,
    maxValue,
    unit,
    row,
    stepLayout,
    isOff,
  }: {
    values: Values
    minValue: number | null
    maxValue: number | null
    unit: string | boolean
    row: boolean
    stepLayout: string
    isOff: boolean
  }) {
    if (this.config.hide_setpoint === true) return nothing

    return Object.entries(values).map(([field, value]) =>
      this.renderSetpointControl({
        field,
        value,
        minValue,
        maxValue,
        unit,
        row,
        stepLayout,
        isOff,
      })
    )
  }

  renderSetpointControl(options: SetpointRenderOptions) {
    const { row, stepLayout } = options
    const decreaseButton = this.renderSetpointStepper(options, 'decrease')
    const valueButton = this.renderSetpointValue(options)
    const increaseButton = this.renderSetpointStepper(options, 'increase')

    return html`
      <div class="current-wrapper ${stepLayout}">
        ${row
          ? html`${decreaseButton}${valueButton}${increaseButton}`
          : html`${increaseButton}${valueButton}${decreaseButton}`}
      </div>
    `
  }

  renderSetpointStepper(
    { field, value, minValue, maxValue, row }: SetpointRenderOptions,
    direction: 'increase' | 'decrease'
  ) {
    const numericValue = Number(value)
    const hasNumericValue = !Number.isNaN(numericValue)
    const decreasing = direction === 'decrease'
    const disabled = decreasing
      ? value === null ||
        (minValue !== null && hasNumericValue && numericValue <= minValue)
      : (value === null && minValue === null) ||
        (value !== null &&
          maxValue !== null &&
          hasNumericValue &&
          numericValue >= maxValue)
    const icon = decreasing
      ? row
        ? ICONS.MINUS
        : ICONS.DOWN
      : row
        ? ICONS.PLUS
        : ICONS.UP

    return html`
      <button
        type="button"
        ?disabled=${disabled}
        class="thermostat-trigger ${direction}"
        aria-label=${`${decreasing ? 'Decrease' : 'Increase'} ${field}`}
        @click="${() =>
          decreasing
            ? this.setTemperature(-this.stepSize, field)
            : value === null && minValue !== null
              ? this.setTemperature(0, field, minValue)
              : this.setTemperature(this.stepSize, field)}"
      >
        <ha-icon .icon=${icon}></ha-icon>
      </button>
    `
  }

  renderSetpointValue({ field, value, unit, isOff }: SetpointRenderOptions) {
    const hasValue =
      ['string', 'number'].includes(typeof value) &&
      value !== '' &&
      value !== null
    const showUnit = unit !== false && hasValue
    const showOffFallback = isOff && !hasValue
    const displayValue = showOffFallback
      ? 'OFF'
      : formatNumber(value, {
          ...this.config,
          locale: this._hass.locale,
        })

    return html`
      <h3
        @pointerdown=${this._onActionPointerDown}
        @pointerup=${this._onActionPointerUp}
        @pointercancel=${this._onActionPointerUp}
        @click=${this._onActionClick}
        @keydown=${this._onSetpointKeyDown}
        role="button"
        tabindex="0"
        aria-label=${`${field}: ${displayValue}${showUnit ? ` ${unit}` : ''}`}
        class=${[
          'current--value',
          showOffFallback && 'current--off',
          this._updatingValues && 'updating',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        ${appendUnit(displayValue, showUnit ? unit : false)}
      </h3>
    `
  }

  setTemperature(change: number, field: string, baseValue?: number) {
    this._updatingValues = true
    if (this._updatingValuesTimeout) {
      clearTimeout(this._updatingValuesTimeout)
    }
    this._updatingValuesTimeout = setTimeout(() => {
      this._updatingValues = false
      this._updatingValuesTimeout = null
    }, UPDATING_TIMEOUT)
    const previousValue = baseValue ?? this._values[field]
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
      const adapter = getAdapter(this.config.entity)
      if (type === MODES.STATE) {
        this._callAction(`${adapter.getLocalizationDomain()}.turn_${mode}`, {
          entity_id: this.config.entity,
        })
        fireEvent(this, 'haptic', 'light')
        return
      }
      const value = adapter.transformModePayloadValue?.(type, mode) ?? mode
      this._callAction(
        `${adapter.getLocalizationDomain()}.${adapter.getModeService(type)}`,
        {
          entity_id: this.config.entity,
          [adapter.getModePayloadKey(type)]: value,
        }
      )
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

  _onActionPointerDown = (e: PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    this._holdFired = false
    if (this._holdTimer) clearTimeout(this._holdTimer)
    this._holdTimer = setTimeout(() => {
      this._holdFired = true
      this._holdTimer = null
      this._dispatchAction('hold')
    }, SimpleThermostat.HOLD_MS)
  }

  _onActionPointerUp = () => {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer)
      this._holdTimer = null
    }
  }

  _onActionClick = (e: MouseEvent) => {
    e.preventDefault()
    if (this._holdFired) {
      this._holdFired = false
      return
    }
    this._clickCount += 1
    if (this._clickCount === 1) {
      if (this._clickTimer) clearTimeout(this._clickTimer)
      this._clickTimer = setTimeout(() => {
        this._clickCount = 0
        this._clickTimer = null
        this._dispatchSetpointTap()
      }, SimpleThermostat.DOUBLE_TAP_MS)
    } else {
      if (this._clickTimer) clearTimeout(this._clickTimer)
      this._clickTimer = null
      this._clickCount = 0
      this._dispatchAction('double_tap')
    }
  }

  _onSetpointKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      this._dispatchSetpointTap()
    }
  }

  _dispatchSetpointTap() {
    if (this.config?.tap_action) {
      this._dispatchAction('tap')
      return
    }

    this.openEntityPopover(this.config.entity)
  }

  _dispatchAction(kind: 'tap' | 'hold' | 'double_tap') {
    const key =
      kind === 'tap'
        ? 'tap_action'
        : kind === 'hold'
          ? 'hold_action'
          : 'double_tap_action'
    const action =
      this.config?.[key] ??
      (kind === 'tap' ? { action: 'more-info' } : { action: 'none' })
    fireEvent(this, 'hass-action', {
      config: this.config,
      action,
    })
  }

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
