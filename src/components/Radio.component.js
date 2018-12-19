import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

export default props => {
  const { checked } = props
  if (checked) {
    return (
      <TouchableOpacity style={styles.selectedWrapper} onPress={props.onPress}>
        <View style={styles.selectedCenter} />
      </TouchableOpacity>
    )
  }
  return <TouchableOpacity style={styles.unSelect} onPress={props.onPress} />
}

const styles = StyleSheet.create({
  selectedCenter: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFF'
  },
  selectedWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  unSelect: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: '#CECECE',
    borderWidth: 1
  }
})
