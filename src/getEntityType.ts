export default function getEntityType(attributes) {
  const hasDualSetpoints =
    attributes?.target_temp_low != null &&
    attributes?.target_temp_high != null

  const mode = attributes?.hvac_mode

  const isExplicitSingleMode =
    mode === 'heat' ||
    mode === 'cool'

  // only force SINGLE when explicitly single-mode
  if (isExplicitSingleMode) {
    return SINGLE
  }

  // otherwise rely on capability
  return hasDualSetpoints ? DUAL : SINGLE
}
