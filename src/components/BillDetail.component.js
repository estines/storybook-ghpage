import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Button } from 'react-native-elements'

// images
import EMPTY_CART from '../assets/icon/empty-cart.png'

// components
import BillItem from './BillItem.component'

const renderCartItem = ({ item, index }) => {
  return <BillItem data={item} index={index} />
}

export default props => {
  const { cart } = props
  console.log(cart, 'cart....')
  return (
    <View style={styles.card}>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        extraData={cart}
        renderItem={renderCartItem}
        style={{ width: '100%' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cardThead: {
    fontSize: 12
  },
  cartHeader: {
    flexDirection: 'row',
    borderColor: '#dbdbdb',
    borderBottomWidth: 1,
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cart: {
    width: '100%'
  },
  title: {
    color: '#CECECE'
  },
  br: {
    marginVertical: 5
  },
  emptyCartIcon: {},
  content: {
    paddingVertical: 30
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF3B30',
    borderColor: '#FFF',
    borderWidth: 5,
    position: 'absolute',
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    marginBottom: -30
  },
  card: {
    borderRadius: 0,
    borderWidth: 0.2,
    borderColor: '#dbdbdb',
    padding: 20,
    backgroundColor: '#FFF',
    marginVertical: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    width: '100%'
  }
})
