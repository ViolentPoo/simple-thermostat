import { html } from 'lit'

export function wrapEntities(config, content) {
  const { type, labels: showLabels } = config?.layout?.entities ?? {
    type: 'table',
    labels: true,
  }

  const visibleRows = content.filter(
    (it) => it !== null && typeof it !== 'undefined'
  )
  const classes = [
    showLabels ? 'with-labels' : 'without-labels',
    type === 'list' ? 'as-list' : 'as-table',
    visibleRows.length === 1 ? 'single-row' : '',
  ]

  return html` <div class="entities ${classes.join(' ')}">${content}</div> `
}
