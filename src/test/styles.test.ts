import fs from 'fs'
import path from 'path'

test('card styles do not use CSS containment for responsive layout', () => {
  const styles = fs.readFileSync(
    path.join(__dirname, '..', 'styles.css'),
    'utf8'
  )

  expect(styles).not.toContain('container-type')
  expect(styles).not.toContain('@container')
})

test('base ha-card keeps the default Home Assistant display contract', () => {
  const styles = fs.readFileSync(
    path.join(__dirname, '..', 'styles.css'),
    'utf8'
  )
  const baseCardRule = styles.match(/ha-card\s*\{[^}]*\}/)?.[0] ?? ''

  expect(baseCardRule).not.toContain('display:')
  expect(baseCardRule).not.toContain('row-gap')
})
