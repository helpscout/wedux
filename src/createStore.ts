import createUnistore from './createUnistore'

export default function createStore(reducer) {
  const isReducer = typeof reducer === 'function'
  const initialState = isReducer ? reducer(undefined, {}) : reducer

  const store = createUnistore(initialState)

  function setState(action = {}) {
    const nextState = isReducer ? reducer(store.getState(), action) : action
    store.setState(nextState)
  }

  return {
    getState: store.getState,
    subscribe: store.subscribe,
    unsubscribe: store.unsubscribe,

    setState,

    dispatch(action = {}) {
      setState(action)
    },
  }
}
