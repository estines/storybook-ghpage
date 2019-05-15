import axios from 'axios'
import { AsyncStorage } from 'react-native'

const login = async (username, password) => {
  try {
    const res = await axios.post('/user-account/login', { username, password })
    const { data } = res
    await AsyncStorage.setItem('access_token', data.id)
    await AsyncStorage.setItem('userId', data.userId)
    axios.defaults.headers.common['Authorization'] = data.id
    return data
  } catch (error) {
    throw error
  }
}

const register = async body => {
  try {
    const res = await axios.post('/user-account', body)
    const { data } = res
    await login(body.username, body.password)
    return data
  } catch (error) {
    throw error
  }
}

const profile = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId')
    const res = await axios.get(`/user-account/${userId}`)
    const { data } = res
    return data
  } catch (error) {
    throw error
  }
}

const updateProfile = async body => {
  try {
    const userId = await AsyncStorage.getItem('userId')
    const res = await axios.patch(`/user-account/${userId}`, body)
    const { data } = res
    return data
  } catch (error) {
    throw error
  }
}

export default {
  login,
  profile,
  updateProfile,
  register
}
