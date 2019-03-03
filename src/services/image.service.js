import axios from 'axios'
import uuid from 'uuid/v4'

const upload = async files => {
  try {
    const form = new FormData()
    files.forEach(file => {
      let name = uuid()
      name = name.replace(/-/g, '')
      form.append('images', {
        uri: file,
        name: name,
        type: 'image/jpg'
      })
    })
    const res = await axios.post(`/images/upload`, form)
    const { data } = res
    return data.images
  } catch (error) {
    throw error
  }
}

export default {
  upload
}
