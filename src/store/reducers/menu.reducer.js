import { FETCH_MENU, FETCH_CATEGORY } from '../actions/types'

const INITIAL_STATE = {
  menu: [],
  categories: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_MENU:
      return { ...state, menu: action.payload }
    case FETCH_CATEGORY:
      return { ...state, categories: action.payload }
    default:
      return state
  }
}
