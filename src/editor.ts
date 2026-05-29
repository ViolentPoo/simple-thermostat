import { LitElement, html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { mdiBookOpenVariant } from '@mdi/js'
import styles from './styles.css'
import fireEvent from './fireEvent'
import { version } from '../package.json'

import { CardConfig, MODES } from './config/card'
import { HeaderConfig } from './config/header'
import { HASS } from './types'
import { EntityAdapter, getAdapter } from './adapters'

declare const process: { env: { BUILD_TIME: string } }
const BUILD_TIME = process.env.BUILD_TIME

const GithubReadMe =
  'https://github.com/Wheemer/simple-thermostat/blob/master/README.md'

const SUPPORTED_ENTITY_DOMAINS = ['climate', 'fan', 'humidifier']

const CONTROL_TYPES = [
  MODES.HVAC,
  MODES.FAN,
  MODES.STATE,
  MODES.PRESET,
  MODES.SWING,
  MODES.SWING_HORIZONTAL,
  MODES.SWING_VERTICAL,
  MODES.VANE_HORIZONTAL,
  MODES.VANE_VERTICAL,
  MODES.DIRECTION,
  MODES.OSCILLATING,
  MODES.MODE,
]

const MODE_TYPES: Array<string> = Object.values(MODES)

const CONTROL_LABELS = {
  [MODES.HVAC]: 'HVAC modes',
  [MODES.FAN]: 'Fan modes',
  [MODES.STATE]: 'On/off state',
  [MODES.PRESET]: 'Preset modes',
  [MODES.SWING]: 'Swing modes',
  [MODES.SWING_HORIZONTAL]: 'Horizontal swing',
  [MODES.SWING_VERTICAL]: 'Vertical swing',
  [MODES.VANE_HORIZONTAL]: 'Horizontal vane',
  [MODES.VANE_VERTICAL]: 'Vertical vane',
  [MODES.DIRECTION]: 'Direction',
  [MODES.OSCILLATING]: 'Oscillating',
  [MODES.MODE]: 'Modes',
}

const stub = {
  header: {},
  layout: {
    mode: {},
  },
}

const LABELS: Record<string, string> = {
  entity: 'Entity (required)',
  current_value_entity: 'Current value entity (optional)',
  show_header: 'Show header',
  name: 'Name',
  icon: 'Icon',
  'toggle.entity': 'Toggle entity',
  'toggle.name': 'Toggle label',
  'toggle.icon': 'Toggle icon',
  'layout.mode.names': 'Show mode names',
  'layout.mode.icons': 'Show mode icons',
  'layout.mode.headings': 'Show mode headings',
  decimals: 'Decimals',
  unit: 'Unit',
  'layout.step': 'Step layout',
  step_size: 'Step size',
  fallback: 'Fallback text',
  'hide.temperature': 'Hide temperature',
  'hide.state': 'Hide state',
  hide_setpoint: 'Hide setpoint controls',
  'label.temperature': 'Temperature label',
  'label.state': 'State label',
  'layout.entities.type': 'Entity row layout',
  'layout.entities.labels': 'Show entity row labels',
  enhanced_visuals: 'V4 enhanced visuals',
  'tap_action.action': 'Tap action',
  'hold_action.action': 'Hold action',
  'double_tap_action.action': 'Double-tap action',
}

for (const type of CONTROL_TYPES) {
  LABELS[`control.${type}`] = CONTROL_LABELS[type]
}

const cloneDeep = <T>(obj: T): T =>
  typeof structuredClone === 'function'
    ? structuredClone(obj)
    : JSON.parse(JSON.stringify(obj))

type FormData = Record<string, unknown>
type FormSchema = Record<string, unknown>

const ACTION_OPTIONS = [
  { value: 'more-info', label: 'More info' },
  { value: 'toggle', label: 'Toggle' },
  { value: 'none', label: 'None' },
]

const DIRECT_FORM_PATHS = [
  'entity',
  'current_value_entity',
  'decimals',
  'unit',
  'fallback',
  'layout.step',
  'layout.mode.names',
  'layout.mode.icons',
  'layout.mode.headings',
  'layout.entities.type',
  'layout.entities.labels',
  'hide.temperature',
  'hide.state',
  'hide_setpoint',
  'label.temperature',
  'label.state',
  'tap_action.action',
  'hold_action.action',
  'double_tap_action.action',
]

const HEADER_FORM_PATHS = [
  'show_header',
  'name',
  'icon',
  'toggle.entity',
  'toggle.name',
  'toggle.icon',
]

const valueChanged = (before: unknown, after: unknown) => before !== after

function getChangedFormPaths(current: FormData, updated: FormData) {
  return new Set(
    Object.keys(updated).filter((path) =>
      valueChanged(current[path], updated[path])
    )
  )
}

function ignoreImplicitDefaultChanges(
  changedPaths: Set<string>,
  config: CardConfig
) {
  if (!changedPaths.has('enhanced_visuals')) return

  if (!config.layout?.step) {
    changedPaths.delete('layout.step')
  }
}

function setNested(obj: Record<string, unknown>, path: string, value: unknown) {
  const parts = path.split('.')
  let target = obj
  while (parts.length > 1) {
    const part = parts.shift()
    if (!Object.prototype.hasOwnProperty.call(target, part)) target[part] = {}
    target = target[part] as Record<string, unknown>
  }
  target[parts[0]] = value
}

function deleteNested(obj: Record<string, unknown>, path: string) {
  const parts = path.split('.')
  let target = obj
  while (parts.length > 1) {
    const part = parts.shift()
    if (!target[part]) return
    target = target[part] as Record<string, unknown>
  }
  delete target[parts[0]]
}

function isModeEnabled(
  config: CardConfig,
  type: string,
  adapter: EntityAdapter
): boolean {
  const control = config.control
  if (control === false) return false
  if (Array.isArray(control)) return control.includes(type)
  if (control && typeof control === 'object') {
    return control[type] !== undefined && control[type] !== false
  }
  return adapter.getDefaultControl().includes(type)
}

function getDefaultControlData(config: CardConfig) {
  const adapter = getAdapter(config.entity)
  return CONTROL_TYPES.reduce((result, type) => {
    result[`control.${type}`] = isModeEnabled(config, type, adapter)
    return result
  }, {})
}

function getSupportedControlTypes(config: CardConfig, hass?: HASS) {
  if (!config.entity || !hass?.states?.[config.entity]) {
    return []
  }

  const entity = hass.states[config.entity]
  const attributes = entity.attributes ?? {}
  const [entityDomain] = config.entity.split('.')
  const adapter = getAdapter(config.entity)

  return CONTROL_TYPES.filter(
    (type) =>
      MODE_TYPES.includes(type) &&
      (type === MODES.STATE
        ? entityDomain === 'fan' || entityDomain === 'humidifier'
        : typeof attributes[adapter.getModeAttribute(type)] !== 'undefined')
  )
}

function getControlFromForm(
  updated: FormData,
  config: CardConfig,
  hass?: HASS
) {
  const entity = String(updated.entity ?? config.entity ?? '')
  const adapter = getAdapter(entity)
  const supportedControlTypes = getSupportedControlTypes(
    {
      ...config,
      entity,
    },
    hass
  )
  const desired = supportedControlTypes.filter(
    (type) => updated[`control.${type}`]
  )
  const defaultControl = adapter.getDefaultControl()

  if (desired.length === 0) return false
  if (
    config.control &&
    !Array.isArray(config.control) &&
    typeof config.control === 'object'
  ) {
    return desired.reduce(
      (result, type) => {
        result[type] = config.control[type] || {}
        return result
      },
      {} as Record<string, unknown>
    )
  }
  if (
    desired.length === defaultControl.length &&
    desired.every((type, index) => type === defaultControl[index])
  ) {
    return undefined
  }
  return desired
}

export function buildSchema(config: CardConfig, hass?: HASS) {
  const supportedControlTypes = getSupportedControlTypes(config, hass)
  const entityDomain = config.entity?.split('.')[0]
  const hasExtraEntities =
    Array.isArray(config.entities) && config.entities.length > 0
  const entityLayoutSchema = hasExtraEntities
    ? [
        {
          name: 'layout.entities.type',
          selector: {
            select: {
              mode: 'dropdown',
              options: [
                { value: 'table', label: 'Table' },
                { value: 'list', label: 'List' },
              ],
            },
          },
        },
        { name: 'layout.entities.labels', selector: { boolean: {} } },
      ]
    : []
  const adapter = getAdapter(config.entity)
  const entity = config.entity ? hass?.states?.[config.entity] : undefined
  const hasSetpoints =
    config.hide_setpoint === true ||
    !entity ||
    Object.keys(adapter.getSetpoints(entity.attributes ?? {})).length > 0
  const hasCurrentValue =
    entityDomain !== 'fan' &&
    (entityDomain === 'climate' || entityDomain === 'humidifier')
  const headerSchema =
    config.header === false
      ? []
      : [
          {
            type: 'grid',
            schema: [
              { name: 'name', selector: { text: {} } },
              { name: 'icon', selector: { icon: {} } },
            ],
          },
          { name: 'toggle.entity', selector: { entity: {} } },
          { name: 'toggle.name', selector: { text: {} } },
          ...(config.header &&
          typeof config.header === 'object' &&
          config.header.toggle?.entity
            ? [{ name: 'toggle.icon', selector: { icon: {} } }]
            : []),
        ]

  const schema: Array<FormSchema> = [
    {
      name: 'entity',
      required: true,
      selector: { entity: { domain: SUPPORTED_ENTITY_DOMAINS } },
    },
    ...(entityDomain === 'fan'
      ? []
      : [
          {
            name: 'current_value_entity',
            selector: { entity: { domain: ['sensor', 'input_number'] } },
          },
        ]),
    {
      type: 'expandable',
      title: 'Header',
      schema: [
        { name: 'show_header', selector: { boolean: {} } },
        ...headerSchema,
      ],
    },
    ...(supportedControlTypes.length > 0
      ? [
          {
            type: 'expandable',
            title: 'Mode Controls',
            schema: [
              {
                type: 'grid',
                column_min_width: '150px',
                schema: supportedControlTypes.map((type) => ({
                  name: `control.${type}`,
                  selector: { boolean: {} },
                })),
              },
              {
                type: 'grid',
                column_min_width: '150px',
                schema: [
                  { name: 'layout.mode.names', selector: { boolean: {} } },
                  { name: 'layout.mode.icons', selector: { boolean: {} } },
                  { name: 'layout.mode.headings', selector: { boolean: {} } },
                ],
              },
            ],
          },
        ]
      : []),
    ...(hasSetpoints
      ? [
          {
            type: 'expandable',
            title: 'Setpoint Controls',
            schema: [
              { name: 'hide_setpoint', selector: { boolean: {} } },
              {
                type: 'grid',
                schema: [
                  {
                    name: 'layout.step',
                    selector: {
                      select: {
                        mode: 'dropdown',
                        options: [
                          { value: 'row', label: 'Row' },
                          { value: 'column', label: 'Column' },
                        ],
                      },
                    },
                  },
                  {
                    name: 'step_size',
                    selector: {
                      select: {
                        mode: 'dropdown',
                        options: [
                          { value: 'auto', label: 'Auto (from entity)' },
                          { value: '0.1', label: '0.1' },
                          { value: '0.5', label: '0.5' },
                          { value: '1', label: '1' },
                        ],
                      },
                    },
                  },
                ],
              },
            ],
          },
        ]
      : []),
    {
      type: 'expandable',
      title: 'Layout & Display',
      schema: [
        ...(hasCurrentValue
          ? [
              {
                type: 'grid',
                schema: [
                  {
                    name: 'decimals',
                    selector: {
                      number: { min: 0, max: 5, step: 1, mode: 'box' },
                    },
                  },
                  { name: 'unit', selector: { text: {} } },
                ],
              },
            ]
          : []),
        { name: 'fallback', selector: { text: {} } },
        {
          type: 'grid',
          column_min_width: '160px',
          schema: [
            ...(hasCurrentValue
              ? [{ name: 'hide.temperature', selector: { boolean: {} } }]
              : []),
            { name: 'hide.state', selector: { boolean: {} } },
          ],
        },
        {
          type: 'grid',
          column_min_width: '160px',
          schema: [
            ...(hasCurrentValue
              ? [{ name: 'label.temperature', selector: { text: {} } }]
              : []),
            { name: 'label.state', selector: { text: {} } },
          ],
        },
        {
          type: 'grid',
          column_min_width: '160px',
          schema: entityLayoutSchema,
        },
      ].filter((item) => item.schema?.length !== 0),
    },
    {
      type: 'expandable',
      title: 'Actions',
      schema: [
        {
          type: 'grid',
          column_min_width: '150px',
          schema: [
            {
              name: 'tap_action.action',
              selector: {
                select: {
                  mode: 'dropdown',
                  options: ACTION_OPTIONS,
                },
              },
            },
            {
              name: 'hold_action.action',
              selector: {
                select: {
                  mode: 'dropdown',
                  options: ACTION_OPTIONS,
                },
              },
            },
            {
              name: 'double_tap_action.action',
              selector: {
                select: {
                  mode: 'dropdown',
                  options: ACTION_OPTIONS,
                },
              },
            },
          ],
        },
      ],
    },
    {
      type: 'expandable',
      title: 'Tweaks',
      schema: [{ name: 'enhanced_visuals', selector: { boolean: {} } }],
    },
  ]

  return schema
}

export default class SimpleThermostatEditor extends LitElement {
  @state() config!: CardConfig
  @property({ attribute: false }) hass?: HASS

  static get styles() {
    return styles
  }

  static getStubConfig() {
    return { ...stub }
  }

  setConfig(config: CardConfig) {
    this.config = config || ({ ...stub } as CardConfig)
  }

  _openLink() {
    window.open(GithubReadMe, '_blank', 'noopener')
  }

  _buildFormData(): FormData {
    const header: HeaderConfig =
      this.config.header && typeof this.config.header === 'object'
        ? this.config.header
        : {}
    return {
      entity: this.config.entity ?? '',
      current_value_entity:
        this.config.current_value_entity ??
        this.config.current_temperature_entity ??
        '',
      show_header: this.config.header !== false,
      'layout.mode.names': this.config.layout?.mode?.names !== false,
      'layout.mode.icons': this.config.layout?.mode?.icons !== false,
      'layout.mode.headings': this.config.layout?.mode?.headings === true,
      decimals: this.config.decimals ?? '',
      unit: typeof this.config.unit === 'string' ? this.config.unit : '',
      'layout.step':
        this.config.enhanced_visuals === false
          ? (this.config.layout?.step ?? 'column')
          : (this.config.layout?.step ?? 'row'),
      step_size:
        this.config.step_size != null ? String(this.config.step_size) : 'auto',
      fallback: this.config.fallback ?? '',
      'hide.temperature': this.config.hide?.temperature === true,
      'hide.state': this.config.hide?.state === true,
      hide_setpoint: this.config.hide_setpoint === true,
      'label.temperature': this.config.label?.temperature ?? '',
      'label.state': this.config.label?.state ?? '',
      'layout.entities.type': this.config.layout?.entities?.type ?? 'table',
      'layout.entities.labels': this.config.layout?.entities?.labels !== false,
      enhanced_visuals: this.config.enhanced_visuals !== false,
      name: header.name ?? '',
      icon: typeof header.icon === 'string' ? header.icon : '',
      'toggle.entity': header.toggle?.entity ?? '',
      'toggle.name': header.toggle?.name ?? '',
      'toggle.icon':
        typeof header.toggle?.icon === 'string' ? header.toggle.icon : '',
      'tap_action.action': this.config.tap_action?.action ?? 'more-info',
      'hold_action.action': this.config.hold_action?.action ?? 'none',
      'double_tap_action.action':
        this.config.double_tap_action?.action ?? 'none',
      ...getDefaultControlData(this.config),
    }
  }

  _applyFormChange(updated: FormData) {
    const currentFormData = this._buildFormData()
    const changedPaths = getChangedFormPaths(currentFormData, updated)
    ignoreImplicitDefaultChanges(changedPaths, this.config)
    const formData = { ...currentFormData, ...updated }
    const copy = cloneDeep(this.config) as unknown as Record<string, unknown>

    this._applyDirectFormPaths(copy, formData, changedPaths)

    if (
      changedPaths.has('current_value_entity') &&
      formData.current_value_entity
    ) {
      delete copy.current_temperature_entity
    }

    if (formData.enhanced_visuals === false) {
      copy.enhanced_visuals = false
    } else {
      delete copy.enhanced_visuals
    }

    if (HEADER_FORM_PATHS.some((path) => changedPaths.has(path))) {
      if (formData.show_header === false) {
        copy.header = false
      } else {
        this._applyHeaderFormChange(copy, formData)
      }
    }

    if (changedPaths.has('step_size')) {
      this._applyStepSize(copy, formData.step_size)
    }

    if (
      changedPaths.has('entity') ||
      CONTROL_TYPES.some((type) => changedPaths.has(`control.${type}`))
    ) {
      const control = getControlFromForm(formData, this.config, this.hass)
      if (typeof control === 'undefined') delete copy.control
      else copy.control = control
    }

    return copy as unknown as CardConfig
  }

  _applyDirectFormPaths(
    copy: Record<string, unknown>,
    updated: FormData,
    changedPaths: Set<string>
  ) {
    for (const path of DIRECT_FORM_PATHS) {
      if (!changedPaths.has(path)) continue
      const newValue = updated[path]
      if (newValue === undefined || newValue === null || newValue === '') {
        deleteNested(copy, path)
      } else {
        setNested(copy, path, newValue)
      }
    }
  }

  _applyHeaderFormChange(copy: Record<string, unknown>, updated: FormData) {
    if (copy.header === false || copy.header == null) copy.header = {}
    const header = copy.header as HeaderConfig
    const headerName = updated.name
    const headerIcon = updated.icon
    const toggleEntity = updated['toggle.entity']
    const toggleLabel = updated['toggle.name']
    const toggleIcon = updated['toggle.icon']

    if (typeof headerName === 'string' && headerName) header.name = headerName
    else delete header.name
    if (typeof headerIcon === 'string' && headerIcon) header.icon = headerIcon
    else delete header.icon

    if (typeof toggleEntity === 'string' && toggleEntity) {
      header.toggle = header.toggle || { entity: toggleEntity }
      header.toggle.entity = toggleEntity
      if (typeof toggleLabel === 'string' && toggleLabel) {
        header.toggle.name = toggleLabel
      } else {
        delete header.toggle.name
      }
      if (typeof toggleIcon === 'string' && toggleIcon) {
        header.toggle.icon = toggleIcon
      } else {
        delete header.toggle.icon
      }
    } else {
      delete header.toggle
    }
  }

  _applyStepSize(copy: Record<string, unknown>, value: unknown) {
    if (value === 'auto' || value === '' || value == null) {
      delete copy.step_size
      return
    }

    const stepSize = Number(value)
    copy.step_size = Number.isNaN(stepSize) ? value : stepSize
  }

  _valueChanged = (ev: CustomEvent) => {
    const copy = this._applyFormChange(ev.detail.value as FormData)
    this.config = copy
    fireEvent(this, 'config-changed', { config: copy })
  }

  _computeLabel = (schema: FormSchema) =>
    LABELS[String(schema.name)] ?? String(schema.name)

  render() {
    if (!this.hass || !this.config) return html``

    return html`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._buildFormData()}
          .schema=${buildSchema(this.config, this.hass)}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="editor-footer">
          <ha-button @click=${this._openLink}>
            <ha-svg-icon .path=${mdiBookOpenVariant} slot="icon"></ha-svg-icon>
            All configuration options
          </ha-button>
          <span class="editor-footer__hint">
            Advanced settings remain available in YAML
          </span>
          <span class="editor-footer__version"
            >v${version} - ${BUILD_TIME}</span
          >
        </div>
      </div>
    `
  }
}
