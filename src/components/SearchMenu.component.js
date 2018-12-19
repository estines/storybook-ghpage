import React from 'react'
import { View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import DISH from '../assets/icon/dish.png'
export default props => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <MaterialIcons
          name="search"
          size={18}
          color="#D7D7D7"
          style={styles.searchIcon}
        />
        <TextInput placeholder="Search Menu" style={styles.input} />
        <TouchableOpacity style={styles.dishBtn}>
          <Image source={DISH} style={styles.dish} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  searchIcon: { marginRight: 10 },
  wrapper: {
    width: '100%'
  },
  dishBtn: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 5
  },
  input: {
    flex: 1
  },
  container: {
    backgroundColor: '#FFF',
    marginVertical: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 10,
    padding: 10,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  }
})
