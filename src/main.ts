import { LitElement, html, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import debounce from 'debounce-fn'

import { getAdapter } from './adapters'
import styles from './styles.css'
import formatNumber from './formatNumber'
import { appendUnit } from './unitFormat'
import parseSetpoints from './config/setpoints'
import { CardConfig, ControlMode, LooseObject, HASS } from './types'

const DEBOUNCE_TIMEOUT = 500
const DECIMALS = 1

export default class SimpleThermostat extends LitElement {
  static get styles() {
    return styles
  }

  @property() config: CardConfig
  @property() entity: LooseObject
  @property({ type: Object }) _values: Record<string, any> = {}

  _hass: HASS = {}

  _debouncedSet = debounce((values: object) => {
    const { domain, service, data = {} } = this.service

    this._hass.callService(domain, service, {
      entity_id: this.config.entity,
      ...data,
      ...values,
    })
  }, { wait: DEBOUNCE_TIMEOUT })

  set hass(hass: HASS) {
    this._hass = hass
    const entity = hass.states?.[this.config?.entity]
    if (entity) this.updateFromHass(entity)
  }

  updateFromHass(entity: any) {
    this.entity = entity

    const hvacMode = entity.state

    let values: Record<string, any>

    /**
     * 🔥 SINGLE SOURCE OF TRUTH RULE:
     * heat_cool MUST bypass ALL adapters and parsers
     */
    if (hvacMode === 'heat_cool') {
      values = {
        target_temp_low: entity.attributes.target_temp_low,
        target_temp_high: entity.attributes.target_temp_high,
      }
    } else {
      const adapter = getAdapter(this.config.entity)

      const attributes = {
        ...entity.attributes,
        hvac_mode: hvacMode,
      }

      values = parseSetpoints(
        this.config?.setpoints ?? null,
        attributes,
        adapter
      )
    }

    this._values = values
  }

  renderSetpoints(values: Record<string, any>) {
    return Object.entries(values)
      .filter(([, value]) => value !== null && value !== undefined)
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

    this._debouncedSet(this._values)
  }

  _callAction(domain: string, data: object) {
    this._hass.callService(domain, this.service.service, data)
  }

  render() {
    if (!this.entity) return nothing

    return html`
      ${this.renderSetpoints(this._values)}
    `
  }
}
