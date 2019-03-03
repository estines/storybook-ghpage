import axios from 'axios'

const create = async body => {
  try {
    const res = await axios.post(`/reviews`, body)
    return res.data
  } catch (error) {
    throw error
  }
}

const list = async () => {
  try {
    const res = await axios.get(`/reviews`)
    return res.data
  } catch (error) {
    throw error
  }
}

export default {
  create,
  list
}
