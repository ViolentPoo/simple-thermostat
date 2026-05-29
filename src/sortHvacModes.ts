import { ControlModeOption, HVAC_MODES } from './types'

export default function sortHvacModes(
  list: Array<ControlModeOption>
): Array<ControlModeOption> {
  const hvacModeValues = Object.values(HVAC_MODES) as Array<string>
  const known: Array<ControlModeOption> = []
  const unknown: Array<ControlModeOption> = []

  list.forEach((item) => {
    const index = hvacModeValues.indexOf(item.value)
    if (index >= 0) {
      known[index] = item
    } else {
      unknown.push(item)
    }
  })

  return [...known.filter(Boolean), ...unknown]
}
