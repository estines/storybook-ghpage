import axios from 'axios'

const upload = async files => {
  try {
    const form = new FormData()
    console.log(files, 'files...')
    files.map(file => {
      const { uri } = file
      form.append('images', {
        uri,
        name: `${Date.now()}`,
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
