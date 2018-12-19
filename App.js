import React from 'react'

import AuthStack from './src/navigators/auth.stack'
import MenuScreen from './src/screens/menu/Menu.screen'

console.disableYellowBox = true

export default class App extends React.Component {
  render () {
    return <MenuScreen />
  }
}
