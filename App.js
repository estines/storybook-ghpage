import React from 'react'
import { Provider } from 'react-redux'

import store from './src/store'
import AuthStack from './src/navigators/auth.stack'
import OrderStack from './src/navigators/order.stack'
import PaymentMethod from './src/screens/payment/PaymentMethod.screen'

console.disableYellowBox = true

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <OrderStack />
      </Provider>
    )
  }
}
