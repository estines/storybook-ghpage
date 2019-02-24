import { combineReducers } from 'redux'
import cart from './cart.reducer'
import menu from './menu.reducer'
import profile from './profile.reducer'

export default combineReducers({
  cart,
  menu,
  profile
})
