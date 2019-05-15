import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  SafeAreaView
} from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { MaterialIcons } from '@expo/vector-icons'

const renderLeft = (left, onPress) => {
  if (left === 'back') {
    return <MaterialIcons name="keyboard-arrow-left" size={30} />
  } else if (left === 'cancel') {
    return <Text style={styles.text}>Cancel</Text>
  } else if (left === 'more') {
    return <MaterialIcons name="more-vert" size={30} color="#7E7E7E" />
  } else if (left === 'close') {
    return <MaterialIcons name="close" size={30} color="#7E7E7E" />
  }
}

const renderRight = type => {
  if (type === 'save') {
    return <Text style={styles.text}>Save</Text>
  } else if (type === 'add') {
    return <Text style={styles.text}>Add</Text>
  } else {
    return <Text style={styles.text}>{type}</Text>
  }
}
export default props => {
  const {
    left,
    right,
    center,
    hasShadow,
    containerStyle,
    onPressLeft,
    onPressRight
  } = props
  return (
    <SafeAreaView style={{ backgroundColor: 'rgba(255,255,255, 0.8)' }}>
      <View
        style={[
          styles.wrapper,
          containerStyle ? { ...containerStyle } : {},
          hasShadow ? styles.shadow : {}
        ]}
      >
        <View style={styles.left}>
          <TouchableOpacity onPress={onPressLeft}>
            {renderLeft(left)}
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{center}</Text>
        <View style={styles.right}>
          <TouchableOpacity onPress={onPressRight}>
            {renderRight(right)}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const { width: WIDTH } = Dimensions.get('window')
const statusBarHeight = StatusBar.currentHeight

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#E6E6E6',
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 10
    }
  },
  title: {
    fontSize: 18,
    fontWeight: '500'
  },
  text: {
    color: '#007AFF',
    fontSize: 18
  },
  wrapper: {
    width: WIDTH,
    backgroundColor: 'rgba(255,255,255, 0.8)',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    paddingTop: statusBarHeight + 10
  }
})