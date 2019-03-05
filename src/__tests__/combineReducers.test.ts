import combineReducers from '../combineReducers'

test('Can combine reducers', () => {
  const bobReducer = (state = { burgers: 0 }, action) => {
    switch (action.type) {
      case 'MAKE_BURGER':
        return {
          ...state,
          burgers: state.burgers + 1,
        }
      default:
        return state
    }
  }

  const teddyReducer = (state = { isRoofFixed: false }, action) => {
    switch (action.type) {
      case 'FIX_ROOF':
        return {
          ...state,
          isRoofFixed: true,
        }
      default:
        return state
    }
  }

  const reducers = combineReducers({
    bob: bobReducer,
    teddy: teddyReducer,
  })

  const initialState = undefined
  const state = reducers(initialState) as any

  expect(state.bob.burgers).toBe(0)
  expect(state.teddy.isRoofFixed).toBe(false)
})

test('Can update combined reducer state with an action', () => {
  const bobReducer = (state = { burgers: 0 }, action) => {
    switch (action.type) {
      case 'MAKE_BURGER':
        return {
          ...state,
          burgers: state.burgers + 1,
        }
      default:
        return state
    }
  }

  const teddyReducer = (state = { isRoofFixed: false }, action) => {
    switch (action.type) {
      case 'FIX_ROOF':
        return {
          ...state,
          isRoofFixed: true,
        }
      default:
        return state
    }
  }

  const reducers = combineReducers({
    bob: bobReducer,
    teddy: teddyReducer,
  })

  const initialState = undefined

  let nextState

  nextState = reducers(initialState, { type: 'MAKE_BURGER' }) as any

  expect(nextState.bob.burgers).toBe(1)
  expect(nextState.teddy.isRoofFixed).toBe(false)

  nextState = reducers(nextState, { type: 'MAKE_BURGER' }) as any

  expect(nextState.bob.burgers).toBe(2)
  expect(nextState.teddy.isRoofFixed).toBe(false)

  nextState = reducers(nextState, { type: 'FIX_ROOF' }) as any

  expect(nextState.teddy.isRoofFixed).toBe(true)
})
