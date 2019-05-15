import React from 'react'
import { AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import axios from 'axios'

import store from './src/store'
import AuthStack from './src/navigators/auth.stack'
import SplashScreen from './src/screens/Splash.screen'
import Drawer from './src/navigators/drawer'

// import ScanScreen from './src/screens/order/Review.screen'

axios.defaults.baseURL = 'http://192.168.42.244:3000/api'

console.disableYellowBox = true

const AppContainer = createAppContainer(Drawer)
class App extends React.Component {
  handleNavigationChange = data => {
    this.checkAuth()
  }

  checkAuth = async () => {
    const accessToken = await AsyncStorage.getItem('access_token')
    if (accessToken && accessToken !== null) {
    } else {
      this.props.navigation.navigate('Auth')
    }
  }

  render () {
    return (
      <Provider store={store}>
        <AppContainer
          onNavigationStateChange={this.handleNavigationChange}
          uriPrefix="/app"
        />
      </Provider>
    )
  }
}

class CheckAuth extends React.Component {
  componentDidMount = () => {
    this.checkAuth()
  }

  checkAuth = async () => {
    const accessToken = await AsyncStorage.getItem('access_token')
    if (accessToken && accessToken !== null) {
      axios.defaults.headers['Authorization'] = accessToken
      this.props.navigation.navigate('App')
    } else {
      this.props.navigation.navigate('Auth')
    }
  }

  render () {
    return <SplashScreen />
  }
}

// export default ScanScreen

const Root = createSwitchNavigator(
  {
    AuthLoading: CheckAuth,
    App: App,
    Auth: createAppContainer(AuthStack)
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

export default createAppContainer(Root)

// export default createAppContainer(Root)
