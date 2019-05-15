import { FETCH_CARD } from './types'

import cardService from '../../services/card.service'

export const fetchCard = () => {
  return async dispatch => {
    try {
      const data = await cardService.list()
      return dispatch({ type: FETCH_CARD, payload: data })
    } catch (error) {
      throw error
    }
  }
}
