const FAN_SPEED_LEVELS = [
  ['silent', 'quiet'],
  ['low'],
  ['mid', 'medium'],
  ['high'],
  ['max', 'turbo', 'full'],
]

const FAN_SPEED_ICONS = [
  'mdi:fan-speed-1',
  'mdi:fan-speed-2',
  'mdi:fan-speed-3',
  'st:fan-speed-4',
  'st:fan-speed-5',
]

const normalizeMode = (mode: unknown) =>
  String(mode).toLowerCase().replace(/\s+/g, '_')

export default function getFanModeIcon(
  mode: string,
  modeOptions: Array<unknown>
) {
  const normalizedMode = normalizeMode(mode)
  const normalizedOptions = new Set(modeOptions.map(normalizeMode))
  const presentLevels = FAN_SPEED_LEVELS.filter((level) =>
    level.some((value) => normalizedOptions.has(value))
  )
  const levelIndex = presentLevels.findIndex((level) =>
    level.includes(normalizedMode)
  )

  return levelIndex >= 0 ? FAN_SPEED_ICONS[levelIndex] : undefined
}
