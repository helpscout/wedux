import { isFn } from './utils'

export default function combineReducers(reducers) {
  return (state = {}, action = {}) => {
    const reducerKeys = Object.keys(reducers)
    const finalReducers = {}

    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i]

      if (isFn(reducers[key])) {
        finalReducers[key] = reducers[key]
      }
    }

    const finalReducerKeys = Object.keys(finalReducers)

    let hasChanged = false
    const nextState = {}

    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i]
      const reducer = finalReducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)

      nextState[key] = nextStateForKey

      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }

    return hasChanged ? nextState : state
  }
}
