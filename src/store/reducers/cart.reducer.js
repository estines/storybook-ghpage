import { CART_CHANGE, ADD_TO_CART, SELECT_PAYMENT_METHOD } from '../actions/types'

const INITIAL_STATE = {
  cart: [],
  paymentMethod: 'cash',
  paymentMethodId: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_CHANGE:
      return action.payload
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, ...action.payload] }
    case SELECT_PAYMENT_METHOD:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
