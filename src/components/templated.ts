import * as Sqrl from 'squirrelly'
import { html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import formatNumber from '../formatNumber'
import { getEntityStateText } from '../entityAction'

const renderIcon = (icon) => `<ha-icon icon="${icon}"></ha-icon>`

Sqrl.defaultConfig.autoEscape = false // HTML output is expected in templates.
Sqrl.filters.define('icon', renderIcon)
Sqrl.filters.define('join', (arr, delimiter = ', ') => arr.join(delimiter))
Sqrl.filters.define('css', (str, css) => {
  const styles = Object.entries(css).reduce((memo, [key, val]) => {
    return `${memo}${key}:${val};`
  }, '')
  return `<span style="${styles}">${str}</span>`
})

Sqrl.filters.define('debug', (data) => {
  try {
    return JSON.stringify(data)
  } catch {
    return `Not able to read valid JSON object from: ${data}`
  }
})

export function wrapEntities(config, content) {
  const { type, labels: showLabels } = config?.layout?.entities ??
    config?.layout?.sensors ?? {
      type: 'table',
      labels: true,
    }

  const classes = [
    showLabels ? 'with-labels' : 'without-labels',
    type === 'list' ? 'as-list' : 'as-table',
    content.filter((it) => it !== null && typeof it !== 'undefined').length ===
    1
      ? 'single-row'
      : '',
  ]
  return html` <div class="entities ${classes.join(' ')}">${content}</div> `
}

export default function renderTemplated({
  context,
  entityId,
  template = '{{state.text}}',
  label,
  hass,
  variables = {},
  config,
  localize,
  openEntityPopover,
}) {
  if (!context) return null

  const { state, attributes } = context

  const [domain] = entityId.split('.')
  const uiPrefix = ['climate', 'fan', 'humidifier'].includes(domain)
    ? `ui.card.${domain}.`
    : 'ui.card.climate.'
  const uiKeys = [
    'currently',
    'operation',
    'fan_mode',
    'swing_mode',
    'preset_mode',
    'humidity',
  ]
  const localizeUi = (key: string) => {
    const fullKey = `${uiPrefix}${key}`
    const translated = hass.localize?.(fullKey)
    return translated && translated !== fullKey ? translated : key
  }
  const translations = Object.fromEntries(
    uiKeys.map((key) => [key, localizeUi(key)])
  )

  // Prepare data to inject as variables into the template
  const data = {
    ...attributes,
    state: {
      raw: state,
      text: getEntityStateText(context, hass, localize),
    },
    ui: translations,
    v: variables,
  }

  // Need to define these inside the function to be able to reach local scope
  Sqrl.filters.define(
    'formatNumber',
    (str, opts = { decimals: config.decimals }) => {
      return String(
        formatNumber(str, {
          ...opts,
          locale: hass.locale,
        })
      )
    }
  )
  Sqrl.filters.define('relativetime', (str) => {
    return `<ha-relative-time fwd-datetime=${str} with-hass></ha-relative-time>`
  })
  Sqrl.filters.define('translate', (str, prefix = '') => {
    if (!prefix && (domain === 'climate' || domain === 'humidifier')) {
      return localize(str, `state_attributes.${domain}.${str}`)
    }
    return localize(str, prefix)
  })

  const render = (template) => {
    try {
      return Sqrl.render(template, data, { useWith: true })
    } catch {
      return `[template error: ${template}]`
    }
  }

  const value = render(template)

  if (
    label === false ||
    (config?.layout?.entities ?? config?.layout?.sensors)?.labels === false
  ) {
    return html`<div class="entity-value">${unsafeHTML(value)}</div>`
  }

  const safeLabel = label || '{{friendly_name}}'
  const heading = safeLabel.match(/^(mdi|hass):.*/)
    ? renderIcon(safeLabel)
    : render(safeLabel)

  return html`
    <div
      class="entity-heading clickable"
      title=${attributes?.friendly_name || entityId}
      @click=${openEntityPopover ? () => openEntityPopover(entityId) : null}
    >
      ${unsafeHTML(heading)}
    </div>
    <div class="entity-value">${unsafeHTML(value)}</div>
  `
}
