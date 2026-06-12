import { ControlModeOption } from './types'

const FAN_MODE_ORDER = [
  'auto',
  'silent',
  'quiet',
  'low',
  'mid',
  'medium',
  'high',
  'max',
  'turbo',
  'full',
]

export default function sortFanModes(
  list: Array<ControlModeOption>
): Array<ControlModeOption> {
  const known: Array<ControlModeOption> = []
  const unknown: Array<ControlModeOption> = []

  list.forEach((item) => {
    const index = FAN_MODE_ORDER.indexOf(item.value.toLowerCase())
    if (index >= 0) {
      known[index] = item
    } else {
      unknown.push(item)
    }
  })

  return [...known.filter(Boolean), ...unknown]
}
