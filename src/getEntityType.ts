export default function getEntityType(attributes, state) {
  const mode = state ?? attributes?.hvac_mode

  const isDualMode =
    mode === 'heat_cool' ||
    mode === 'auto'

  return isDualMode ? DUAL : SINGLE
}
