import { Alert } from 'react-native'

const showAlert = message => {
  setTimeout(() => {
    Alert.alert('Error', message)
  }, 1000)
}

const alert = error => {
  try {
    let err = error.response ? error.response.data : error
    if (err && err.error) {
      err = err.error
    }
    console.log(err, 'err..')
    showAlert(err.message)
    // if (err.message && err.message.includes('status')) {
    //   Alert.alert(
    //     'Error',
    //     'Sorry system error while processing please try again later.'
    //   )
    // } else {
    //   console.log(err.message, 'err.message')
  
    // }
  } catch (error) {
    console.log(error, 'errror in error')
  }
}

export default alert
