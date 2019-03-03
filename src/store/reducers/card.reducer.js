import { FETCH_CARD } from '../actions/types'

const INITIAL_STATE = {
  cards: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CARD:
      return { ...state, cards: action.payload }
    default:
      return state
  }
}
