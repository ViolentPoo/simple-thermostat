import getFanModeIcon from '../fanModeIcon'

test('assigns five speed icons when silent and full are present', () => {
  const modes = ['silent', 'low', 'medium', 'high', 'full']

  expect(getFanModeIcon('silent', modes)).toBe('mdi:fan-speed-1')
  expect(getFanModeIcon('low', modes)).toBe('mdi:fan-speed-2')
  expect(getFanModeIcon('medium', modes)).toBe('mdi:fan-speed-3')
  expect(getFanModeIcon('high', modes)).toBe('st:fan-speed-4')
  expect(getFanModeIcon('full', modes)).toBe('st:fan-speed-5')
})

test('keeps low as speed one on simple three speed fans', () => {
  const modes = ['low', 'medium', 'high']

  expect(getFanModeIcon('low', modes)).toBe('mdi:fan-speed-1')
  expect(getFanModeIcon('medium', modes)).toBe('mdi:fan-speed-2')
  expect(getFanModeIcon('high', modes)).toBe('mdi:fan-speed-3')
})

test('leaves non-speed fan modes to the default icon map', () => {
  expect(getFanModeIcon('auto', ['auto', 'low', 'high'])).toBeUndefined()
})
