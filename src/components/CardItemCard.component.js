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
import CartItem from './CartItem.component'

const renderCartItem = ({ item, index }) => {
  console.log(item, 'item...')
  return <CartItem data={item} index={index} />
}
const renderCart = (cart, add) => {
  if (cart && cart.length > 0) {
    return (
      <View style={styles.cart}>
        <View style={styles.cartHeader}>
          <Text style={styles.cardThead}>DETAILED BILL 1</Text>
          <Button
            icon={<MaterialIcons name="add" size={15} color="#FFF" />}
            iconLeft
            title="ADD"
            buttonStyle={{
              backgroundColor: '#E45655',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 5,
              fontSize: 10,
              paddingHorizontal: 10
            }}
            titleStyle={{ fontWeight: '700', fontSize: 14 }}
            onPress={add}
          />
        </View>
        <FlatList
          data={cart}
          keyExtractor={(item, index) => index.toString()}
          extraData={cart}
          renderItem={renderCartItem}
          style={{ width: '100%', paddingBottom: 30 }}
        />
      </View>
    )
  } else {
    return (
      <View style={styles.content}>
        <Image source={EMPTY_CART} style={styles.emptyCartIcon} />
        <View style={styles.br} />
        <Text style={styles.title}>Your cart is empty</Text>
      </View>
    )
  }
}

export default props => {
  const { cart, add } = props
  return (
    <View style={styles.card}>
      {renderCart(cart, add)}
      {cart && cart.length > 0 ? null : (
        <TouchableOpacity style={styles.circle} onPress={add}>
          <MaterialIcons name="add" color="#FFF" size={30} />
        </TouchableOpacity>
      )}
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
    borderRadius: 10,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    padding: 20,
    backgroundColor: '#FFF',
    position: 'relative',
    alignItems: 'center',
    marginBottom: 50
  }
})
