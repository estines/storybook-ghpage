import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default props => {
  const { checked } = props
  if (checked) {
    return (
      <TouchableOpacity style={styles.selectedWrapper} onPress={props.onPress}>
        <MaterialIcons name="check" size={20} color="#FFF" />
      </TouchableOpacity>
    )
  }
  return <TouchableOpacity style={styles.unSelect} onPress={props.onPress} />
}
const styles = StyleSheet.create({
  selectedWrapper: {
    width: 30,
    height: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  unSelect: {
    width: 30,
    height: 30,
    borderColor: '#CECECE',
    borderWidth: 1
  }
})
