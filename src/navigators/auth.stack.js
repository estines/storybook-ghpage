import { createStackNavigator } from 'react-navigation'

import Login from '../screens/auth/Login.screen'
import Register from '../screens/auth/Register.screen'
import EnterPhoneNumber from '../screens/auth/EnterPhoneNumber.screen'
import VerifyPhone from '../screens/auth/VerifyPhone.screen'
import EmailRegister from '../screens/auth/EmailRegister.screen'

const screens = {
  Login,
  Register,
  EnterPhoneNumber,
  VerifyPhone,
  EmailRegister
}

const fade = props => {
  const { position, scene } = props

  const index = scene.index

  const translateX = 0
  const translateY = 0

  const opacity = position.interpolate({
    inputRange: [index - 0.7, index, index + 0.7],
    outputRange: [0.3, 1, 0.3]
  })

  return {
    opacity,
    transform: [{ translateX }, { translateY }]
  }
}

const configure = {
  initialRouteName: 'Login',
  headerMode: 'none',
  transitionConfig: () => ({
    screenInterpolator: props => {
      return fade(props)
    }
  })
}

const stack = createStackNavigator(screens, configure)

export default stack
