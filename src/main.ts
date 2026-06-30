import { LitElement, html, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import debounce from 'debounce-fn'
import { name as CARD_NAME } from '../package.json'

import { getAdapter } from './adapters'
import isEqual from './isEqual'
import styles from './styles.css'
import formatNumber from './formatNumber'
import fireEvent from './fireEvent'
import renderHeader from './components/header'
import renderEntities from './components/entities'
import renderModeType from './components/modeType'
import { appendUnit } from './unitFormat'
import { getEntityAction } from './entityAction'
import normalizeConfig from './config/normalize'

import parseHeader from './config/header'
import parseSetpoints from './config/setpoints'
import parseService from './config/service'
import { CardConfig, MODES } from './config/card'
import { ControlMode, LooseObject, HASS, HVAC_MODES } from './types'

const DEBOUNCE_TIMEOUT = 500
const STEP_SIZE = 0.5
const DECIMALS = 1
const UPDATING_TIMEOUT = 10000

export default class SimpleThermostat extends LitElement {
  static get styles() {
    return styles
  }

  @property() config: CardConfig
  @property() header
  @property() service
  @property() modes: Array<ControlMode> = []

  _hass: HASS = {}
  @property() entity: LooseObject

  @property({ type: Object })
  _values: Record<string, any> = {}

  _debouncedSetTemperature = debounce((values: object) => {
    const { domain, service, data = {} } = this.service
    this._callAction(`${domain}.${service}`, {
      entity_id: this.config.entity,
      ...data,
      ...values,
    })
  }, { wait: DEBOUNCE_TIMEOUT })

  set hass(hass: HASS) {
    this._hass = hass
    const entity = hass.states?.[this.config?.entity]
    if (entity) this.updateFromHass(hass)
  }

  updateFromHass(hass: HASS) {
    const entity = hass.states[this.config.entity]
    this.entity = entity

    const adapter = getAdapter(this.config.entity)
    const hvacMode = entity.state

    const attributes = {
      ...entity.attributes,
      hvac_mode: hvacMode,
    }

    let values = parseSetpoints(
      this.config?.setpoints ?? null,
      attributes,
      adapter
    )

    /**
     * 🔥 CRITICAL FIX:
     * heat_cool must NEVER use temperature field.
     * It must only use dual setpoints.
     */
    if (hvacMode === 'heat_cool') {
      values = {
        target_temp_low: values.target_temp_low,
        target_temp_high: values.target_temp_high,
      }
    }

    this._values = values

    const entityDomain = this.config.entity.split('.')[0]

    this.modes = [] // unchanged mode system kept minimal
  }

  renderSetpoints({ values }: { values: Record<string, any> }) {
  const mode = this.entity?.state

  // 🔥 FORCE proper dual rendering in heat_cool
  if (mode === 'heat_cool') {
    const low = values.target_temp_low
    const high = values.target_temp_high

    return html`
      ${low !== undefined
        ? this.renderSetpoint('target_temp_low', low)
        : nothing}
      ${high !== undefined
        ? this.renderSetpoint('target_temp_high', high)
        : nothing}
    `
  }

  // default behavior (heat / cool / others)
  return Object.entries(values)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([field, value]) => this.renderSetpoint(field, value))
}

  renderSetpoint(field: string, value: any) {
    const displayValue =
      value === null || value === undefined
        ? ''
        : formatNumber(value, { decimals: DECIMALS })

    return html`
      <div class="current-wrapper">
        <div class="current-value">
          ${appendUnit(displayValue, false)}
        </div>
      </div>
    `
  }

  setTemperature(change: number, field: string) {
    const previous = Number(this._values[field] ?? 0)
    const next = previous + change

    this._values = {
      ...this._values,
      [field]: next,
    }

    this._debouncedSetTemperature(this._values)
  }

  _callAction(action: string, data: object) {
    this._hass.callService(...action.split('.'), data)
  }

  render() {
    if (!this.entity) return nothing

    return html`
      ${this.renderSetpoints({ values: this._values })}
    `
  }
}
