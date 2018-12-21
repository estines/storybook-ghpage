import { CART_CHANGE, ADD_TO_CART } from '../actions/types'

const INITIAL_STATE = {
  cart: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_CHANGE:
      return action.payload
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, ...action.payload] }
    default:
      return state
  }
}
