import React from 'react'
import { Dimensions } from 'react-native'
import { createDrawerNavigator } from 'react-navigation'

import SideBar from '../components/SideBar.component'

// stack
import OrderStack from './order.stack'
import AccountStack from './account.stack'
import HistoryStack from './history.stack'

// screens
import HomeScreen from '../screens/Home.screen'

const { width } = Dimensions.get('window')
const drawerWidth = width - width / 3

const Drawer = createDrawerNavigator(
  {
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
    }
  },
  {
    contentComponent: ({ navigation }) => <SideBar navigation={navigation} />,
    drawerWidth: drawerWidth
  }
)

export default Drawer
