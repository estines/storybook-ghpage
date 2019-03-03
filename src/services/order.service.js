import axios from 'axios'

const create = async body => {
  try {
    const res = await axios.post(`/orders`, body)
    return res.data
  } catch (error) {
    throw error
  }
}

const list = async () => {
  try {
    const res = await axios.get(`/orders`)
    return res.data
  } catch (error) {
    throw error
  }
}

export default {
  create,
  list
}
