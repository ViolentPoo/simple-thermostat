import sortHvacModes from '../sortHvacModes'

test('sorts known hvac modes in Home Assistant order', () => {
  expect(
    sortHvacModes([
      { value: 'cool', name: 'cool', icon: 'cool' },
      { value: 'off', name: 'off', icon: 'off' },
      { value: 'heat', name: 'heat', icon: 'heat' },
    ]).map((mode) => mode.value)
  ).toEqual(['off', 'heat', 'cool'])
})

test('keeps unknown hvac modes after known modes', () => {
  expect(
    sortHvacModes([
      { value: 'party', name: 'party', icon: 'party' },
      { value: 'off', name: 'off', icon: 'off' },
    ]).map((mode) => mode.value)
  ).toEqual(['off', 'party'])
})

test('does not leave holes after sorting sparse known modes', () => {
  expect(
    sortHvacModes([
      { value: 'fan_only', name: 'fan_only', icon: 'fan_only' },
      { value: 'auto', name: 'auto', icon: 'auto' },
    ]).map((mode) => mode.value)
  ).toEqual(['auto', 'fan_only'])
})
