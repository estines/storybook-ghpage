import { CART_CHANGE, ADD_TO_CART } from './types'

export const cartChange = payload => dispatch =>
  dispatch({ type: CART_CHANGE, payload })

export const addToCart = payload => dispatch =>
  dispatch({ type: ADD_TO_CART, payload })
