import * as React from 'react'
import {mount} from 'enzyme'
import pureConnect from '../pureConnect'

test('Does not explode if no Provider/store is present', () => {
  const Bob = () => <div />
  const ConnectedBob = pureConnect()(Bob)
  // @ts-ignore
  const wrapper = mount(<ConnectedBob />)

  expect(wrapper).toBeTruthy
})

test('Connects with a React.PureComponent', () => {
  const Bob = () => <div />
  const ConnectedBob = pureConnect()(Bob)
  // @ts-ignore
  const wrapper = mount(<ConnectedBob />)

  expect(wrapper.instance() instanceof React.PureComponent).toBe(true)
})
