import * as React from 'react'
import {mount} from 'enzyme'
import connect from '../connect'
import createStore from '../createStore'

test('Does not explode if no Provider/store is present', () => {
  const Bob = () => <div />
  const ConnectedBob = connect()(Bob)
  // @ts-ignore
  const wrapper = mount(<ConnectedBob />)

  expect(wrapper).toBeTruthy
})

test('Connects with a React.Component', () => {
  const Bob = () => <div />
  const ConnectedBob = connect()(Bob)
  // @ts-ignore
  const wrapper = mount(<ConnectedBob />)

  expect(wrapper.instance() instanceof React.Component).toBe(true)
})

test('Connect with a React.PureComponent, by default', () => {
  const Bob = () => <div />
  const ConnectedBob = connect()(Bob)
  const wrapper = mount(<ConnectedBob />)

  expect(wrapper.instance() instanceof React.PureComponent).toBe(true)
})

test('Connect can create a React.Component instance, if defined', () => {
  const Bob = () => <div />
  const ConnectedBob = connect(
    null,
    null,
    {},
    {pure: false},
  )(Bob)
  const wrapper = mount(<ConnectedBob />)

  expect(wrapper.instance() instanceof React.Component).toBe(true)
})

test('Can pass mergedProps into connected component', () => {
  const Bob = () => <div />
  const ConnectedBob = connect(
    null,
    null,
    {
      hasKids: true,
    },
    {pure: false},
  )(Bob)
  const wrapper = mount(<ConnectedBob />)
  const el = wrapper.find('Bob')

  expect(el.prop('hasKids')).toBe(true)
})

test('Can retrieve store from connect', () => {
  const Bob = () => <div />
  const store = createStore({})
  const ConnectedBob = connect(
    null,
    null,
    {
      hasKids: true,
      store,
      withStore: true,
    },
    {pure: false},
  )(Bob)
  const wrapper = mount(<ConnectedBob />)
  const el = wrapper.find('Bob')

  expect(el.prop('hasKids')).toBe(true)
  expect(el.prop('store')).toBe(store)
})

test('Subscribes to store on mount', () => {
  const spy = jest.fn()
  const Bob = () => <div />
  const ConnectedBob = connect()(Bob)
  const store = createStore({})
  store.subscribe = spy

  mount(<ConnectedBob />, {context: {__WEDUX_STORE__: store}})

  expect(spy).toHaveBeenCalled()
})

test('Unsubscribes to store on unmount', () => {
  const spy = jest.fn()
  const Bob = () => <div />
  const ConnectedBob = connect()(Bob)
  const store = createStore({})
  store.unsubscribe = spy

  const wrapper = mount(<ConnectedBob />, {context: {__WEDUX_STORE__: store}})
  wrapper.unmount()

  expect(spy).toHaveBeenCalled()
})
