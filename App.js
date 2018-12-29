import React from 'react'
import { Provider } from 'react-redux'
import { createSwitchNavigator } from 'react-navigation'

import store from './src/store'
import AuthStack from './src/navigators/auth.stack'
import SplashScreen from './src/screens/Splash.screen'
import Drawer from './src/navigators/drawer'

import ScanScreen from './src/screens/order/Review.screen'

console.disableYellowBox = true

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Drawer />
      </Provider>
    )
  }
}

class CheckAuth extends React.Component {
  componentDidMount = () => {
    setTimeout(() => {
      this.props.navigation.navigate('Auth')
    }, 3000)
  }

  render () {
    return <SplashScreen />
  }
}

// export default ScanScreen

export default createSwitchNavigator(
  {
    AuthLoading: CheckAuth,
    App: App,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
)
