import wedux from '../index'
import createStore from '../createStore'

test('Exports createStore by default', () => {
  expect(wedux).toBe(createStore)
})
