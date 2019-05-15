import { FETCH_PROFILE, ON_PROFILE_FORM_CHANGE } from '../actions/types'

const INITIAL_STATE = {
  name: '',
  email: '',
  phoneNumber: '',
  bio: '',
  address: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PROFILE:
      return { ...state, ...action.payload }
    case ON_PROFILE_FORM_CHANGE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
