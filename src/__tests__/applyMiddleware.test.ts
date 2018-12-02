import createStore from '../createStore'
import applyMiddleware from '../applyMiddleware'
import actionTypes from '../__fixtures__/actionTypes'
import mockReducer from '../__fixtures__/reducer'
import thunk from 'redux-thunk'

test('Can create a store with middleware', () => {
  const spy = jest.fn()
  const mockMiddleware = ({getState}) => {
    return next => action => {
      spy(getState(), action)

      return next(action)
    }
  }

  const store = createStore(mockReducer, applyMiddleware(mockMiddleware))

  expect(store.getState().burgerCount).toBe(0)
  expect(spy).not.toHaveBeenCalled()

  const prevState = store.getState()

  store.dispatch({
    type: actionTypes.MAKE_BURGER,
  })

  expect(store.getState().burgerCount).toBe(1)
  expect(spy).toHaveBeenCalledWith(prevState, {
    type: actionTypes.MAKE_BURGER,
  })
})

test('Can create async actions with redux-thunk', () => {
  const spy = jest.fn()
  const store = createStore(mockReducer, applyMiddleware(thunk))

  const makeBurgerOfTheDay = burgerName => {
    return function(dispatch, getState) {
      spy(getState().owner)

      dispatch({type: actionTypes.MAKE_BURGER})
    }
  }

  expect(store.getState().burgerCount).toBe(0)

  const burgerOfTheDay = 'If Looks Could Kale Burger'
  store.dispatch(makeBurgerOfTheDay(burgerOfTheDay))

  expect(spy).toHaveBeenCalledWith(store.getState().owner)
  expect(store.getState().burgerCount).toBe(1)
})
