import { combineReducers } from 'redux'
import cart from './cart.reducer'
import menu from './menu.reducer'
import profile from './profile.reducer'
import card from './card.reducer'

export default combineReducers({
  cart,
  menu,
  profile,
  card
})
