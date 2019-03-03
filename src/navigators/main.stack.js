import { createStackNavigator } from 'react-navigation'

// stack
import OrderStack from './order.stack'
import AccountStack from './account.stack'
import HistoryStack from './history.stack'
import StampStack from './stamp.stack'
import FeedStack from './feed.stack'
import ScanStack from './scan.stack'
import HomeScreen from '../screens/Home.screen'

const screens = {
  HomeScreen: {
    screen: HomeScreen
  },
  OrderStack: {
    screen: OrderStack
  },
  AccountStack: {
    screen: AccountStack
  },
  HistoryStack: {
    screen: HistoryStack,
    navigationOptions: {
      drawerLockMode: 'locked-closed'
    }
  },
  StampStack: {
    screen: StampStack
  },
  FeedStack: {
    screen: FeedStack
  },
  ScanStack: {
    screen: ScanStack
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
