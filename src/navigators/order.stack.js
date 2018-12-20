import { createStackNavigator } from 'react-navigation'

import Menu from '../screens/menu/Menu.screen'
import Cart from '../screens/cart/Cart.screen'
const screens = {
  Cart: {
    screen: Cart
  },
  Menu: {
    screen: Menu
  }
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
  initialRouteName: 'Cart',
  headerMode: 'none',
  transitionConfig: () => ({
    screenInterpolator: props => {
      return fade(props)
    }
  })
}

const stack = createStackNavigator(screens, configure)

export default stack
