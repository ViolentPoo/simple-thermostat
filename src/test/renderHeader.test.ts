import { render } from 'lit'
import renderHeader from '../components/header'

test('renders slash overlay class for custom off header icons', () => {
  const result = renderHeader({
    header: {
      name: 'Custom Fan',
      icon: 'custom:fan',
      slashOffIcon: true,
      faults: [],
      toggles: [],
    },
    entity: {
      entity_id: 'fan.custom',
      state: 'off',
      attributes: {},
    },
    openEntityPopover: () => undefined,
    toggleEntityChanged: () => undefined,
  })

  render(result, document.body)

  const iconWrap = document.body.querySelector('.header__icon-wrap')
  expect(iconWrap?.classList.contains('off')).toBe(true)
  expect(iconWrap?.classList.contains('slash-off')).toBe(true)
  expect((document.body.querySelector('.header__icon') as any)?.icon).toBe(
    'custom:fan'
  )
})
