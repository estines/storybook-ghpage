import React from 'react'
import { View, StyleSheet } from 'react-native'

export default props => {
  return <View style={[styles.row, props.style]}>{props.children}</View>
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  }
})
