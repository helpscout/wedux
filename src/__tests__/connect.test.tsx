import * as React from 'react'
import {mount} from 'enzyme'
import connect from '../connect'

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
