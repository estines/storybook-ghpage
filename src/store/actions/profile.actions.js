import { FETCH_PROFILE, ON_PROFILE_FORM_CHANGE } from './types'

import authService from '../../services/auth.service'

export const fetchProfile = () => {
  return async dispatch => {
    try {
      const data = await authService.profile()
      return dispatch({ type: FETCH_PROFILE, payload: data })
    } catch (error) {
      throw error
    }
  }
}

export const onProfileFormChange = data => {
  return dispatch => {
    dispatch({ type: ON_PROFILE_FORM_CHANGE, payload: data })
  }
}
