import createStore from '../createStore'
import {initialState} from '../__fixtures__/state'
import actionTypes from '../__fixtures__/actionTypes'

describe('Basics', () => {
  test('Creates basic store', () => {
    const store = createStore({restaurantName: `Bob's Burgers`})

    expect(store.getState().restaurantName).toBe(`Bob's Burgers`)
  })

  test('Can set store state', () => {
    const store = createStore({restaurantName: `Bob's Burgers`})

    store.setState({restaurantName: 'Bob Burgers'})

    expect(store.getState().restaurantName).toBe(`Bob Burgers`)
  })

  test('Can add new values to the store', () => {
    const store = createStore({restaurantName: `Bob's Burgers`})

    store.setState({owner: 'Bob Belcher'})

    expect(store.getState().restaurantName).toBe(`Bob's Burgers`)
    expect(store.getState().owner).toBe(`Bob Belcher`)
  })
})

describe('Subscribe/Unsubscribe', () => {
  test('Can subscribe to store changes', () => {
    const spy = jest.fn()
    const store = createStore({restaurantName: `Bob's Burgers`})
    store.subscribe(spy)

    store.setState({owner: 'Bob Belcher'})

    expect(spy).toHaveBeenCalledWith(
      {
        owner: 'Bob Belcher',
        restaurantName: `Bob's Burgers`,
      },
      undefined,
    )

    store.setState({owner: 'Bob'})

    expect(spy).toHaveBeenCalledTimes(2)
  })

  test('Can unsubscribe to store changes', () => {
    const spy = jest.fn()
    const store = createStore({restaurantName: `Bob's Burgers`})
    store.subscribe(spy)

    store.setState({owner: 'Bob Belcher'})

    expect(spy).toHaveBeenCalledTimes(1)

    store.unsubscribe(spy)

    store.setState({owner: 'Bob'})
    store.setState({owner: 'Linda'})
    store.setState({owner: 'Gene'})
    store.setState({owner: 'Louise'})
    store.setState({owner: 'Tina'})

    expect(spy).toHaveBeenCalledTimes(1)
  })
})

describe('Reducer', () => {
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.MAKE_BURGER:
        return {
          ...state,
          burgerCount: state.burgerCount + 1,
        }
      default:
        return state
    }
  }

  test('Can add reducer to store', () => {
    const store = createStore(reducer)

    expect(store.getState().burgerCount).toBe(0)
  })

  test('Can update state with reducer + action', () => {
    const store = createStore(reducer)

    expect(store.getState().burgerCount).toBe(0)

    store.dispatch({type: actionTypes.MAKE_BURGER})

    expect(store.getState().burgerCount).toBe(1)
  })

  test('Can default state if no action.type is detected', () => {
    const store = createStore(reducer)

    store.dispatch({type: undefined})

    expect(store.getState().burgerCount).toBe(0)
  })
})

describe('setState', () => {
  test('Returns default state if setState is called without arg', () => {
    const initialState = {restaurantName: `Bob's Burgers`}
    const store = createStore(initialState)

    store.setState()

    expect(store.getState()).toEqual(initialState)
  })
})

describe('action', () => {
  test('Can setState with action', () => {
    const initialState = {restaurantName: `Bob's Burgers`}

    const mockAction = state => {
      return {...state, burgerCount: 50}
    }

    const store = createStore(initialState)

    const boundedAction = store.action(mockAction)

    boundedAction()

    expect(store.getState().burgerCount).toBe(50)
  })

  test('Can setState with async action', () => {
    const initialState = {restaurantName: `Bob's Burgers`}

    const mockAsyncAction = state => {
      return {
        then: () => {
          return {...state, burgerCount: 100}
        },
      }
    }

    const store = createStore(initialState)

    const boundedAction = store.action(mockAsyncAction)

    boundedAction()

    expect(store.getState().burgerCount).toBe(100)
  })

  test('Does not modify state if action returns null', () => {
    const initialState = {restaurantName: `Bob's Burgers`}

    const mockAction = () => null

    const store = createStore(initialState)

    const boundedAction = store.action(mockAction)

    boundedAction()

    expect(store.getState()).toEqual(initialState)
  })
})
