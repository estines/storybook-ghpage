import axios from 'axios'
import { AsyncStorage } from 'react-native'

const list = async (restaurantId) => {
  try {
    const accessToken = await AsyncStorage.getItem('access_token')
    const res = await axios.get(`/Categories?filter[where][restaurantId]=${restaurantId}`, {
      headers: { authorization: accessToken }
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export default {
  list
}
