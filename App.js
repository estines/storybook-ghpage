import React from 'react'
import { Provider } from 'react-redux'

import store from './src/store'
// import AuthStack from './src/navigators/auth.stack'
// import OrderStack from './src/navigators/order.stack'
// import HistoryStack from './src/navigators/history.stack'
// import StampStack from './src/navigators/stamp.stack'
import ProfileScreen from './src/screens/profile/Profile.screen'
console.disableYellowBox = true

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <ProfileScreen />
      </Provider>
    )
  }
}
