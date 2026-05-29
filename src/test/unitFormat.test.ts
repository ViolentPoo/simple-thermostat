import { appendUnit, getUnitSeparator } from '../unitFormat'

test('uses Home Assistant unit spacing conventions', () => {
  expect(getUnitSeparator('%')).toBe('')
  expect(getUnitSeparator('°C')).toBe(' ')
})

test('uses separator from Home Assistant formatted values when available', () => {
  expect(getUnitSeparator('°C', '22.0 °C')).toBe(' ')
  expect(getUnitSeparator('%', '48%')).toBe('')
})

test('appends units without duplicating formatted values', () => {
  expect(appendUnit('22.0', '°C')).toBe('22.0 °C')
  expect(appendUnit('48', '%')).toBe('48%')
  expect(appendUnit('22.0 °C', '°C')).toBe('22.0 °C')
  expect(appendUnit('WARM', 'W')).toBe('WARM W')
})
