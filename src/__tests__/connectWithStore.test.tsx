import * as React from 'react'
import { mount } from 'enzyme'
import connectWithStore from '../connectWithStore'
import Provider from '../Provider'
import createStore from '../createStore'

test('Automatically retrieves store', () => {
  const Bob = () => <div />
  const ConnectedBob = connectWithStore()(Bob)
  const store = createStore({})
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedBob />
    </Provider>,
  )
  const el = wrapper.find(Bob)

  expect(el.prop('store')).toBe(store)
})
