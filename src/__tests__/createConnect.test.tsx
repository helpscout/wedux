import * as React from 'react'
import {mount} from 'enzyme'
import createConnect from '../createConnect'
import createStore from '../createStore'

test('Connect with a React.Component, by default', () => {
  const Bob = () => <div />
  const connect = createConnect()
  const ConnectedBob = connect()(Bob)
  // @ts-ignore
  const wrapper = mount(<ConnectedBob />)

  expect(wrapper.instance() instanceof React.Component).toBe(true)
})

test('Subscribes to store on mount', () => {
  const spy = jest.fn()
  const Bob = () => <div />
  const connect = createConnect()
  const ConnectedBob = connect()(Bob)
  const store = createStore({})
  store.subscribe = spy

  mount(<ConnectedBob />, {context: {__WEDUX_STORE__: store}})

  expect(spy).toHaveBeenCalled()
})

test('Unsubscribes to store on unmount', () => {
  const spy = jest.fn()
  const Bob = () => <div />
  const connect = createConnect()
  const ConnectedBob = connect()(Bob)
  const store = createStore({})
  store.unsubscribe = spy

  const wrapper = mount(<ConnectedBob />, {context: {__WEDUX_STORE__: store}})
  wrapper.unmount()

  expect(spy).toHaveBeenCalled()
})
