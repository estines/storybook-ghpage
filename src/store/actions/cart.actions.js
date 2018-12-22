import { CART_CHANGE, ADD_TO_CART, SELECT_PAYMENT_METHOD } from './types'

export const cartChange = payload => dispatch =>
  dispatch({ type: CART_CHANGE, payload })

export const addToCart = payload => dispatch =>
  dispatch({ type: ADD_TO_CART, payload })

export const selectPaymentMethod = payload => dispatch =>
  dispatch({ type: SELECT_PAYMENT_METHOD, payload })
