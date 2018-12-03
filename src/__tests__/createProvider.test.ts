import createProvider from '../createProvider'
import {defaultStoreKey} from '../utils'

test('Creates a Provider using the defaultStoreKey', () => {
  const Provider = createProvider()

  expect(Provider.childContextTypes[defaultStoreKey]).toBeTruthy()
})

test('Can create a Provider using a custom store key', () => {
  const Provider = createProvider({storeKey: 'Bob'})

  expect(Provider.childContextTypes[defaultStoreKey]).toBeFalsy()
  expect(Provider.childContextTypes['Bob']).toBeTruthy()
})
