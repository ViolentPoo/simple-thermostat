import sortFanModes from '../sortFanModes'

test('sorts known fan modes in natural order', () => {
  expect(
    sortFanModes([
      { value: 'low', name: 'Low', icon: 'low' },
      { value: 'silent', name: 'Silent', icon: 'silent' },
      { value: 'mid', name: 'Mid', icon: 'mid' },
      { value: 'full', name: 'Full', icon: 'full' },
      { value: 'high', name: 'High', icon: 'high' },
      { value: 'auto', name: 'Auto', icon: 'auto' },
    ]).map((mode) => mode.value)
  ).toEqual(['auto', 'silent', 'low', 'mid', 'high', 'full'])
})

test('keeps unknown fan modes after known modes', () => {
  expect(
    sortFanModes([
      { value: 'quiet', name: 'Quiet', icon: 'quiet' },
      { value: 'high', name: 'High', icon: 'high' },
      { value: 'auto', name: 'Auto', icon: 'auto' },
    ]).map((mode) => mode.value)
  ).toEqual(['auto', 'quiet', 'high'])
})
