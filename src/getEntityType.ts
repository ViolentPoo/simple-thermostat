export default function getEntityType(attributes, state) {
  const hvacModes = attributes?.hvac_modes || []

  const isDualMode =
    hvacModes.includes('heat_cool') ||
    hvacModes.includes('auto')

  return isDualMode ? DUAL : SINGLE
}
