import createUnistore from './createUnistore'

export default function createStore(reducer, enhancer?) {
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }
  const isReducer = typeof reducer === 'function'
  const initialState = isReducer ? reducer(undefined, {}) : reducer

  const store = createUnistore(initialState)

  function setState(action) {
    if (!action) return
    const nextState = isReducer ? reducer(store.getState(), action) : action
    store.setState(nextState)
  }

  return {
    ...store,

    setState,

    dispatch(action) {
      setState(action)
    },

    action(action) {
      const apply = result => {
        result && this.dispatch(result)
      }

      return function() {
        const args = [store.getState()]
        for (let i = 0; i < arguments.length; i++) args.push(arguments[i])
        const ret = action.apply(this, args)
        if (ret !== null) {
          return ret.then ? apply(ret.then()) : apply(ret)
        }
      }
    },
  }
}
