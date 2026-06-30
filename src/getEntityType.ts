export const DUAL = 'dual'
export const SINGLE = 'single'

export default function getEntityType(attributes, state) {
  const mode = state ?? attributes?.hvac_mode

  const targetTempLow =
    attributes?.target_temp_low ?? attributes?.target_temperature_low

  const targetTempHigh =
    attributes?.target_temp_high ?? attributes?.target_temperature_high

  const hasDualSetpoints =
    targetTempLow !== null &&
    targetTempLow !== undefined &&
    targetTempHigh !== null &&
    targetTempHigh !== undefined

  const hasSingleSetpoint =
    attributes?.temperature !== null &&
    attributes?.temperature !== undefined

  const isDualMode =
    mode === 'heat_cool' ||
    mode === 'auto' ||
    (!hasSingleSetpoint && hasDualSetpoints)

  return isDualMode ? DUAL : SINGLE
}