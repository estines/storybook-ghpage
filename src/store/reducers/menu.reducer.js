import { FETCH_MENU } from '../actions/types'

const INITIAL_STATE = {
  menu: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_MENU:
      return { ...state, menu: action.payload }
    default:
      return state
  }
}
