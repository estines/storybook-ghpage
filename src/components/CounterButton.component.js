import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export default props => {
  const { value, onChange, name } = props
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={[styles.button, styles.leftButton]} onPress={() => onChange(name, parseInt(value) - 1 >= 0 ? parseInt(value) - 1 : 0)}>
        <AntDesign name="minus" size={15} color="#000" />
      </TouchableOpacity>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={() => onChange(name, parseInt(value) + 1)}>
        <AntDesign name="plus" size={15} color="#000" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  rightButton: {
    marginLeft: 10
  },
  leftButton: {
    marginRight: 10
  },
  button: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4D4D4',
    backgroundColor: '#FFF'
  },
  wrapper: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    borderRightWidth: 0,
    borderLeftWidth: 0
  }
})
