import createUnistore from './createUnistore'

export default function createStore(reducer, enhancer?) {
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }
  const isReducer = typeof reducer === 'function'
  const initialState = isReducer ? reducer(undefined, {}) : reducer

  const store = createUnistore(initialState)

  function setState(action = {}) {
    const nextState = isReducer ? reducer(store.getState(), action) : action
    store.setState(nextState)
  }

  return {
    ...store,

    setState,

    dispatch(action = {}) {
      setState(action)
    },
  }
}
