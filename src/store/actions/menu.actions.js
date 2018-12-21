import { FETCH_MENU } from './types'

import menuService from '../../services/menu.service'

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
