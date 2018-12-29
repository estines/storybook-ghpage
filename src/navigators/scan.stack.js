import { createStackNavigator } from 'react-navigation'

import Scan from '../screens/scan/Scan.screen'
import ScanResult from '../screens/scan/ScanResult.screen'

const screens = {
  Scan: {
    screen: Scan
  },
  ScanResult: {
    screen: ScanResult
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
