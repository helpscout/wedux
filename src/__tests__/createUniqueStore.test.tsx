import * as React from 'react'
import { mount } from 'enzyme'
import createUniqueStore from '../createUniqueStore'

test('Generates a store, connect, and Provider', () => {
  const store = createUniqueStore({})

  expect(store.store).toBeTruthy()
  expect(store.Provider).toBeTruthy()
  expect(store.connect).toBeTruthy()
})

test('Generates components with unique store keys', () => {
  const storeOne = createUniqueStore({})
  const storeTwo = createUniqueStore({})
  const storeThree = createUniqueStore({})

  const keyOne = Object.keys(storeOne.Provider.childContextTypes)[0]
  const keyTwo = Object.keys(storeTwo.Provider.childContextTypes)[0]
  const keyThree = Object.keys(storeThree.Provider.childContextTypes)[0]

  expect(keyOne).not.toBe(keyTwo)
  expect(keyOne).not.toBe(keyThree)
  expect(keyTwo).not.toBe(keyThree)
})

test('Can generate a store with a custom namespace', () => {
  const store = createUniqueStore({}, null, 'Teddy')

  expect(store.store).toBeTruthy()
  expect(store.Provider).toBeTruthy()
  expect(store.connect).toBeTruthy()

  const storeKey = Object.keys(store.Provider.childContextTypes)[0]

  expect(storeKey).toContain('Teddy')
})

test('Rendered components do not clash', () => {
  const setOne = createUniqueStore({ didMakeBurgers: false })
  const setTwo = createUniqueStore({ didMakeBurgers: false })

  const Bob = ({ makeBurger }) => (
    <button onClick={makeBurger}>Make Burger</button>
  )
  Bob.displayName = 'Bob'

  const makeBurger = store => {
    return {
      didMakeBurgers: !store.didMakeBurgers,
    }
  }

  const ConnectedBob = setTwo.connect(null, { makeBurger })(Bob)

  const wrapper = mount(
    <div>
      <setOne.Provider>
        <div>
          <setTwo.Provider>
            <ConnectedBob />
          </setTwo.Provider>
        </div>
      </setOne.Provider>
    </div>,
  )

  const el = wrapper.find('Bob')
  el.simulate('click')

  expect(setOne.store.getState().didMakeBurgers).toBe(false)
  expect(setTwo.store.getState().didMakeBurgers).toBe(true)

  el.simulate('click')

  expect(setOne.store.getState().didMakeBurgers).toBe(false)
  expect(setTwo.store.getState().didMakeBurgers).toBe(false)
})
