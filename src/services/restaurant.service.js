import axios from 'axios'
import { AsyncStorage } from 'react-native'

const get = async id => {
  try {
    const accessToken = await AsyncStorage.getItem('access_token')
    const res = await axios.get(`/restaurant/${id}`, {
      headers: { authorization: accessToken }
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export default {
  get
}
