import { FETCH_MENU, FETCH_CATEGORY } from './types'

import menuService from '../../services/menu.service'
import categoryService from '../../services/category.service'

export const fetchMenu = () => {
  return async dispatch => {
    try {
      const data = await menuService.list()
      return dispatch({ type: FETCH_MENU, payload: data })
    } catch (error) {
      throw error
    }
  }
}

export const fetchCategory = restaurantId => {
  return async dispatch => {
    try {
      const data = await categoryService.list(restaurantId)
      return dispatch({ type: FETCH_CATEGORY, payload: data })
    } catch (error) {
      throw error
    }
  }
}
