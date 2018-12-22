import { combineReducers } from 'redux'
import cart from './cart.reducer'
import menu from './menu.reducer'

export default combineReducers({
  cart,
  menu
})
