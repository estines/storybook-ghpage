import React from 'react'
import { AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { createSwitchNavigator } from 'react-navigation'
import axios from 'axios'

import store from './src/store'
import AuthStack from './src/navigators/auth.stack'
import SplashScreen from './src/screens/Splash.screen'
import Drawer from './src/navigators/drawer'

// import ScanScreen from './src/screens/order/Review.screen'

axios.defaults.baseURL = 'http://192.168.42.84:3000/api'

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
    this.checkAuth()
  }

  checkAuth = async () => {
    // await AsyncStorage.removeItem('access_token')
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
