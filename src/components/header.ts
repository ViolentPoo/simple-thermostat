import { html, nothing } from 'lit'
import { LooseObject } from '../types'
import { HeaderData } from '../config/header'

type HeaderOptions = {
  header: false | HeaderData
  entity: LooseObject
  openEntityPopover
  toggleEntityChanged
}

export default function renderHeader({
  header,
  toggleEntityChanged,
  entity,
  openEntityPopover,
}: HeaderOptions) {
  if (header === false) {
    return nothing
  }

  const action = entity.attributes.hvac_action || entity.state
  let icon = header.icon
  if (typeof header.icon === 'object') {
    icon = icon?.[action] ?? false
  }
  const slashOffIcon = Boolean(header.slashOffIcon)

  const name = header?.name ?? false

  return html`
    <header>
      <div class="header__main clickable" @click=${() => openEntityPopover()}>
        ${renderIcon(icon, entity.state, slashOffIcon)} ${renderName(name)}
      </div>
      ${renderFaults(header.faults, openEntityPopover)}
      ${renderToggles(header.toggles, openEntityPopover, toggleEntityChanged)}
    </header>
  `
}

function renderIcon(icon, state, slashOffIcon = false) {
  return icon
    ? html`
        <span
          class="header__icon-wrap ${state} ${slashOffIcon ? 'slash-off' : ''}"
        >
          <ha-icon class="header__icon ${state}" .icon=${icon}></ha-icon>
        </span>
      `
    : nothing
}

function renderName(name) {
  return name ? html`<h2 class="header__title">${name}</h2>` : nothing
}

function renderFaults(faults, openEntityPopover) {
  if (!faults?.length) {
    return nothing
  }
  const faultHtml = faults.map(({ icon, hide_inactive, state }) => {
    if (!state) return nothing

    return html` <ha-icon
      class="fault-icon ${state.state === 'on'
        ? 'active'
        : hide_inactive
          ? ' hide'
          : ''}"
      .icon=${icon || state.attributes?.icon}
      @click="${() => openEntityPopover(state.entity_id)}"
    ></ha-icon>`
  })

  return html` <div class="faults">${faultHtml}</div>`
}

function renderToggles(toggles, openEntityPopover, toggleEntityChanged) {
  if (!toggles?.length) return nothing

  return html`
    <div class="header__toggles">
      ${toggles.map((toggle) => {
        const entityId = toggle.entity?.entity_id
        const toggleState = toggle.entity?.state
        const toggleDomain =
          typeof entityId === 'string' ? entityId.split('.')[0] : ''
        const styleIcon =
          typeof toggle.icon === 'string'
            ? toggle.icon
            : toggle.entity?.attributes?.icon
        const toggleKind =
          typeof styleIcon === 'string'
            ? styleIcon.replace(/^mdi:/, '').replace(/[^a-z0-9_-]/gi, '')
            : ''
        return html`
          <div
            class="header__toggle ${toggleState || ''} ${toggleDomain
              ? `domain-${toggleDomain}`
              : ''} ${toggleKind ? `toggle-${toggleKind}` : ''}"
          >
            <span
              class="clickable toggle-label ${toggleState || ''} ${toggleDomain
                ? `domain-${toggleDomain}`
                : ''} ${toggleKind ? `toggle-${toggleKind}` : ''}"
              title=${toggle.label || toggle.entity?.attributes?.friendly_name}
              @click=${() => openEntityPopover(entityId)}
              >${toggle.icon !== false
                ? html`<ha-icon .icon=${toggle.icon}></ha-icon>`
                : toggle.label}
            </span>
            <ha-switch
              .checked=${toggle.entity?.state === 'on'}
              @change=${(ev: Event) => toggleEntityChanged(ev, entityId)}
            ></ha-switch>
          </div>
        `
      })}
    </div>
  `
}
