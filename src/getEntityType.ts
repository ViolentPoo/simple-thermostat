export const DUAL = 'dual'
export const SINGLE = 'single'

export default function getEntityType(attributes) {
  const mode = attributes?.hvac_mode

  const isDualMode = mode === 'heat_cool' || mode === 'auto'

  if (isDualMode) {
    return DUAL
  }

  return SINGLE
}
