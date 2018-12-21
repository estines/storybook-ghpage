import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default props => {
  const { cart } = props
  if (cart && cart.length > 0) {
    let subTotal = 0
    let tax = 0
    let totalItems = 0
    if (cart && cart.length > 1) {
      subTotal = cart.map(c => c.totalPrice).reduce((a, b) => a + b)
      totalItems = cart.map(c => c.quantity).reduce((a, b) => a + b)
    } else if (cart && cart.length === 1) {
      subTotal = cart[0].totalPrice
      totalItems = cart[0].quantity
    }
    if (subTotal > 0) {
      tax = subTotal * 0.7
    }
    let totalPrice = subTotal + tax
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.thead}>Total items...</Text>
          <Text style={styles.value}>{totalItems}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.thead}>Tax (7.000%)...</Text>
          <Text style={styles.value}>{tax.toLocaleString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.thead}>Subtotal</Text>
          <Text style={styles.value}>{subTotal.toLocaleString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.thead}>Total :</Text>
          <Text style={styles.total}>฿{totalPrice.toLocaleString()}</Text>
        </View>
      </View>
    )
  }
  return null
}

const styles = StyleSheet.create({
  total: {
    fontSize: 18,
    color: '#E45655'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  card: {
    borderRadius: 0,
    borderWidth: 0.2,
    borderColor: '#dbdbdb',
    padding: 20,
    backgroundColor: '#FFF',
    marginVertical: 5,
    marginHorizontal: 5
  }
})
