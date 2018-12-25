import React from 'react'
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { MaterialIcons } from '@expo/vector-icons'

const renderLeft = left => {
  if (left === 'back') {
    return (
      <View style={styles.left}>
        <MaterialIcons name="keyboard-arrow-left" size={30} />
      </View>
    )
  } else if (left === 'cancel') {
    return (
      <View style={styles.left}>
        <Text style={styles.text}>Cancel</Text>
      </View>
    )
  }
}

const renderRight = type => {
  if (type === 'save') {
    return (
      <View style={styles.right}>
        <Text style={styles.text}>Save</Text>
      </View>
    )
  }
}
export default props => {
  const { left, right, center } = props
  return (
    <View style={styles.wrapper}>
      {renderLeft(left)}
      <Text style={styles.title}>{center}</Text>
      {renderRight(right)}
    </View>
  )
}

const { width: WIDTH } = Dimensions.get('window')

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '500'
  },
  right: {},
  left: {},
  text: {
    color: '#007AFF',
    fontSize: 18
  },
  wrapper: {
    width: WIDTH,
    backgroundColor: 'rgba(255,255,255, 0.8)',
    padding: 20,
    paddingTop: ifIphoneX ? 50 : 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0
  }
})
