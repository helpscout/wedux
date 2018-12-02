import actionTypes from './actionTypes'
import {initialState} from './state'

export default function reducer(state = initialState, action) {
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
