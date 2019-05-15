import { createStackNavigator } from 'react-navigation'

import Stamp from '../screens/stamp/Stamp.screen'
import StampRewards from '../screens/stamp/StampRewards.screen'

const screens = {
  Stamp: {
    screen: Stamp
  },
  StampRewards: {
    screen: StampRewards
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
  headerMode: 'none',
  transitionConfig: () => ({
    screenInterpolator: props => {
      return fade(props)
    }
  })
}

const stack = createStackNavigator(screens, configure)

export default stack
