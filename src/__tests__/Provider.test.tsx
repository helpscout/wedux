import * as React from 'react'
import createStore from '../createStore'
import applyMiddleware from '../applyMiddleware'
import actionTypes from '../__fixtures__/actionTypes'
import mockReducer from '../__fixtures__/reducer'
import thunk from 'redux-thunk'
import Provider from '../Provider'
import connect from '../connect'
import {mount} from 'enzyme'

test('Can pass data from Provider to connected component', () => {
  const spy = jest.fn()

  const Bob = ({burgers, makeBurger}) => (
    <div>
      <div className="count">{burgers}</div>
      <button onClick={makeBurger}>Make Burgers</button>
    </div>
  )
  const makeBurger = () => {
    return function(dispatch, getState) {
      spy(getState().owner)

      dispatch({type: actionTypes.MAKE_BURGER})
    }
  }
  const mapStateToProps = state => ({burgers: state.burgerCount})
  const mapDispatchToProps = {makeBurger}
  const ConnectedBob = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Bob)

  const store = createStore(mockReducer, applyMiddleware(thunk))

  const wrapper = mount(
    <Provider store={store}>
      <ConnectedBob />
    </Provider>,
  )

  // 1. Test initial render
  expect(wrapper).toBeTruthy()

  const el = wrapper.find('Bob')

  expect(el.length).toBeTruthy()
  expect(store.getState().burgerCount).toBe(0)
  expect(el.find('.count').text()).toEqual('0')

  // 2. Test interaction -> dispatch -> store -> render
  el.find('button').simulate('click')

  expect(store.getState().burgerCount).toBe(1)
  expect(el.find('.count').text()).toEqual('1')
  expect(spy).toHaveBeenCalledWith(store.getState().owner)

  // 3. Test again, just in case...
  el.find('button').simulate('click')
  el.find('button').simulate('click')

  expect(store.getState().burgerCount).toBe(3)
  expect(el.find('.count').text()).toEqual('3')
})
