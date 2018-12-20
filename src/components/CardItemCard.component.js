import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

// images
import EMPTY_CART from '../assets/icon/empty-cart.png'

export default props => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Image source={EMPTY_CART} style={styles.emptyCartIcon} />
        <View style={styles.br} />
        <Text style={styles.title}>Your cart is empty</Text>
      </View>
      <TouchableOpacity style={styles.circle} onPress={props.add}>
        <MaterialIcons name="add" color="#FFF" size={30} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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
    alignItems: 'center'
  }
})
