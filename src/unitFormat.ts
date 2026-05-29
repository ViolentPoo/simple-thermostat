function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function getUnitSeparator(unit: string, formattedValue?: string) {
  if (formattedValue) {
    const match = formattedValue.match(new RegExp(`(\\s*)${escapeRegExp(unit)}$`))
    if (match) return match[1] ?? ''
  }

  return unit === '%' ? '' : ' '
}

export function appendUnit(
  value: string | number,
  unit?: string | boolean,
  formattedValue?: string
) {
  if (!unit || typeof unit !== 'string') return String(value)

  const stringValue = String(value)
  if (new RegExp(`${escapeRegExp(unit)}$`).test(stringValue)) return stringValue

  return `${stringValue}${getUnitSeparator(unit, formattedValue)}${unit}`
}
